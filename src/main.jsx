import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./Components/Context/AuthContext.jsx";
import { CartProvider } from "./Components/Context/CartContext.jsx";
import {
  LoadingProvider,
  useLoading,
} from "./Components/Context/LoadingContext.jsx";
import Lottie from "lottie-react";
import animationData from "./assets/printing.json";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

// Loader component to show the animation when loading is true
const Loader = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <Lottie animationData={animationData} loop={true} className="w-64 h-64" />
    </div>
  );
};

const RootComponent = () => {
  return (
    <StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <AuthProvider>
            <CartProvider>
              <LoadingProvider>
                <Loader />
                <App />
              </LoadingProvider>
            </CartProvider>
          </AuthProvider>
        </BrowserRouter>
      </HelmetProvider>
    </StrictMode>
  );
};

// Render the component
createRoot(document.getElementById("root")).render(<RootComponent />);
