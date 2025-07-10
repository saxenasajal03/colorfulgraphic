import React, { useContext, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthContext } from "./Components/Context/AuthContext";
import Navbar from "./Components/Navbar";
import AuthPage from "./Components/AuthPage.jsx";
// import LoginPage from "./Components/LoginPage";
// import SignupPage from "./Components/SignupPage";
// import RegisterForm from "./Components/RegisterForm ";
// import HomePage from "./Components/Homepage";
import HomePage from "./Components/HomePage";
import ShoppingCart from "./Components/ShoppingCart";
import CheckoutPage from "./Components/CheckoutPage";
import LetterHead from "./Components/Product/LetterHead";
import Stationary from "./Components/Stationay";
import BusinessCard from "./Components/Product/BusinessCard";
import ProductDetails from "./Components/ProductDetails";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart";
import TShirts from "./Components/Product/TShirts";
import ShirtsTshirts from "./Components/ShirtsTshirts";
import Labels from "./Components/Product/Labels";
import UnderDevelopment from "./Components/UnderDevelopment";
import Checkout from "./Components/Checkout";
import PaymentSuccess from "./Components/PaymentSuccess";
import Payment from "./Components/Payment";
import Dashboard from "./Components/Dashboard";
import AdminRegister from "./Components/AdminRegister";
import WhatsAppButton from "./Components/WhatsAppButton";
import Inventory from "./Components/Inventory";

const App = () => {
  const { user, handleLogin } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && !user) {
      handleLogin(token);
    }
  }, [user, handleLogin]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  // Always show Navbar except on /auth
  // const shouldShowNavbar = location.pathname !== "/auth";

  return (
    <div>
      {/* {shouldShowNavbar && <Navbar />} */}
      <Navbar />
      <Routes>
        <Route path="*" element={<UnderDevelopment />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/shoppingcart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/business-cards" element={<BusinessCard />} />
        <Route path="/category/t-shirts" element={<TShirts />} />
        <Route path="/category/shirts-and-t-shirts" element={<ShirtsTshirts />} />
        <Route path="/category/labels" element={<Labels />} />
        <Route path="/category/letter-head" element={<LetterHead />} />
        <Route path="/category/stationary" element={<Stationary />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard" element={<UnderDevelopment />} />
        <Route path="/adminregister" element={<AdminRegister /> }/>
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default App;
