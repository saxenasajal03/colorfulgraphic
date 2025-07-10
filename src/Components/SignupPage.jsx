import { useState } from "react";

const SignupPage = () => {
  const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [agreed, setAgreed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckbox = (e) => {
    setAgreed(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) return;
    const payload = {
      userId: 0,
      fullName: formData.username,
      email: formData.email,
      passwordHash: formData.password,
      role: "user",
      createdAt: new Date().toISOString(),
    };
    try {
      const response = await fetch(`${SERVER_PORT}/api/Users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        mode: "cors",
      });
      if (response.ok) {
        const result = await response.json();
        console.log("User created successfully:", result);
      } else {
        console.error("Failed to create user:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* Top Bar with Logo and Brand */}
      <div className="flex items-center h-16 px-6">
        <img src="/public/assets/logo.png" alt="Brand Logo" className="h-10 w-10 mr-2" />
        <span className="text-2xl font-bold text-gray-800">Your Brand</span>
      </div>
      {/* Centered Signup Card */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Let's get started</h2>
          {/* Social Buttons */}
          <div className="flex gap-2 mb-4">
            <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-300 bg-blue-100 hover:bg-blue-200 font-medium text-gray-700">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="h-5 w-5" />
              Google
            </button>
            <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-300 bg-blue-600 hover:bg-blue-700 font-medium text-white">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
              Facebook
            </button>
          </div>
          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="User name"
                className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                required
              />
            </div>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                required
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                required
              />
            </div>
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
            <button
              type="submit"
              disabled={!agreed}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 disabled:opacity-50"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account? <a href="#" className="text-yellow-500 font-medium hover:underline">Log In</a>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="flex justify-between items-center px-6 py-4 text-xs text-gray-500">
        <span>Copyright © 2025 Your Company</span>
        <span>English (en) <svg className="inline h-3 w-3 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg></span>
      </div>
    </div>
  );
};

export default SignupPage;
