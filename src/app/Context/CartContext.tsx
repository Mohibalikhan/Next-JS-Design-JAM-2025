"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useUser } from "@/hooks/useUser"; // Assuming this is where user info comes from

interface Product {
  productName: string;
  price: number;
  image?: string;
  quantity: number;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productName: string) => void;
  incrementQuantity: (productName: string) => void;
  decrementQuantity: (productName: string) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();  // Access logged-in user's info (ensure user is loaded)
  const [cart, setCart] = useState<Product[]>([]);

  // Check if user has an 'id' property
  const userId = user && 'id' in user ? (user as { id: string }).id : undefined;

  // Load the cart from localStorage for the logged-in user (if available)
  useEffect(() => {
    if (typeof window !== "undefined" && userId) {
      try {
        const savedCart = localStorage.getItem(`cart_${userId}`);
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error("Error loading cart from local storage:", error);
      }
    }
  }, [userId]); // Trigger cart load when user changes

  // Save the cart to localStorage for the logged-in user
  useEffect(() => {
    if (typeof window !== "undefined" && userId) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
    }
  }, [cart, userId]); // Update localStorage whenever cart or user changes

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.productName === product.productName);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.productName === product.productName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productName: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.productName !== productName));
  };

  const updateQuantity = (productName: string, change: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productName === productName
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const incrementQuantity = (productName: string) => updateQuantity(productName, 1);
  const decrementQuantity = (productName: string) => updateQuantity(productName, -1);

  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0);
  const getTotalPrice = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, getTotalItems, getTotalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within the <CartProvider>.");
  return context;
};