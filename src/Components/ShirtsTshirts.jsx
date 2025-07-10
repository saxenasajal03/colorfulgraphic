import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ShirtsTshirts = () => {
  const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const selectedCategoryId = location.state?.masterCategoryId || null;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${SERVER_PORT}/api/categories`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        // console.log("LetterHead Products:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryClick = (category) => {
    // console.log("Clicked MasterCategory ID:", category.masterCategoryId);
    console.log("From Category: ", category);
    const formattedCategoryName = category.name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");

    navigate(`/category/${formattedCategoryName}`, {
      state: { categoryId: category.categoryId },
    });
  };

  useEffect(() => {
    if (selectedCategoryId !== null) {
      //   console.log("Selected Category ID:", selectedCategoryId);
      const filtered = products.filter(
        (product) => product.masterCategoryId === selectedCategoryId
      );
      //   console.log("Filtered Products:", filtered);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategoryId, products]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-4">
        Master Category ID: {selectedCategoryId}
      </h2>
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded-lg shadow-md bg-white cursor-pointer"
              onClick={() => handleCategoryClick(product)}
            >
              <img
                src={`${SERVER_PORT}${product.imageUrl}`}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShirtsTshirts;
