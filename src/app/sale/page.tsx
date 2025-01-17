'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaAngleRight, FaCaretDown, FaCaretUp } from "react-icons/fa";
import Image from "next/image";
import product1 from '../../components/assests/s1.png'
import product2 from '../../components/assests/s2.png'
import product3 from '../../components/assests/s3.png'
import product4 from '../../components/assests/s4.png'
import product5 from '../../components/assests/s5.png'
import product6 from '../../components/assests/s6.png'
import product7 from '../../components/assests/s7.png'
import product8 from '../../components/assests/s8.png'
import product9 from '../../components/assests/s9.png'
import product10 from '../../components/assests/s10.png'
import product11 from '../../components/assests/s11.png'
import product12 from '../../components/assests/s12.png'
import product13 from '../../components/assests/s13.png'
import product14 from '../../components/assests/s14.png'
import product15 from '../../components/assests/s15.png'
import product16 from '../../components/assests/s16.png'
import product17 from '../../components/assests/s17.png'
import product18 from '../../components/assests/s18.png'
import product19 from '../../components/assests/s19.png'
import product20 from '../../components/assests/s20.png'
import product21 from '../../components/assests/s21.png'

// Define the interface for the product
interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
}

const productImages = [product1, product2, product3, product4, product5, product6, product7, product8 ,product9 ,product10 ,product11 ,product12 ,product13 ,product14 ,product15 ,product16 ,product17 ,product18 ,product19 ,product20 ,product21];

export default function Sale() {
  // State for managing the sidebar toggle in mobile view
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State for product data, now typed using the Product interface
  const [products, setProducts] = useState<Product[]>([]); // Specify type as Product[]

  // Fetch product data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const fetchdata = await fetch("https://dummyjson.com/products");
      const response = await fetchdata.json();
      setProducts(response.products); // Set products data
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8">
      <div className="flex flex-col lg:flex-row gap-10 mb-20">
        {/* Sidebar Section */}
        <div className="lg:w-[250px] w-full">
          {/* Mobile toggle button */}
          <div className="flex justify-between items-center lg:hidden mt-6 mb-2">
            <h3 className="text-lg font-semibold">Categories</h3>
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
              <li
                key={index}
                className="flex justify-between items-center w-full cursor-pointer hover:text-gray-500"
              >
                <Link href="#" className="text-sm sm:text-base">
                  {item}
                </Link>
                {index < 2 && (
                  <FaAngleRight className="text-sm hidden lg:block mr-4" />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Product Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.length > 0 ? (
            products.map((item, index) => (
              <div key={index} className="font-bold text-slate-600">
                <Link href={`/product/${item.id}`} className="block">
                  {/* Using dynamic image URL */}
                  <Image src={productImages[index % productImages.length]} alt={"shoes"} width={400} height={300} />
                  
                  <p className="mt-2">{item.title}</p>
                  <p>{item.category}</p>
                  <p>₹ {item.price}</p>
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
