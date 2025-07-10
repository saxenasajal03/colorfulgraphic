import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
// import { CartProvider } from "./Context/CartContext";
import Navbar from "./Navbar";
import PopularProducts from "./PopularProducts";
import CarouselComponent from "./CarouselComponent";
import VisitingCards from "./VisitingCards";
import Banner from "./Banner";
import AllCategories from "./AllCategories";
import Clients from "./Clients";
import Blog from "./Blog";
import { fetchCategoryProductTree } from '../services/api';

const HomePage = () => {
  const [categoryTree, setCategoryTree] = useState([]);
  const [loading, setLoading] = useState(true);
  const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

  useEffect(() => {
    fetchCategoryProductTree()
      .then((res) => {
        setCategoryTree(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Fetch products data from the API
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch(`${SERVER_PORT}/api/Product`);
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       // Map the API data to the structure expected by ProductGrid
  //       const formattedProducts = data.map((product) => ({
  //         id: product.productId,
  //         name: product.name,
  //         price: product.price,
  //         image: `${SERVER_PORT}${product.imageUrl}`,
  //       }));
  //       setProducts(formattedProducts);
  //       console.log(products);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <Helmet>
        <title>Colorful Graphic | Custom Printing & Branding</title>
        <meta name="description" content="Discover custom printing, branding, and creative solutions for your business at Colorful Graphic." />
        <meta property="og:title" content="Colorful Graphic | Custom Printing & Branding" />
        <meta property="og:description" content="Discover custom printing, branding, and creative solutions for your business at Colorful Graphic." />
        <meta property="og:image" content="/assets/preview.png" />
        <meta property="og:url" content="https://colorfulgraphic.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Colorful Graphic | Custom Printing & Branding" />
        <meta name="twitter:description" content="Discover custom printing, branding, and creative solutions for your business at Colorful Graphic." />
        <meta name="twitter:image" content="/assets/preview.png" />
      </Helmet>
      {/* Dynamic Category Tree Rendering */}
      {/* <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Dynamic Categories & Products</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {categoryTree.map((cat) => (
              <div key={cat.master_category_id} className="mb-8 border-b pb-4">
                <h3 className="text-xl font-semibold">{cat.master_category_name}</h3>
                {cat.master_category_imageurl && (
                  <img src={cat.master_category_imageurl} alt={cat.master_category_name} className="h-24 mb-2" />
                )}
                <p>{cat.master_category_description}</p>
                {cat.anysubcategory ? (
                  <div className="ml-4">
                    {cat.subcategories.map((sub) => (
                      <div key={sub.sub_category_id} className="mb-2">
                        <h4 className="font-medium">{sub.sub_category_name}</h4>
                        {sub.products.map((prod) => (
                          <div key={prod.product_id} className="ml-4 text-sm">
                            {prod.product_name} - ₹{prod.product_price}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="ml-4">
                    {cat.products.map((prod) => (
                      <div key={prod.product_id} className="text-sm">
                        {prod.product_name} - ₹{prod.product_price}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div> */}
      {/* Banner Section */}
      <Banner />
      {/* Carousel Section */}
      <CarouselComponent />
      {/* All Categories Section */}
      <AllCategories />
      {/* Popular Products Section */}
      <PopularProducts />

      {/* <VisitingCards /> */}
      {/* Clients Section */}
      <Clients />
      {/* Blog Section */}
      <Blog />
    </>
  );
};

export default HomePage;
