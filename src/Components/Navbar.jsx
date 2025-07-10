import React, { useState, useContext, useRef } from "react";
import { IoIosSearch, IoMdHelpCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaCartPlus } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { AuthContext } from "./Context/AuthContext";
import { CartContext } from "../Components/Context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MegaMenu, { navLinks } from "./MegaMenu";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, handleLogout } = useContext(AuthContext);
  const [cartCount, setCartCount] = useState(0);
  const[ userDetails, setUserDetails] = useState(null);

  const navigate = useNavigate();

  // Add refs and state for dynamic mega menu alignment
  const [dropdownAlign, setDropdownAlign] = useState({});
  const [dropdownVisible, setDropdownVisible] = useState({});
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const dropdownRefs = useRef([]);
  const leaveTimeout = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleAddToCart = () => {
    navigate("/cart");
  };

  useEffect(() => {
    getUserRole();
  }, []);

  const getUserRole = () => {
  const storedUser = localStorage.getItem("userDetails");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Stored User Role:", parsedUser.role);
        setUserDetails(parsedUser);
      } catch (e) {
        console.error("Failed to parse userDetails:", e);
      }
    }
  };

  useEffect(() => {
    if (cart) {
      setCartCount(cart.length);
    }

  }, [cart]);

  // Add this helper function near the top of the file
  const formatCategoryRoute = (name) =>
    "/category/" + name.trim().toLowerCase().replace(/\s+/g, "-");
    
  

  // Handler to show/hide mega menu - simplified to just toggle visibility
  const handleMegaMenuEnter = (index) => {
    if (leaveTimeout.current) {
      clearTimeout(leaveTimeout.current);
    }
    setOpenDropdownIndex(index);
  };

  const handleMegaMenuLeave = () => {
    leaveTimeout.current = setTimeout(() => {
      setOpenDropdownIndex(null);
    }, 200); // 200ms delay before closing
  };

  return (
    <header className="bg-white shadow-md w-full sticky top-0 z-40">
      <div className="flex items-center justify-between px-3 py-3 md:px-6 md:py-4">
        {/* Hamburger Menu Button */}
        <button className="text-gray-600 md:hidden" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <FiX className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>

        {/* Logo */}
        <div className="flex justify-center w-full md:w-auto">
          <a href="/">
            <img
              src="./assets/logo.png"
              alt="Logo"
              className="h-10 md:h-12 w-auto"
            />
          </a>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center border border-blue-700 rounded-md shadow-sm px-2 py-1 w-2/5 lg:w-1/3 mx-auto transition-all duration-300 hover:border-blue-500 hover:shadow-md hover:shadow-blue-100">
          <input
            type="text"
            placeholder="Search"
            className="flex-grow px-2 py-1 focus:outline-none text-sm md:text-base text-gray-700 placeholder-gray-500"
          />
          <button className="text-orange-500 hover:text-orange-700 transition-colors duration-200">
            <IoIosSearch className="h-5 w-5" />
          </button>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4 md:space-x-6">
          <div className="text-gray-600 hover:text-blue-700 flex items-center space-x-2 text-xs md:text-sm cursor-pointer">
            <IoMdHelpCircleOutline className="h-4 w-4 md:h-5 md:w-5" />
            <span>Help Center</span>
          </div>
          {user ? (
            <>
              {userDetails?.role === 1 && (
                <Link
                  to="/dashboard"
                  className="px-6 py-2 text-sm text-gray-700 hover:bg-blue-200 flex items-center"
                >
                  <MdDashboard className="mr-2 h-5 w-5" /> Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-xs md:text-sm text-gray-600 hover:text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-2 md:space-x-4 text-xs md:text-sm text-gray-600">
              <Link to="/auth" className="hover:text-blue-700">
                Login
              </Link>
            </div>
          )}

          {/* Cart */}
          <div
            className="relative text-gray-600 hover:text-blue-700 cursor-pointer"
            onClick={handleAddToCart}
          >
            <FaCartPlus className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-2">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:block border-t border-gray-200">
        <div className="container mx-auto px-10">
          <ul className="flex justify-center items-center py-2 gap-x-6">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className="relative group"
                onMouseEnter={() => link.megaMenu && handleMegaMenuEnter(index)}
                onMouseLeave={handleMegaMenuLeave}
                ref={(el) => (dropdownRefs.current[index] = el)}
              >
                {link.path ? (
                  <Link
                    to={link.path}
                    className={`text-sm text-gray-700 hover:text-blue-700 px-3 py-2 ${
                      openDropdownIndex === index ? 'border-b-2 border-blue-700' : ''
                    }`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <span
                    className={`text-sm text-gray-700 hover:text-blue-700 px-3 py-2 cursor-pointer ${
                      openDropdownIndex === index ? 'border-b-2 border-blue-700' : ''
                    }`}
                  >
                    {link.name}
                  </span>
                )}

                {/* Mega Menu */}
                <MegaMenu
                  link={link}
                  openDropdownIndex={openDropdownIndex}
                  index={index}
                  formatCategoryRoute={formatCategoryRoute}
                />
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`absolute top-0 left-0 h-full w-64 bg-gray-100 shadow-lg transform transition-transform duration-300 z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <button className="text-gray-600 p-4" onClick={toggleMobileMenu}>
          <FiX className="h-6 w-6" />
        </button>
        <nav className="flex flex-col py-4">
          <Link
            to="/inventory"
            className="px-6 py-2 text-sm text-gray-700 hover:bg-blue-200"
          >
            Inventory
          </Link>
          {navLinks.slice(1).map((item, index) => (
            <a
              key={index}
              href="#"
              className="px-6 py-2 text-sm text-gray-700 hover:bg-blue-200"
            >
              {item.name}
            </a>
          ))}
          <hr className="my-2" />
          <a
            href="#"
            className="px-6 py-2 text-sm text-gray-700 hover:bg-blue-200 flex items-center"
          >
            <IoMdHelpCircleOutline className="mr-2 h-5 w-5" /> Help Center
          </a>
          {user ? (
            <>
              {userDetails?.role === 1 && (
                <Link
                  to="/dashboard"
                  className="px-6 py-2 text-sm text-gray-700 hover:bg-blue-200 flex items-center"
                >
                  <MdDashboard className="mr-2 h-5 w-5" /> Dashboard
                </Link>
              )}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
              className="px-6 py-2 text-sm text-gray-700 hover:bg-blue-200"
            >
              Logout
            </a>
          </>
          ) : (
            <a
              href="/auth"
              className="px-6 py-2 text-sm text-gray-700 hover:bg-blue-200"
            >
              Login
            </a>
          )}

          <a
            href="/cart"
            className="relative px-6 py-2 text-sm text-gray-700 hover:bg-blue-200 flex items-center"
          >
            <FaCartPlus className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-2">
                {cartCount}
              </span>
            )}
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
