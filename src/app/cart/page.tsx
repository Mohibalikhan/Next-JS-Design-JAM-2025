"use client";
import { useCart } from "../Context/CartContext"; // Import useCart hook
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CartPage = () => {
  const { cart, removeFromCart, incrementQuantity, decrementQuantity } = useCart();

  const { data: session } = useSession(); // Get session data
  const router = useRouter();

  const handleRemove = (productName: string) => {
    removeFromCart(productName);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const handleCheckout = () => {
    if (!session) {
      router.push("/login"); // Redirect to login page
    } else {
      router.push("/checkout"); // Proceed to checkout page
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-800">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center text-lg text-gray-500">Your cart is empty.</div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.productName}
              className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-lg rounded-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-200"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full">
                {/* Product Image */}
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-md group">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.productName}
                      width={120}
                      height={120}
                      className="w-full h-full object-contain rounded-md transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-md">
                      No Image
                    </div>
                  )}
                </div>
                {/* Product Info */}
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-lg font-semibold text-gray-800">{item.productName}</p>
                  <p className="text-sm text-gray-500">Price: ₹{item.price}</p>
                  <div className="flex items-center justify-center sm:justify-start mt-2 gap-4">
                    {/* Increment/Decrement buttons */}
                    <button
                      onClick={() => decrementQuantity(item.productName)}
                      className="bg-gray-200 text-gray-600 p-2 sm:p-3 rounded-full hover:bg-gray-300 transition-all focus:outline-none"
                    >
                      -
                    </button>

                    {/* Quantity */}
                    <p className="text-xl font-semibold text-gray-700">{item.quantity}</p>

                    <button
                      onClick={() => incrementQuantity(item.productName)}
                      className="bg-gray-200 text-gray-600 p-2 sm:p-3 rounded-full hover:bg-gray-300 transition-all focus:outline-none"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(item.productName)}
                className="text-red-600 hover:text-red-800 text-lg font-semibold mt-4 sm:mt-0 sm:ml-4"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total and Checkout */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-6 rounded-lg shadow-lg">
            <p className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-0">
              Total: ₹{getTotalPrice()}
            </p>
            
              <button 
              onClick={handleCheckout}
              className="bg-black text-white py-2 px-6 sm:py-3 sm:px-8 rounded-lg shadow-lg hover:bg-gray-800 transition-all duration-200 ease-in-out">
                Checkout
              </button>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;