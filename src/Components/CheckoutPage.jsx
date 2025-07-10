import React, { useState, useEffect } from "react";
import axios from "axios";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    pincode: "",
    city: "",
    state: "Uttar Pradesh", // default state
    country: "India", // default country
    phone: "",
  });

  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddressExpanded, setIsAddressExpanded] = useState(false);

  const states = ["Uttar Pradesh"]; // Hardcoding 'Uttar Pradesh' as the only state

  // Function to fetch cities and pincode based on state
  const fetchCitiesAndPincode = async (state) => {
    if (!state) return;
    setLoading(true);

    try {
      // API call to fetch cities and pincode
      const response = await axios.get(
        `https://api.postalpincode.in/state/${state}`
      );

      if (response.data && response.data[0].Status === "Success") {
        const cityData = response.data[0].PostOffice.map((post) => ({
          city: post.District,
          pincode: post.Pincode,
        }));
        setCities(cityData);
      } else {
        alert("No cities found for the selected state");
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cities on state change
  useEffect(() => {
    fetchCitiesAndPincode(formData.state);
  }, [formData.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // If city is selected, autofill the pincode
    if (name === "city") {
      const selectedCity = cities.find((city) => city.city === value);
      if (selectedCity) {
        setFormData({
          ...formData,
          pincode: selectedCity.pincode,
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle checkout logic here
    alert("Proceeding to checkout");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Proceed to Checkout
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* State Selector (Always Uttar Pradesh) */}
          <div>
            <label className="block text-gray-700" htmlFor="state">
              State
            </label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            >
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* City Selector */}
          <div>
            <label className="block text-gray-700" htmlFor="city">
              City
            </label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select City</option>
              {cities.map((city, index) => (
                <option key={index} value={city.city}>
                  {city.city}
                </option>
              ))}
            </select>
          </div>

          {/* Pincode (Auto-filled based on City selection) */}
          <div>
            <label className="block text-gray-700" htmlFor="pincode">
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              readOnly
              required
            />
          </div>

          {/* Address field that can be expanded */}
          <div className="relative">
            <label className="block text-gray-700" htmlFor="address">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full p-3 border border-gray-300 rounded-md transition-all duration-300 ${
                isAddressExpanded ? "h-32" : "h-12"
              }`}
              required
            />
            <button
              type="button"
              className="absolute top-2 right-2 text-blue-600 hover:text-blue-800"
              onClick={() => setIsAddressExpanded(!isAddressExpanded)}
            >
              {isAddressExpanded ? "Collapse" : "Expand"}
            </button>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-200"
            >
              {loading ? "Loading..." : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
