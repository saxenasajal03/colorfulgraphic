import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import banner from "../../assets/images/businesscards/banner.jpg";
import { useLocation } from "react-router-dom";
const LetterHead = () => {
  const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;
  // const { categoryName } = useParams();
  const location = useLocation();
  const categoryName = location.state?.categoryName || "Default Category";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  console.log("Category Name: ", categoryName);

  const formatCategoryName = (name) => {
    return name
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const formattedCategoryName = formatCategoryName(categoryName);
        console.log("Formatted Category Name: ", formattedCategoryName);
        const response = await fetch(`${SERVER_PORT}/Home/GetProducts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ CategoryName: formattedCategoryName }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  if (loading) {
    return <p className="text-center text-gray-500 text-lg">Loading...</p>;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">
      {/* Integrated Banner */}
      <div className="w-full max-w-screen-xl mx-auto py-4 relative overflow-hidden">
        <div className="relative w-full flex justify-center">
          <div
            className={`relative w-full transition-transform duration-700 ease-in-out ${
              currentIndex === 0 ? "translate-x-0 opacity-100" : "hidden"
            }`}
          >
            <img
              src={banner}
              alt="Banner"
              className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-contain md:object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 my-6">
        Most Popular Business Cards
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div className="bg-white overflow-hidden shadow-md hover:shadow-lg transition duration-300 cursor-pointer transform hover:scale-100">
                <div className="w-[150px] sm:w-[180px] md:w-[200px] lg:w-[220px] h-[150px] sm:h-[180px] md:h-[200px] lg:h-[220px] mx-auto">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-800 whitespace-nowrap">
                    {product.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LetterHead;
