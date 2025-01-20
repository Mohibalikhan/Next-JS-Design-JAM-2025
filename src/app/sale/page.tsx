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
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);

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
        const data = await Client.fetch(query);
        
        setProducts(data);

        const uniqueCategories = [
          ...new Set(data.map((product: Product) => product.category))
        ];

        setCategories(uniqueCategories as string[]);
        setFilteredProducts(data); // Set initial filtered products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  // Filter products based on selected category and price range
  useEffect(() => {
    const filterProducts = () => {
      const filtered = products.filter((product) => {
        const isCategoryMatch = selectedCategory ? product.category === selectedCategory : true;
        const isPriceMatch = product.price >= minPrice && product.price <= maxPrice;
        return isCategoryMatch && isPriceMatch;
      });
      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [selectedCategory, minPrice, maxPrice, products]);

  // Clear filters
  const clearFilters = () => {
    setSelectedCategory('');
    setMinPrice(0);
    setMaxPrice(10000);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8">
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

          {/* Price Range Filter */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold">Price Range</h3>
            <div className="flex flex-col gap-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="border p-2 rounded-md"
                placeholder="Min Price"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="border p-2 rounded-md"
                placeholder="Max Price"
              />
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="mt-6">
            <button 
              onClick={clearFilters} 
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Product Section */}
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
  );
}
