"use client";
import type { StaticImageData } from "next/image";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "../../Context/CartContext";
import product1 from "../../../../public/assests/s1.png";
import product2 from "../../../../public/assests/s2.png";
import product3 from "../../../../public/assests/s3.png";
import product4 from "../../../../public/assests/s4.png";
import product5 from "../../../../public/assests/s5.png";
import product6 from "../../../../public/assests/s6.png";
import product7 from "../../../../public/assests/s7.png";
import product8 from "../../../../public/assests/s8.png";
import product9 from "../../../../public/assests/s9.png";
import product10 from "../../../../public/assests/s10.png";
import product11 from "../../../../public/assests/s11.png";
import product12 from "../../../../public/assests/s12.png";
import product13 from "../../../../public/assests/s13.png";
import product14 from "../../../../public/assests/s14.png";
import product15 from "../../../../public/assests/s15.png";
import product16 from "../../../../public/assests/s16.png";
import product17 from "../../../../public/assests/s17.png";
import product18 from "../../../../public/assests/s18.png";
import product19 from "../../../../public/assests/s19.png";
import product20 from "../../../../public/assests/s20.png";
import product21 from "../../../../public/assests/s21.png";

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

const Page = ({ params }: { params: Promise<{ products: string }> }) => {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productId, setProductId] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setProductId(resolvedParams.products);
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    const fetchProductData = async () => {
      if (!productId) return;

      try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product data.");
        }
        const data = await response.json();
        setProduct(data);
      } catch {
        setError("Failed to fetch product data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    setSuccessMessage("Product added successfully!");
    setTimeout(() => {
      setSuccessMessage(""); // Hide the message after 2 seconds
    }, 2000);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  const productImage = productId && productImages[productId] ? productImages[productId] : product1;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Product Image */}
        <div className="flex justify-center">
          <Image
            src={productImage}
            width={400}
            height={400}
            alt="Product Image"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-xl font-semibold">Price: ${product.price}</p>
          <p className="text-gray-500">
            <span className="font-bold">Category:</span> {product.category}
          </p>
          <p className="text-gray-500">
            <span className="font-bold">Brand:</span> {product.brand}
          </p>

          <button
            onClick={() => handleAddToCart(product)}
            className="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-all"
          >
            Add to Cart
          </button>

          {/* Success Message */}
          {successMessage && (
            <div className="text-center text-green-700 mt-4">{successMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
