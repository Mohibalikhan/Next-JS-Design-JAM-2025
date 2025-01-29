'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";

import client from "../../sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface Product {
  _id: string;
  productName: string;
  category: string;
  price: number;
  image: string;
}

export default function Sale() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<string>("default");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "product" && (category match "Men's*")] {
          _id,
          productName,
          category,
          price,
          "image": image.asset->url
        }`;
        const data: Product[] = await client.fetch(query);

        setProducts(data);
        setFilteredProducts(data); // Set initial filtered products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  // Sort products if the "Low to High" option is selected
  useEffect(() => {
    let filtered = products;

    if (sortBy === "lowToHigh") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(filtered);
  }, [sortBy, products]);

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 mt-5">
      <div className="flex justify-end mb-6">
        {/* Sorting Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="default">Default</option>
          <option value="lowToHigh">Price: Low to High</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div key={item._id} className="font-bold text-slate-600">
              <Link href={`/product/${item.productName}`} className="block">
                <img
                  src={urlFor(item.image).url()}
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
  );
}
