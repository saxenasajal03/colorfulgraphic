import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import icons
import image1 from "../assets/images/slider/1.jpg";
import image2 from "../assets/images/slider/2.jpg";
import image3 from "../assets/images/slider/3.jpg";
import image4 from "../assets/images/slider/4.jpg";
import image5 from "../assets/images/slider/5.jpg";
import image6 from "../assets/images/slider/6.jpg";
import image7 from "../assets/images/slider/7.jpg";

const items = [
  {
    id: 1,
    Name: "Business Cards",
    price: "200",
    category: "Stationary",
    description: "",

    image: image1,
    isActive: 1,
  },
  {
    id: 2,
    Name: "Business Cards",
    price: "200",
    category: "Stationary",
    description: "",

    image: image2,
    isActive: 1,
  },
  {
    id: 3,
    Name: "Business Cards",
    price: "200",
    category: "Stationary",
    description: "",

    image: image3,
    isActive: 1,
  },
  {
    id: 4,
    Name: "Business Cards",
    price: "200",
    category: "Stationary",
    description: "",

    image: image4,
    isActive: 1,
  },
  {
    id: 5,
    Name: "Slider2",
    price: "200",
    category: "Stationary",
    description: "",

    image: image5,
    isActive: 1,
  },
  {
    id: 6,
    Name: "Business Cards",
    price: "200",
    category: "Stationary",
    description: "",
    image: image6,
    isActive: 1,
  },
  {
    id: 7,
    Name: "Business Cards",
    price: "200",
    category: "Stationary",
    description: "",
    image: image7,
    isActive: 1,
  },
];

const CarouselComponent = () => {
  const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;
  // const [items, setItems] = useState([]);
  const [slidePercentage, setSlidePercentage] = useState(25);

  useEffect(() => {
    const updateSlidePercentage = () => {
      if (window.innerWidth >= 1024) {
        setSlidePercentage(25); // 4 images
      } else if (window.innerWidth >= 768) {
        setSlidePercentage(33.33); // 3 images
      } else {
        setSlidePercentage(50); // 2 images
      }
    };

    console.log("items: ", items);

    updateSlidePercentage();
    window.addEventListener("resize", updateSlidePercentage);

    return () => {
      window.removeEventListener("resize", updateSlidePercentage);
    };
  }, []);

  // Fetch data from the API
  // useEffect(() => {
  //   const fetchSliderData = async () => {
  //     try {
  //       const response = await fetch(`${SERVER_PORT}/api/Categories/slider`);
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch slider data");
  //       }
  //       const data = await response.json();
  //       const sliderData = data.filter(
  //         (item) => item.category.toLowerCase() === "slider"
  //       );

  //       const updatedData = sliderData.map((item) => ({
  //         ...item,
  //         image: `${SERVER_PORT}${item.image}`,
  //       }));

  //       setItems(updatedData);
  //     } catch (error) {
  //       console.error("Error fetching slider data:", error);
  //     }
  //   };

  //   fetchSliderData();
  // }, []);

  return (
    <div className="max-w-screen-xl mx-auto py-8 relative">
      {items.length > 0 ? (
        <Carousel
          autoPlay
          infiniteLoop
          interval={3000}
          showThumbs={false}
          showStatus={false}
          showIndicators={true}
          centerMode
          centerSlidePercentage={slidePercentage}
          renderArrowPrev={(clickHandler, hasPrev) =>
            hasPrev && (
              <button
                onClick={clickHandler}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-600 transition-all"
                style={{ zIndex: 10 }}
              >
                <FaChevronLeft size={20} />
              </button>
            )
          }
          renderArrowNext={(clickHandler, hasNext) =>
            hasNext && (
              <button
                onClick={clickHandler}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-md hover:bg-gray-600 transition-all"
                style={{ zIndex: 10 }}
              >
                <FaChevronRight size={20} />
              </button>
            )
          }
          renderIndicator={(clickHandler, isSelected, index) => (
            <button
              onClick={clickHandler}
              className={`w-3 h-3 mx-1 rounded-full ${
                isSelected ? "bg-blue-500 scale-125" : "bg-gray-400"
              } transition-all`}
            />
          )}
        >
          {items.map((item, index) => (
            <a href="#" key={index} className="block text-center">
              <div className="w-full h-52 flex items-center justify-center overflow-hidden p-2">
                <img
                  src={item.image}
                  className="object-contain w-full h-full rounded-md shadow-lg"
                />
              </div>
            </a>
          ))}
        </Carousel>
      ) : (
        <p className="text-center text-gray-500">Loading slider data...</p>
      )}
    </div>
  );
};

export default CarouselComponent;
