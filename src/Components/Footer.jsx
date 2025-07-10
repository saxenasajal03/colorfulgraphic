import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaInstagram, 
  FaFacebookF, 
  FaLinkedinIn, 
  FaPinterestP, 
  FaTwitter,
  FaCcVisa,
  FaCcMastercard,
  FaGooglePlay,
  FaAppStoreIos
} from 'react-icons/fa';
// import { SiUpi } from 'react-icons/si';
// import visa from '../assets/images/payment/visa.png';
// import mastercard from '../assets/images/payment/mastercard.png';
// import upi from '../assets/images/payment/upi.png';
// import appstore from '../assets/images/payment/app-store.png';
// import googlestore from '../assets/images/payment/google-play.png';

const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <footer className="bg-white text-gray-700 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Colorful Graphic – Your Imagination, Our Print Innovation
          </h2>
          <div className="mt-6 max-w-4xl text-gray-600 space-y-4">
            <p>
              At Colorful Graphic, we transform your ideas into vibrant reality. From business essentials to creative gifts, signage, and branded merchandise, we're India's trusted partner for high-quality, on-demand printing—delivered with a personal touch.
            </p>
            <p>
              Based in Noida Sector 10, our advanced 50,000+ sq. ft. facility and growing network of retail stores empower startups and enterprises alike to print smarter, faster, and greener. Whether you need a handful of T-shirts or thousands of custom kits, we're here to help you stand out.
              <button onClick={() => setIsExpanded(!isExpanded)} className="text-blue-600 hover:underline ml-1">
                {isExpanded ? '...show less' : '...read more'}
              </button>
            </p>

            {isExpanded && (
              <div className="space-y-4 pt-4">
                <h3 className="font-bold text-lg text-gray-800">Why Choose Colorful Graphic?</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Over 15 years of creative print expertise and innovation</li>
                  <li>Trusted by 100,000+ customers, from local startups to global brands</li>
                  <li>Eco-friendly materials and sustainable print processes</li>
                  <li>Flexible order sizes—print just one or scale to thousands</li>
                  <li>Nationwide & international delivery with real-time tracking</li>
                  <li>5,000+ customizable products for every business and occasion</li>
                  <li>Dedicated support and design assistance at every step</li>
                </ul>
                <p>
                  We make printing easy, affordable, and inspiring—so you can focus on what matters most: growing your brand and delighting your customers.
                </p>
                <p>
                  Not satisfied? We promise a free reprint or full refund—no questions asked.
                </p>
                <h3 className="font-bold text-lg text-gray-800 pt-4">Ready to Create Something Amazing?</h3>
                <p>
                  Order online at colorfulgraphic.com, visit our Noida store, or call us at +91-8448128620. From your first business card to your next big campaign, we're here to make your vision a reality.
                </p>
                <p>
                  Let's print. Let's create. Let's grow—together!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12">
          {/* Find Stores */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Find Stores</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-blue-600">Bangalore</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Gurgoan</Link></li>
              <li><Link to="#" className="hover:text-blue-600">New Delhi</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Chennai</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Hyderabad</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Pune</Link></li>
            </ul>
          </div>
          {/* Our Company */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Our Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-blue-600">About us</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-blue-600">Blog</Link></li>
            </ul>
          </div>
          {/* Support */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-blue-600">Help</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Business Solutions</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Find Stores</Link></li>
              <li><Link to="#" className="hover:text-blue-600">My Account</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Track Order</Link></li>
            </ul>
          </div>
          {/* Important Links */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Important Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="#" className="hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Delivery & Return Policy</Link></li>
              <li><Link to="#" className="hover:text-blue-600">Terms & conditions</Link></li>
            </ul>
          </div>
          {/* Contact and Social */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2">
                <FaPhoneAlt size={14} />
                <span>+91 844 812 8620</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <FaEnvelope size={14} />
                <span>global@colorfulgraphic.com</span>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Follow us</h3>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-600 hover:text-blue-600"><FaInstagram size={20} /></a>
                <a href="#" className="text-gray-600 hover:text-blue-600"><FaFacebookF size={20} /></a>
                <a href="#" className="text-gray-600 hover:text-blue-600"><FaTwitter size={20} /></a>
                <a href="#" className="text-gray-600 hover:text-blue-600"><FaLinkedinIn size={20} /></a>
                <a href="#" className="text-gray-600 hover:text-blue-600"><FaPinterestP size={20} /></a>
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <Link to="#" className="text-gray-600 hover:text-blue-600"><FaGooglePlay size={30} /></Link>
              <Link to="#" className="text-gray-600 hover:text-blue-600"><FaAppStoreIos size={30} /></Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <FaCcVisa size={30} className="text-gray-500" />
              <FaCcMastercard size={30} className="text-gray-500" />
              {/* <SiUpi size={30} className="text-gray-500" /> */}
            </div>
            <p className="text-gray-500">
              © {new Date().getFullYear()} Colorful Graphic Pvt. Ltd. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
