import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Corporategift from "../assets/images/allCategories/grid-image3.png";
import Poster from "../assets/images/allCategories/grid-image4.png";
import barcodestand from "../assets/images/allCategories/grid-image5.png";
import photoFrame from "../assets/images/allCategories/photoFrame.jpg";
import pakaging from "../assets/images/allCategories/pakaging.jpg";
import sticker from "../assets/images/allCategories/sticker.jpg";
import BusinessCard from "../assets/images/allCategories/businessCard.jpg";
import VisitingCards from "../assets/images/allCategories/visitingCards.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  { id: 1, Name: "Corporate gift", image: Corporategift },
  { id: 2, Name: "Poster", image: Poster },
  { id: 3, Name: "BarCode Stand", image: barcodestand },
  // { id: 4, Name: "Spiral Diary", image: spiralDiary },
  { id: 5, Name: "Photo Frames", image: photoFrame },
  { id: 6, Name: "Packaging", image: pakaging },
  { id: 7, Name: "Stickers", image: sticker },
  { id: 8, Name: "Visiting Cards", image: VisitingCards },
  { id: 9, Name: "Business Cards", image: BusinessCard },
];

const PopularProducts = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const handleCategoryClick = (category) => {
    const formattedCategoryName = category.Name.trim()
      .toLowerCase()
      .replace(/\s+/g, "-");

    navigate(`/category/${formattedCategoryName}`, {
      state: { categoryName: category.Name },
    });
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
       <div className="relative mb-12">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <h2 className="bg-white px-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Popular Products
            </h2>
          </div>
        </div>

      <div className="relative flex items-center">
        {/* Left Scroll Button (Hidden on Mobile) */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 p-2 bg-white shadow-md rounded-full z-10 hidden md:flex hover:bg-gray-100 transition"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Categories Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex space-x-4 sm:space-x-6 overflow-x-auto scrollbar-hide px-2 py-2 no-scrollbar scroll-smooth w-full"
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="w-32 sm:w-40 md:w-48 flex-shrink-0 cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => handleCategoryClick(category)}
            >
              <img
                src={category.image}
                alt={category.Name}
                className="w-full h-28 sm:h-36 md:h-44 object-cover rounded-lg shadow-md hover:shadow-xl transition-all"
              />
              <p className="mt-2 text-center text-sm sm:text-lg font-semibold text-gray-700">
                {category.Name}
              </p>
            </div>
          ))}
        </div>

        {/* Right Scroll Button (Hidden on Mobile) */}
        <button
          onClick={scrollRight}
          className="absolute right-0 p-2 bg-white shadow-md rounded-full z-10 hidden md:flex hover:bg-gray-100 transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default PopularProducts;
