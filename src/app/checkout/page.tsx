"use client";

import { useState, useEffect } from "react";
import { urlFor } from "@/sanity/lib/image";
import client from "@/sanity/lib/client";
import { useCart } from "../Context/CartContext";
import { useUser } from "../../hooks/useUser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CheckoutPage() {
  const { cart, getTotalPrice } = useCart();
  const { user } = useUser();
  const [discount, setDiscount] = useState<number>(20);

  const initialFormValues = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);

  const subtotal = getTotalPrice();
  const total = Math.max(subtotal - discount, 0);

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors }; // Changed 'let' to 'const'

    if (!formValues.firstName.trim()) {
      newErrors.firstName = "First Name is required.";
      valid = false;
    } else {
      newErrors.firstName = "";
    }

    if (!formValues.lastName.trim()) {
      newErrors.lastName = "Last Name is required.";
      valid = false;
    } else {
      newErrors.lastName = "";
    }

    if (!formValues.address.trim()) {
      newErrors.address = "Address is required.";
      valid = false;
    } else {
      newErrors.address = "";
    }

    if (!formValues.city.trim()) {
      newErrors.city = "City is required.";
      valid = false;
    } else {
      newErrors.city = "";
    }

    if (!formValues.zipCode.trim()) {
      newErrors.zipCode = "Zip Code is required.";
      valid = false;
    } else if (!/^\d{4,10}$/.test(formValues.zipCode)) {
      newErrors.zipCode = "Zip Code must be between 4-10 digits.";
      valid = false;
    } else {
      newErrors.zipCode = "";
    }

    if (!formValues.phone.trim()) {
      newErrors.phone = "Phone number is required.";
      valid = false;
    } else if (!/^\d{10,15}$/.test(formValues.phone)) {
      newErrors.phone = "Phone number must be between 10-15 digits.";
      valid = false;
    } else {
      newErrors.phone = "";
    }

    if (!formValues.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = "Invalid email format.";
      valid = false;
    } else {
      newErrors.email = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    const userIn = user && "id" in user ? (user as { id: string }).id : undefined;
    const orderData = {
      _type: "order",
      userId: userIn,
      first_name: formValues.firstName,
      last_name: formValues.lastName,
      address: formValues.address,
      city: formValues.city,
      zipCode: formValues.zipCode,
      phone: formValues.phone,
      email: formValues.email,
      cartItems: cart.map((item) => ({
        productName: item.productName,
        quantity: item.quantity,
        image: item.image,
        price: item.price,
      })),
      total: total,
      Delivery_Status: "pending",
    };

    try {
      await client.create(orderData);
      localStorage.removeItem(`cart_${userIn}`);
      localStorage.removeItem("appliedDiscount");

      // Reset form fields to initial empty state
      setFormValues(initialFormValues);

      // Success toast notification
      toast.success(
        <div>
          <h3 className="font-semibold">Order Placed Successfully!</h3>
          <p>Thank you for shopping with us.</p>
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } catch (error) {
      console.error("Error placing order:", error);

      // Error toast notification
      toast.error(
        <div>
          <h3 className="font-semibold">Failed to Place Order</h3>
          <p>Please try again.</p>
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer /> {/* Add this to display toast notifications */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-200 border rounded-lg p-6">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.productName} className="flex items-center gap-4 py-3 border-b">
                  <div className="w-16 h-16 rounded overflow-hidden">
                    {item.image && <img src={urlFor(item.image).url()} alt={item.productName} className="object-cover w-full h-full" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.productName}</h3>
                    <p className="text-xs text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium">${item.price * item.quantity}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Your cart is empty.</p>
            )}
            <div className="text-right pt-4">
              <p className="text-sm">Subtotal = <span className="font-medium">${subtotal}</span></p>
              <p className="text-sm">Discount = <span className="font-medium">-${discount}</span></p>
              <p className="text-lg font-semibold">Total: ${total.toFixed(2)}</p>
            </div>
          </div>

          <div className="bg-slate-200 border rounded-lg p-6">
            <h2 className="text-xl font-semibold">Billing Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Object.keys(formValues).map((key) => (
                <div key={key}>
                  <label htmlFor={key} className="block text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                  <input
                    id={key}
                    value={formValues[key as keyof typeof formValues]}
                    onChange={handleInputChange}
                    className={`border w-full p-2 rounded mt-1 ${errors[key as keyof typeof errors] ? "border-red-500" : ""}`}
                  />
                  {errors[key as keyof typeof errors] && (
                    <p className="text-xs text-red-500">{errors[key as keyof typeof errors]}</p>
                  )}
                </div>
              ))}
            </div>
            <button
              className="w-full h-12 bg-blue-500 hover:bg-green-400 text-black mt-4 rounded"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}