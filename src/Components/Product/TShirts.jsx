import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TShirts = () => {
  const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const selectedCategoryId = location.state?.categoryId || null;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${SERVER_PORT}/api/Product`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        console.log("Data from Tshirts", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategoryId !== null) {
      const filtered = products.filter(
        (product) => product.categoryId === selectedCategoryId
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategoryId, products]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">
      <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
        {selectedCategoryId
          ? `Category: ${selectedCategoryId}`
          : "All Products"}
      </h2>
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.productId}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => handleProductClick(product.productId)}
            >
              <img
                src={`${SERVER_PORT}${product.imageUrl}`}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold text-gray-700">
                  {product.name}
                </h3>
                {/* <p className="text-lg text-gray-500 font-semibold">
                  ${product.price}
                </p>
                <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  View Details
                </button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TShirts;
