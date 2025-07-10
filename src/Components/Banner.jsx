import React, { useState } from "react";
import banner from "../assets/images/banner/banner1.jpg";

const items = [
  {
    id: 1,
    Name: "Banner",
    price: "200",
    category: "Stationary",
    description: "",
    image: banner,
    product: "Banner",
    isActive: 1,
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-full relative overflow-hidden bg-white">
      {items.length > 0 ? (
        <div className="relative w-full flex justify-center">
          {items.map((item, index) => (
            <div
              key={index}
              className={`relative w-full transition-transform duration-700 ease-in-out ${
                index === currentIndex ? "translate-x-0 opacity-100" : "hidden"
              }`}
            >
              <img
                src={item.image}
                alt={item.product || "Banner"}
                className="w-full h-[180px] sm:h-[260px] md:h-[350px] lg:h-[420px] xl:h-[500px] object-contain object-center bg-white"
              />
              {/* Gradient overlay for text readability */}
              {/* <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 flex items-center justify-center">
                
              </div> */}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading banner...</p>
      )}
    </div>
  );
};

export default Banner;
