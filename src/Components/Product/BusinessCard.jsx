import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import banner from "../../assets/images/businesscards/banner.jpg";
import { useLocation } from "react-router-dom";
import { fetchProducts, fetchProductsByCategory } from "../../services/api";
import FAQ from "../FAQ";
import Feedback from "../Feedback";

const faqData = [
    { question: 'What is a business card?', answer: 'A business card is a small card identifying a person in connection with his or her business, given to a client, potential client, etc.' },
    { question: 'Can I customise my shape?', answer: 'Yes, we offer custom shape cutting for business cards. Please contact our support team for more details on pricing and feasibility.' },
    { question: 'What is the difference between a metallic and transparent card?', answer: 'Metallic cards have a shimmering, metal-like finish, offering a premium and sturdy feel. Transparent cards are made of clear plastic, providing a modern and unique look.' },
    { question: 'Is there any minimum limit to order?', answer: 'Yes, the minimum order quantity for most of our business cards is 100 units. Some special finishes might have a different minimum limit.' },
    { question: 'Should I put a picture of myself on my business card?', answer: 'It depends on your profession. For real estate agents, consultants, and artists, a professional headshot can help build trust and recall. For most corporate roles, it is not common.' },
    { question: 'Does the colour used in business cards affect the business?', answer: 'Yes, colors evoke emotions and can influence perception. Choosing colors that align with your brand identity is crucial for making a good first impression.' },
    { question: 'Do I need a business card for my start-up company?', answer: 'Absolutely. A business card is a physical token of your brand that makes you look professional, facilitates networking, and helps in brand recall.' },
    { question: 'What does spot UV mean?', answer: 'Spot UV is a glossy coating applied to specific areas of your card to create a high-contrast, eye-catching effect. It adds a premium, tactile feel to your logo or design elements.' },
    { question: 'Will a square card fit into my wallet?', answer: 'Standard square business cards (e.g., 2.5" x 2.5") may not fit in traditional wallet slots designed for rectangular cards, but they are unique and memorable.' },
    { question: 'Can I order for bulk quality?', answer: 'Yes, we offer significant discounts for bulk orders. Please get in touch with our sales team for a custom quote based on your requirements.' },
    { question: 'What does your business card say about you?', answer: 'Your business card is a reflection of your professional identity and your brand. A well-designed, high-quality card suggests attention to detail and professionalism.' },
    { question: 'Do you offer urgent or same-day business card printing services?', answer: 'Yes, we offer expedited and same-day printing services for select business card types in many locations. Additional charges may apply.' },
];

const feedbackData = [
  { name: 'John Doe', rating: 5, comment: 'The quality of the business cards is outstanding! The metallic finish is just perfect.', avatar: '/images/clients/1.jpg' },
  { name: 'Jane Smith', rating: 5, comment: 'Fast delivery and excellent customer service. The spot UV effect on my cards looks amazing.', avatar: '/images/clients/2.jpg' },
  { name: 'Sam Wilson', rating: 4, comment: 'Good quality for the price. The colors are vibrant, though the cardstock could be a bit thicker.', avatar: '/images/clients/3.jpg' },
];

