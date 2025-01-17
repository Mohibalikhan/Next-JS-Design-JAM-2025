// pages/sale.tsx

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaAngleRight, FaCaretDown, FaCaretUp } from "react-icons/fa";
import Image from "next/image";
import { client } from '../../sanity/lib/client'; // Import Sanity client
import { productQuery } from '../../sanity/lib/queries'; // Import product query

interface Product {
  productName: string;
  category: string;
  price: number;
  inventory: number;
  colors: string[];
  status: string;
  image: string | null; // Image can be a valid string (URL) or null
  description: string;
}

export default function Sale() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(productQuery);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products from Sanity:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8">
      <div className="flex flex-col lg:flex-row gap-10 mb-20">
        {/* Sidebar */}
        <div className="lg:w-[250px] w-full">
          <div className="flex justify-between items-center lg:hidden mt-6 mb-2">
            <h3 className="text-lg font-semibold">Categories</h3>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-xl">
              {isSidebarOpen ? <FaCaretUp /> : <FaCaretDown />}
            </button>
          </div>
          <ul className={`flex flex-col gap-6 border-r border-gray-300 pt-10 pr-6 lg:block ${isSidebarOpen ? 'block' : 'hidden'} lg:flex`}>
            {[
              "Women's Fashion",
              "Men's Fashion",
              "Hoodies & Sweatshirts",
              "Tops & T-shirts",
              "Shorts",
              "Sports & Outdoor",
              "Trackcuits",
              "Jumpsuits & Rompers",
              "Socks",
              "Accessories & Equipment"
            ].map((item, index) => (
              <li key={index} className="flex justify-between items-center w-full cursor-pointer hover:text-gray-500">
                <Link href="#" className="text-sm sm:text-base">{item}</Link>
                {index < 2 && <FaAngleRight className="text-sm hidden lg:block mr-4" />}
              </li>
            ))}
          </ul>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.length > 0 ? (
            products.map((item, index) => (
              <div key={index} className="font-bold text-slate-600">
                <Link href={`/product/${item.productName}`} className="block">
                  <div className="w-full h-64 mb-4">
                    {/* Only render Image if src is a valid string */}
                    {item.image && item.image.trim() !== "" ? (
                      <img
                        src={item.image} // The image URL fetched from Sanity
                        alt={item.productName}
                        width={300}
                        height={300}
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div> // Fallback if no image URL is provided
                    )}
                  </div>
                  <p className="mt-2 text-lg font-semibold">{item.productName}</p>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <p className="font-bold">₹ {item.price}</p>
                  <p className="text-xs text-gray-400">{item.status}</p>
                  <p className="text-xs text-gray-500 mt-2">{item.description}</p>
                </Link>
              </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </div>
    </div>
  );
}
