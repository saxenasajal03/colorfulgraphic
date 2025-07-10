import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import images for categories
import apparelImg from '../assets/images/allCategories/grid-image3.png';
import awardsImg from '../assets/images/allCategories/namePlate.jpg';
import stationeryImg from '../assets/images/allCategories/businessCard.jpg';
import giftsImg from '../assets/images/allCategories/spiralDiary.jpg';
import drinkwareImg from '../assets/images/allCategories/bottles.jpg';
import packagingImg from '../assets/images/allCategories/pakaging.jpg';
import photoGiftsImg from '../assets/images/allCategories/photoFrame.jpg';
import marketingImg from '../assets/images/allCategories/sticker.jpg';

const AllCategories = () => {
  const navigate = useNavigate();

  const popularCategories = [
    { id: 1, Name: 'Apparel', image: apparelImg },
    { id: 2, Name: 'Awards & Certificates', image: awardsImg },
    { id: 3, Name: 'Business Stationery', image: stationeryImg },
    { id: 4, Name: 'Corporate Gifts', image: giftsImg },
    { id: 5, Name: 'Drinkware', image: drinkwareImg },
    { id: 6, Name: 'Packaging Solutions', image: packagingImg },
    { id: 7, Name: 'Photo Gifts', image: photoGiftsImg },
    { id: 8, Name: 'Sign & Marketing', image: marketingImg },
  ];

  const handleCategoryClick = (category) => {
    const formattedCategoryName = category.Name.trim()
      .toLowerCase()
      .replace(/\s+/g, '-');

    navigate(`/category/${formattedCategoryName}`, {
      state: { categoryName: category.Name },
    });
  };

  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-12">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <h2 className="bg-white px-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Shop By Categories
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12">
          {popularCategories.map((category) => (
            <div
              key={category.id}
              className="text-center cursor-pointer group"
              onClick={() => handleCategoryClick(category)}
            >
              <div className=" rounded-lg overflow-hidden p-6">
                <img
                  src={category.image}
                  alt={category.Name}
                  className="h-40 w-full object-contain object-center transition-transform duration-300"
                />
              </div>
              <h3 className="mt-5 text-xl font-bold text-gray-700">
                {category.Name}
              </h3>
              <div className="mt-3">
                <span className="inline-block bg-blue-700 text-white text-sm font-semibold px-5 py-1 rounded-md hover:bg-blue-800 transition-colors">
                  SHOP NOW &gt;
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCategories;