const BusinessCard = () => {
  const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;
  // const { categoryName } = useParams();
  const location = useLocation();
  const categoryName = location.state?.categoryName || "Business Cards";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Wishlist state: key is product id, value is boolean
  const [wishlist, setWishlist] = useState({});

  console.log("Category Name: ", categoryName);

  const formatCategoryName = (name) => {
    return name
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const formattedCategoryName = formatCategoryName(categoryName);
        console.log("Formatted Category Name: ", formattedCategoryName);

        // First, try to get products by category
        let data = await fetchProductsByCategory(formattedCategoryName);
        console.log("Products for category:", data);

        // If no products found, fetch all products and filter client-side as a fallback
        if (!data || data.length === 0) {
          console.log(
            "No products found with category API, fetching all products as fallback"
          );
          const allProducts = await fetchProducts();

          // Filter products by category
          data = allProducts.filter(
            (product) =>
              product.category &&
              product.category.toLowerCase() ===
                formattedCategoryName.toLowerCase()
          );
          console.log("Filtered products:", data);
        }

        setProducts(data);
        console.log("Business Cards: ", data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [categoryName]);

  if (loading) {
    return (
      <p className="text-center text-gray-500 text-lg py-10">
        Loading products...
      </p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg py-10">{error}</p>;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          No products found for {formatCategoryName(categoryName)}
        </h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-10 bg-white min-h-screen">
      {/* Responsive Banner */}
      <div className="relative w-full max-w-screen-2xl mx-auto overflow-hidden">
        <img
          src={banner}
          alt="Business Cards Banner"
          className="w-full h-[180px] sm:h-[260px] md:h-[350px] lg:h-[420px] xl:h-[500px] object-contain object-center bg-white"
        />
        {/* No shadow, no gradient overlay for ultra-clean look */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* <h1 className="text-gray-900 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide">
            {formatCategoryName(categoryName)}
          </h1> */}
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {products.map((product) => {
            const productKey = product.id || product.productId;
            const isWishlisted = wishlist[productKey] || false;
            return (
              <Link
                key={productKey}
                to={`/product/${productKey}`}
                state={{ product: product }}
                className="flex flex-col items-center min-w-[160px] max-w-xs mx-auto cursor-pointer group h-full font-sans p-2 sm:p-3 md:p-4 rounded-lg shadow-sm border border-gray-100 bg-white transition-transform duration-200 hover:scale-[1.03]"
                style={{ textDecoration: 'none' }}
              >
                <div className="relative w-full flex flex-col items-center justify-center" style={{ height: '140px' }}>
                  <img
                    src={product.image_url || product.imageUrl}
                    alt={product.name}
                    className="object-contain h-full max-h-[100px] sm:max-h-[120px] md:max-h-[140px] w-auto mx-auto mb-2 sm:mb-4"
                  />
                  {/* Heart icon absolutely at top right */}
                  <span
                    className={`absolute right-2 top-2 sm:right-3 sm:top-3 text-lg sm:text-xl select-none cursor-pointer transition-colors duration-200 ${isWishlisted ? 'text-red-500' : 'text-gray-300'}`}
                    onClick={e => {
                      e.preventDefault(); // Prevent Link navigation
                      setWishlist(prev => ({
                        ...prev,
                        [productKey]: !isWishlisted
                      }));
                    }}
                    title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    style={{ zIndex: 2 }}
                  >
                    {isWishlisted ? '♥' : '♡'}
                  </span>
                </div>
                {/* Product Name Centered */}
                <h3 className="text-base sm:text-lg md:text-xl font-medium text-gray-900 tracking-wide truncate w-full mb-1 sm:mb-2 text-center">
                  {product.name}
                </h3>
                {/* Description and Price Left-Aligned */}
                <div className="w-full flex flex-col items-start">
                  {/* <p className="text-xs sm:text-sm truncate w-full mb-2 text-gray-400 text-left text-wrap">
                    {product.description || ''}
                  </p> */}
                  <span className="font-bold text-gray-900 mb-2 text-sm sm:text-base text-left">
                    ₹{product.price}
                  </span>
                </div>
                {product.stock === 0 || product.stockQuantity === 0 ? (
                  <button className="w-full py-1.5 px-2 sm:py-2 sm:px-4 bg-teal-100 text-gray-700 rounded uppercase tracking-widest text-xs sm:text-sm font-medium cursor-not-allowed mt-1" disabled>
                    OUT OF STOCK
                  </button>
                ) : null}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Add new components here */}
      <FAQ questions={faqData} />
      <Feedback feedbackItems={feedbackData} />
    </div>
  );
};

export default BusinessCard;
