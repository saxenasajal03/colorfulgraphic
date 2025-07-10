import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "./LoginPage";
import RegisterForm from "./RegisterForm .jsx";

const AuthPage = () => {
  const [showRegister, setShowRegister] = useState(false);
  const location = useLocation();

  // Always show login form by default when navigating to /auth
  useEffect(() => {
    setShowRegister(false);
  }, [location.pathname]);

  // Toggle between login and register
  const handleToggle = () => setShowRegister((prev) => !prev);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-2 py-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Side - blue Gradient, Heading, Illustration */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 to-blue-700 p-6 sm:p-8 md:p-12 text-white">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-xs lg:max-w-md">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 leading-tight">Welcome to<br/>Print-Tech<br/>Solutions<span className="block border-b-4 border-white w-24 mt-2"></span></h2>
            <p className="mb-8 text-base md:text-lg">Empowering your business with high-quality, innovative, and reliable printing services. Experience vibrant prints, fast delivery, and exceptional customer support—every time.</p>
          </div>
          <img 
            src="/assets/bg.png" 
            alt="Print-Tech" 
            className="w-32 h-20 sm:w-40 sm:h-24 md:w-48 md:h-32 lg:w-60 lg:h-40 mt-4 object-contain object-bottom max-w-full" 
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
        {/* Right Side - Toggle between Login and Register */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-4 sm:p-8 md:p-12 bg-white">
          {showRegister ? (
            <RegisterForm onToggle={handleToggle} />
          ) : (
            <LoginForm onToggle={handleToggle} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 