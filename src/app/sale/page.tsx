"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaAngleRight, FaCaretDown, FaCaretUp } from "react-icons/fa";
import Client from "../../sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface Product {
  _id: string;
  productName: string;
  category: string;
  price: number;
  image: string;
}

export default function Sale() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [sortBy, setSortBy] = useState<string>("default");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "product"] {
          _id,
          productName,
          category,
          price,
          "image": image.asset->url
        }`;
        const data: Product[] = await Client.fetch(query);

        setProducts(data);

        // Extract unique categories and add "All Categories" option
        const uniqueCategories = [
          "All Categories",
          ...Array.from(new Set(data.map((product) => product.category))),
        ];
        setCategories(uniqueCategories);

        // Set initial filtered products
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  // Filter products based on selected category
  useEffect(() => {
    const filterProducts = () => {
      let filtered = products.filter((product) => {
        const isCategoryMatch =
          selectedCategory === "All Categories" || product.category === selectedCategory;
        return isCategoryMatch;
      });

      // Sort products if the "High to Low" option is selected
      if (sortBy === "highToLow") {
        filtered = filtered.sort((a, b) => b.price - a.price);
      }

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [selectedCategory, products, sortBy]);

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 mt-5">
      <div className="flex flex-col lg:flex-row gap-10 mb-20">
        {/* Sidebar Section */}
        <div className="lg:w-[250px] w-full">
          {/* Mobile toggle button */}
          <div className="flex justify-between items-center lg:hidden mt-6 mb-2">
            <h3 className="text-lg font-semibold ">Categories</h3>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-xl"
            >
              {isSidebarOpen ? <FaCaretUp /> : <FaCaretDown />}
            </button>
          </div>

          {/* Categories list */}
          <ul
            className={`flex flex-col gap-6 border-r border-gray-300 pt-10 pr-6 lg:block ${isSidebarOpen ? 'block' : 'hidden'} lg:flex`}
          >
            {categories.map((category, index) => (
              <li 
              key={index}
              className="flex justify-between items-center w-full cursor-pointer hover:text-gray-500"
              >
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`text-sm sm:text-base ${selectedCategory === category ? 'text-blue-600' : ''}`}
                >
                  {category}
                </button>
                <FaAngleRight className="text-sm hidden lg:block mr-4" />
              </li>
            ))}
          </ul>
        </div>

        {/* Product Section */}
        <div className="flex-1">
          {/* Sorting Dropdown */}
          <div className="flex justify-end mb-6">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border p-2 rounded-md"
            >
              <option value="default">Default</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <div key={item._id} className="font-bold text-slate-600">
                  <Link href={`/product/${item.productName}`} className="block">
                    <img
                      src={urlFor(item.image).url()} // Use urlFor to generate correct image URL
                      alt={item.productName}
                      width={400}
                      height={300}
                      className="rounded-md object-cover"
                    />
                    <p className="mt-2">{item.productName}</p>
                    <p>{item.category}</p>
                    <p>₹ {item.price}</p>
                  </Link>
                </div>
              ))
            ) : (
              <p>No products found with the selected filters.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}