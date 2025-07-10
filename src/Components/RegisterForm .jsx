import React, { useState } from "react";
import { AddorEditUser } from "../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterForm = (props) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) newErrors.firstname = "First name is required";
    if (!formData.email.includes("@")) newErrors.email = "Email must include @";
    if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Mobile must be 10 digits";
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(formData.password)) {
      newErrors.password = "Password must be 8+ chars with uppercase, lowercase, number & symbol";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      const onlyDigits = value.replace(/\D/g, "");
      if (onlyDigits.length <= 10) {
        setFormData({ ...formData, [name]: onlyDigits });
        if (onlyDigits.length < 10) {
          setErrors({ ...errors, mobile: "Mobile must be 10 digits" });
        } else {
          setErrors({ ...errors, mobile: "" });
        }
      } else {
        setErrors({ ...errors, mobile: "Mobile number cannot be more than 10 digits" });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCheckbox = (e) => {
    setAgreed(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || !agreed) return;
    const response = await AddorEditUser(formData);
    if (response.success) {
      alert("User Registered Successfully!");
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        mobile: "",
        gender: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
    } else {
      alert("Registration Failed: " + response.message);
    }
  };

  return (
    <>
      {/* Logo and Brand */}
      {/* <div className="flex items-center gap-2 mb-6">
        <img src="/assets/logo.png" alt="Logo" className="h-10 w-10 rounded-full bg-gray-100" />
        <span className="text-xl font-bold text-gray-800">Your Brand</span>
      </div> */}
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-1">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
        </div>
        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        {/* Mobile */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            inputMode="numeric"
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
        </div>
        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <div className="flex gap-6 mt-1">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g} className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={handleChange}
                  className="text-indigo-600"
                />
                <span className="ml-2">{g}</span>
              </label>
            ))}
          </div>
        </div>
        {/* Password */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg pr-10"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-600 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        {/* Confirm Password */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg pr-10"
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-gray-600 cursor-pointer"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>
        {/* Terms Checkbox */}
        <div className="flex items-center text-xs text-gray-600">
          <input
            id="terms"
            type="checkbox"
            checked={agreed}
            onChange={handleCheckbox}
            className="mr-2"
            required
          />
          <label htmlFor="terms">
            I agree to all <a href="#" className="text-blue-600 underline">terms of service and privacy policy</a>
          </label>
        </div>
        {/* Submit */}
        <button
          type="submit"
          disabled={!agreed}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition duration-300 disabled:opacity-50"
        >
          Register
        </button>
      </form>
      <div className="mt-4 text-center text-sm">
        Already have an account? <button type="button" onClick={props?.onToggle} className="text-blue-500 font-medium hover:underline bg-transparent border-none p-0 m-0 inline">Log In</button>
      </div>
    </>
  );
};

export default RegisterForm;
