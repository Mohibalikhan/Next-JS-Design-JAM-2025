"use client";
import { useState, useEffect } from "react";
import { useCart } from "../../Context/CartContext";
import Client from "../../../sanity/lib/client";
import { useParams } from "next/navigation";

const Page = () => {
  const { addToCart } = useCart();
  const params = useParams(); // Get params as a promise
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Safely extract productName and handle its type
  const productName =
    typeof params.products === "string" ? decodeURIComponent(params.products) : "";

  useEffect(() => {
    if (!productName) {
      setError("Invalid product name.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const query = `*[_type == "product" && productName == $name][0] {
          productName,
          description,
          category,
          inventory,
          status,
          colors,
          price,
          "image": image.asset->url
        }`;
        const data = await Client.fetch(query, { name: productName });
        if (!data) {
          setError("Product not found.");
        } else {
          setProduct(data);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productName]);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    setSuccessMessage("Product added successfully!");
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Product Image */}
        <div className="flex justify-center">
          {product?.image ? (
            <img
              src={product.image}
              width={400}
              height={400}
              alt={product.productName || "Product Image"}
              className="rounded-lg shadow-lg"
            />
          ) : (
            <div className="w-400 h-400 bg-gray-200 rounded-lg flex items-center justify-center">
              No Image Available
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-bold">{product?.productName}</h1>
          <p className="text-gray-600">{product?.description}</p>
          <p className="text-xl font-semibold">Price: ${product?.price}</p>
          <p className="text-gray-500">
            <span className="font-bold">Category:</span> {product?.category}
          </p>
          <p className="text-gray-500">
            <span className="font-bold">Inventory:</span> {product?.inventory}
          </p>
          <p className="text-gray-500">
            <span className="font-bold">Status</span> {product?.status}
          </p>
          <p className="text-sm font-semibold">Available Colors:</p>
          <div className="flex gap-2">
            {product?.colors?.map((color: string, index: number) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: color ,
                    border: color === "white" ? "2px solid black" : "2px solid #ccc",
                    boxShadow: color === "white" ? "0 0 8px rgba(0, 0, 0, 0.5)" : "0 0 4px rgba(0, 0, 0, 0.2)",
                  
                }}
              ></div>
            ))}
          </div>
                  
        

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