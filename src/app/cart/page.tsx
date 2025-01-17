"use client";
import type { StaticImageData } from "next/image";
import React from "react";
import { useCart } from "../Context/CartContext";
import Image from "next/image";

import product1 from "../../../public/assests/s1.png";
import product2 from "../../../public/assests/s2.png";
import product3 from "../../../public/assests/s3.png";
import product4 from "../../../public/assests/s4.png";
import product5 from "../../../public/assests/s5.png";
import product6 from "../../../public/assests/s6.png";
import product7 from "../../../public/assests/s7.png";
import product8 from "../../../public/assests/s8.png";
import product9 from "../../../public/assests/s9.png";
import product10 from "../../../public/assests/s10.png";
import product11 from "../../../public/assests/s11.png";
import product12 from "../../../public/assests/s12.png";
import product13 from "../../../public/assests/s13.png";
import product14 from "../../../public/assests/s14.png";
import product15 from "../../../public/assests/s15.png";
import product16 from "../../../public/assests/s16.png";
import product17 from "../../../public/assests/s17.png";
import product18 from "../../../public/assests/s18.png";
import product19 from "../../../public/assests/s19.png";
import product20 from "../../../public/assests/s20.png";
import product21 from "../../../public/assests/s21.png";

const productImages: { [key: string]: StaticImageData } = {
  "1": product1,
  "2": product2,
  "3": product3,
  "4": product4,
  "5": product5,
  "6": product6,
  "7": product7,
  "8": product8,
  "9": product9,
  "10": product10,
  "11": product11,
  "12": product12,
  "13": product13,
  "14": product14,
  "15": product15,
  "16": product16,
  "17": product17,
  "18": product18,
  "19": product19,
  "20": product20,
  "21": product21,
};

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl font-bold text-gray-600">Your cart is empty.</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Your Cart</h1>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((item) => {
          const productImage = productImages[item.id] || product1;

          return (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center border rounded-lg shadow-md overflow-hidden"
            >
              {/* Product Image */}
              <div className="flex-shrink-0 w-full sm:w-40">
                <Image
                  src={productImage}
                  layout="responsive"
                  width={150}
                  height={150}
                  alt={item.title}
                  className="object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 p-4 space-y-2">
                <h2 className="text-lg font-bold truncate">{item.title}</h2>
                <p className="text-gray-600">${item.price}</p>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 mt-4 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Payment Section */}
      <div className="p-4 border rounded-lg shadow-md bg-gray-50 flex justify-between items-center">
        <h2 className="text-lg font-bold">Total Payment:</h2>
        <p className="text-xl font-bold text-green-600">${totalPrice.toFixed(2)}</p>
        <button
          onClick={() => cart.forEach((item) => removeFromCart(item.id))}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Remove All
        </button>
      </div>
    </div>
  );
};

export default CartPage;
