"use client";
import { useCart } from "../Context/CartContext"; // Import useCart hook
import Link from "next/link";
import Image from "next/image";

const CartPage = () => {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity } = useCart();

  const handleRemove = (productName: string) => {
    removeFromCart(productName);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  return (
    <div className="container mx-auto px-6 sm:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center text-lg text-gray-500">Your cart is empty.</div>
      ) : (
        <div className="space-y-8">
          {cart.map((item) => (
            <div key={item.productName} className="flex items-center justify-between bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center gap-6">
                {/* Product Image */}
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.productName}
                    width={120}
                    height={120}
                    className="object-contain rounded-md"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-md">
                    No Image
                  </div>
                )}
                {/* Product Info */}
                <div>
                  <p className="text-lg font-semibold text-gray-800">{item.productName}</p>
                  <p className="text-sm text-gray-500">Price: ₹{item.price}</p>
                  <div className="flex items-center mt-2 gap-4">
                    {/* Increment/Decrement buttons */}
                    <button
                      onClick={() => decrementQuantity(item.productName)}
                      className="bg-gray-200 text-gray-600 p-3 rounded-full hover:bg-gray-300 transition-all focus:outline-none"
                    >
                      -
                    </button>

                    {/* Quantity */}
                    <p className="text-xl font-semibold text-gray-700">{item.quantity}</p>

                    <button
                      onClick={() => incrementQuantity(item.productName)}
                      className="bg-gray-200 text-gray-600 p-3 rounded-full hover:bg-gray-300 transition-all focus:outline-none"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(item.productName)}
                className="text-red-600 hover:text-red-800 text-lg font-semibold"
              >
                Remove
              </button>
            </div>
          ))}
          
          <div className="mt-8 flex justify-between items-center bg-gray-100 p-6 rounded-lg shadow-lg">
            <p className="text-2xl font-semibold text-gray-800">Total: ₹{getTotalPrice()}</p>
            <Link href="/checkout">
              <button className="bg-black text-white py-3 px-8 rounded-lg shadow-lg hover:bg-gray-800 transition-all duration-200 ease-in-out">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;