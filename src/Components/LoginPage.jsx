import React, { useState } from "react";
import { LoginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = (props) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showRegisterOption, setShowRegisterOption] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShowRegisterOption(false);
    try {
      const response = await LoginUser(formData.email, formData.password);
      if (response) {
        alert("Login Successful!");
        navigate("/");
        window.location.reload();
      } else {
        setError("Invalid credentials. Try again.");
      }
    } catch (error) {
      const errMsg = error.message || "Login Failed!";
      setError(errMsg);
      if (
        errMsg.toLowerCase().includes("not found") ||
        errMsg.toLowerCase().includes("invalid")
      ) {
        setShowRegisterOption(true);
      }
    }
  };

  return (
    <>
      {/* Logo and Brand */}
      <div className="flex items-center gap-2 mb-6">
        {/* <img src="/assets/logo.png" alt="Logo" className="h-10 w-10 rounded-full bg-gray-100" /> */}
        {/* <span className="text-xl font-bold text-gray-800">Your Brand</span> */}
      </div>
      <h2 className="text-3xl text-center font-bold text-gray-900 mb-1">Login</h2>
      <p className="text-center text-gray-500 mb-6">Please login to your account</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50 text-gray-800"
            placeholder="Email address"
          />
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50 text-gray-800 pr-10"
            placeholder="Password"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="flex justify-between items-center text-sm mb-2">
          <div></div>
          <a href="#" className="text-gray-400 hover:text-orange-500">Forgot password?</a>
        </div>
        {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition font-semibold text-lg shadow-md"
        >
          Login
        </button>
      </form>
      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-200" />
        <span className="mx-2 text-gray-400 text-sm">Or Login with</span>
        <div className="flex-grow h-px bg-gray-200" />
      </div>
      {/* Social Buttons */}
      <div className="flex gap-4 mb-6">
        <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 font-medium text-gray-700 shadow-sm transition">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAA7VBMVEVHcEz/RkL/R0D+SEr/RUD/RkOwjlb/SD7/SE3/SUj/Vzb/VDf9TFb8TVeHoFb/YTD/byn8TVn/jRr/fSL/mxL/SEj+yQn/ohH/tQv+VUb/vQn/wwn+zgj9wQm3xQ39zgT6zQYwhv/7zgowhv8uhv0ek+Avhv7yzAPjywIvhv0whv7PyQHUygIth/y3yAEnivSlxwGSxgUak94fj+h5xAlgwxMLqp8NnsQVlte6xwBNwh45wC0xwDMLt28IrJgJpa0kjPCaxQEpvzsevkkWvVANumQQu18JtXkIsIgTvVYOvGALuWtJwh4OvF8OvF9ccfxCAAAAT3RSTlMAUZvT7P8T//+wiv//kAv6/mD//+V2jv//JKf//0EmxOr/rP7+MEX//x10/6eu//3+/9v///7I//+K//+KS/3/YeX//7dsnv7/////5s3tMAqBMAAAAXFJREFUeAF0jUUCwCAMwDp3d/f9/4krnVt6goQCFzheECVJFHgOPpB5RZHYIKqqyU+vGwpCXkVM07pp2zEQ8hSYiCBf1rsuFrQCvaSahHe+9wMqWHJuOD2E/lYoWsRxkUbBxcdJshY6bEQ3L6fpWmTnXXbxkBcpJTb8UBZFgUX156uyLLHI4Y+YgqL+DZqS0R7n7o4NLQX9GQwbI5tugpKI7wF5Rjd/BiNCCQZfX5BfCwyWrsnagGEYiKKpMkLqgJmZmXn/caKTzGoM7+v4IEiWPQdJ4fMhFujHCzjH7Wny6xFwMB9UKBa4KN3Tl4kh9AZYVJRbpXhVVRGX0asEXNP1a7MM0wQJA+0WFcQtyz7bcFzPAwn+8AkPwmjDcZK6WJGR75zwsCirOo7rpu0SojC2oQUeIF72/TCMY4sUKSj2wX9iXgAHwYgEoKBPizOBgx4EhwnCtxOtDnYTzn1Gnw3wzYQT3zDJrpmXYVjmpj7d/gPknlJE6eZSewAAAABJRU5ErkJggg==" alt="Google" className="h-5 w-5" />
          Google
        </button>
        <button type="button" className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 font-medium text-gray-700 shadow-sm transition">
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
          Facebook
        </button>
      </div>
      <div className="text-center text-sm text-gray-500">
        Don&apos;t have an account? <button type="button" onClick={props?.onToggle} className="text-orange-500 font-medium hover:underline bg-transparent border-none p-0 m-0 inline">Signup</button>
      </div>
    </>
  );
};

export default LoginForm;
