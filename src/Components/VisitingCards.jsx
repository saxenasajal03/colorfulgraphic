import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";
import { Link } from "react-router-dom";

const VisitingCards = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const getPopularProducts = async () => {
      try {
        const data = await fetchProducts();
        console.log("All products:", data);

        // Filter for popular products
        // Look for products that are featured or have certain categories
        const popularProducts = data.filter(
          (item) =>
            item.isFeatured === true ||
            (item.category &&
              (item.category.toLowerCase() === "popularproduct" ||
                item.category.toLowerCase() === "business cards" ||
                item.category.toLowerCase() === "visitingcard"))
        );

        // Take only the first 8 products if there are more
        const limitedProducts = popularProducts.slice(0, 8);

        console.log("Popular products:", limitedProducts);

        // Prepend base URL to image URLs
        const updatedData = limitedProducts.map((item) => ({
          ...item,
          image: `${import.meta.env.VITE_SERVER_PORT}${item.imageUrl}`, // Adjusting image path
        }));

        setItems(updatedData);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load popular products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getPopularProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading popular products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        No popular products available at the moment.
      </div>
    );
  }

  return (
    <div className="py-10 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Popular Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={item.image}
                alt={item.name || "Product"}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name || "Product Name"}
                </h3>
                <p className="text-gray-600 mt-1">
                  {item.description
                    ? item.description.length > 100
                      ? `${item.description.substring(0, 100)}...`
                      : item.description
                    : "No description available"}
                </p>
                <p className="text-gray-900 font-bold mt-2">
                  ₹{item.price || "Price not available"}
                </p>
                <Link
                  to={`/product/${item.id}`}
                  state={{ product: item }}
                  className="mt-3 block text-center py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisitingCards;
