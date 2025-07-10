import React, { useState, useEffect } from "react";

const companies = [
  { name: "Company 1", logo: "images/clients/1.jpg" },
  { name: "Company 2", logo: "images/clients/2.jpg" },
  { name: "Company 3", logo: "images/clients/3.jpg" },
  { name: "Company 4", logo: "images/clients/4.jpg" },
  { name: "Company 5", logo: "images/clients/5.jpg" },
  { name: "Company 6", logo: "images/clients/6.jpg" },
  { name: "Company 7", logo: "images/clients/7.jpg" },
  { name: "Company 8", logo: "images/clients/8.jpg" },
  { name: "Company 9", logo: "images/clients/9.jpg" },
  { name: "Company 10", logo: "images/clients/10.jpg" },
  { name: "Company 11", logo: "images/clients/11.jpg" },
  { name: "Company 12", logo: "images/clients/12.jpg" },
  { name: "Company 13", logo: "images/clients/13.jpg" },
  { name: "Company 14", logo: "images/clients/14.jpg" },
  { name: "Company 15", logo: "images/clients/15.jpg" },
  { name: "Company 16", logo: "images/clients/16.jpg" },
];

const VISIBLE_COUNT = 7;

const Clients = () => {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % companies.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Compute the visible logos, wrapping around if needed
  const visibleCompanies = [];
  for (let i = 0; i < VISIBLE_COUNT; i++) {
    visibleCompanies.push(companies[(startIndex + i) % companies.length]);
  }

  return (
    <section className="py-12 bg-white text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium mb-4 text-gray-900">
        Trusted by over <span className="font-bold">350 Large Enterprises</span> for Printing, Signage and Gifting needs.
      </h2>
      <div className="flex flex-wrap justify-center gap-8 min-h-[110px] transition-all duration-500 mb-2">
        {visibleCompanies.map((company, index) => (
          <div
            key={index}
            className="w-32 h-16 flex items-center justify-center bg-white rounded-lg p-2"
          >
            <img
              src={company.logo}
              alt={company.name}
              className="max-h-12 max-w-full object-contain"
            />
          </div>
        ))}
      </div>
      <div className="text-lg md:text-xl text-gray-800 mb-4 font-extralight">Need a Corporate Account?</div>
      <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-md text-lg transition-colors duration-200 shadow">
        Get in Touch
      </button>
    </section>
  );
};

export default Clients;
