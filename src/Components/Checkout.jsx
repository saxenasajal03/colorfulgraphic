import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../config/config.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createOrder, initiatePayment } from "../services/api";
import { AuthContext } from "./Context/AuthContext";

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const API_BASE_URL =
    import.meta.env.VITE_SERVER_PORT || "https://api.colorfulgraphic.com";
  const { RAZOR_PAY_API_KEY } = process.env;

  const location = useLocation();

  const cartItems = location.state ? location.state.cartItems : [];
  const total = location.state ? location.state.total : 0;
  const deliveryCharge = location.state ? location.state.delivery : 0;

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    pinCode: "",
    address: "",
    city: "",
    state: "",
    postOffice: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Initialize payment with Razorpay
      const paymentPayload = {
        amount: (total + deliveryCharge) * 100, // Converting to paisa
        notes: {
          orderDetails: "Payment for order",
          customerName: formData.name,
        },
      };

      const paymentResponse = await initiatePayment(paymentPayload);

      if (!paymentResponse.success) {
        throw new Error(
          paymentResponse.message || "Failed to initialize payment"
        );
      }

      // Load Razorpay script
      await loadRazorpayScript();

      // Prepare order items
      const orderItems = cartItems.map((item) => ({
        ProductId: item.id,
        ProductQuantity: item.quantity,
        PerUnitProductPrice: item.price.toString(),
        TotalProductPrice: (item.price * item.quantity).toString(),
        AddDate: new Date().toISOString(),
        UpdateDate: new Date().toISOString(),
      }));

      // Create order payload
      const orderPayload = {
        Name: formData.name,
        Email: formData.email,
        Mobile: formData.mobile,
        Address: formData.address,
        City: formData.city,
        State: formData.state,
        PinCode: formData.pinCode,
        PostOffice: formData.postOffice || "",
        Total: total.toString(),
        DeliveryCharges: deliveryCharge.toString(),
        OrderDate: new Date().toISOString(),
        PaymentDate: new Date().toISOString(),
        _lstUM_OrderItem: orderItems,
        AddDate: new Date().toISOString(),
        UpdateDate: new Date().toISOString(),
        IsActive: true,
        IsDelete: false,
      };

      // Initialize Razorpay
      const razorpayOptions = {
        key: RAZOR_PAY_API_KEY,
        amount: paymentResponse.data.amount,
        currency: "INR",
        name: "Colorful Graphics",
        description: "Payment for your order",
        order_id: paymentResponse.data.id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile,
        },
        notes: {
          orderNumber: paymentResponse.data.id,
          address: formData.address,
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      // Pass the order payload to RenderRazorpay component
      navigate("/payment", {
        state: {
          razorpayOptions,
          orderPayload,
          preFillFormData: formData,
        },
      });
    } catch (error) {
      console.error("Error processing order:", error);
      toast.error(
        error.message || "Failed to process order. Please try again."
      );
      setLoading(false);
    }
  };

  // Function to load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      // Check if script is already loaded
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        console.log("Razorpay script loaded successfully");
        resolve(true);
      };
      script.onerror = () => {
        console.error("Failed to load Razorpay script");
        reject(new Error("Failed to load Razorpay script"));
      };
      document.body.appendChild(script);
    });
  };

  const validateForm = () => {
    // Validate name (required, max 100 chars)
    if (!formData.name || formData.name.length > 100) {
      toast.error("Name is required and must be less than 100 characters");
      return false;
    }

    // Validate email (required, max 100 chars, valid format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      !formData.email ||
      !emailRegex.test(formData.email) ||
      formData.email.length > 100
    ) {
      toast.error("Please enter a valid email address (max 100 characters)");
      return false;
    }

    // Validate mobile (required, 10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!formData.mobile || !phoneRegex.test(formData.mobile)) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }

    // Validate address (required, max 500 chars)
    if (!formData.address || formData.address.length > 500) {
      toast.error("Address is required and must be less than 500 characters");
      return false;
    }

    // Validate city (required, max 100 chars)
    if (!formData.city || formData.city.length > 100) {
      toast.error("City is required and must be less than 100 characters");
      return false;
    }

    // Validate state (required, max 100 chars)
    if (!formData.state || formData.state.length > 100) {
      toast.error("State is required and must be less than 100 characters");
      return false;
    }

    // Validate pincode (required, 6 digits)
    const pincodeRegex = /^\d{6}$/;
    if (!formData.pinCode || !pincodeRegex.test(formData.pinCode)) {
      toast.error("Please enter a valid 6-digit pincode");
      return false;
    }

    // Validate post office (optional, max 100 chars)
    if (formData.postOffice && formData.postOffice.length > 100) {
      toast.error("Post office must be less than 100 characters");
      return false;
    }

    // Validate cart items
    if (!cartItems || cartItems.length === 0) {
      toast.error("Your cart is empty");
      return false;
    }

    // Validate total amount
    if (!total || total <= 0) {
      toast.error("Invalid order total");
      return false;
    }

    // Validate delivery charges
    if (deliveryCharge < 0) {
      toast.error("Invalid delivery charges");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="bg-white py-20 lg:py-[120px] overflow-hidden relative max-w-7xl mx-auto px-5">
      <div className="container z-10">
        <div className="flex flex-wrap lg:justify-between -mx-4">
          <div className="w-full lg:w-1/2 xl:w-6/12 px-4">
            <div className="max-w-[570px] mb-12 lg:mb-0">
              <p className="block mb-4 text-xl font-semibold underline">
                Checkout
              </p>

              <p className="text-lg text-white leading-relaxed mb-4 bg-blue-600 px-4 py-1 w-fit rounded-md tracking-[1px]">
                Total Price:{" "}
                <span className="font-medium">₹{total + deliveryCharge}</span>
              </p>

              <p className="text-lg font-normal text-slate-800 leading-relaxed mb-3">
                Kindly fill out the form to proceed!
              </p>

              <p className="text-lg font-normal text-slate-800 leading-relaxed mb-3">
                For assistance, call our support at:{" "}
                <span className="font-semibold">+91 9958410093</span>
              </p>

              <div className="bg-gray-100 p-4 rounded-md mt-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Order Summary
                </h3>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between py-2 border-b"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">₹{item.price * item.quantity}</p>
                  </div>
                ))}
                <div className="py-2 border-b">
                  <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>₹{total}</p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p>Delivery Charge</p>
                    <p>₹{deliveryCharge}</p>
                  </div>
                </div>
                <div className="flex justify-between py-4 font-bold">
                  <p>Total</p>
                  <p>₹{total + deliveryCharge}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 xl:w-5/12 px-4">
            <h1 className="font-bold text-xl py-2 text-gray-800">
              Deliver to Address
            </h1>
            <div className="bg-gray-100/80 border relative rounded-lg p-8 sm:p-12 shadow-lg">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="items-start w-full text-gray-700 font-medium">
                    Name
                    <input
                      type="text"
                      placeholder="Mention your name"
                      className="w-full rounded py-2 placeholder:text-md placeholder:font-normal placeholder:text-sm placeholder:text-gray-400 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary items-start"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <div className="mb-6">
                  <label className="items-start w-full text-gray-700 font-medium">
                    Mobile
                    <input
                      placeholder="+91 75*******"
                      className="w-full rounded py-2 placeholder:text-md placeholder:font-normal placeholder:text-sm placeholder:text-gray-400 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary items-start"
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <div className="mb-6">
                  <label className="items-start w-full text-gray-700 font-medium">
                    Email
                    <input
                      placeholder="name@gmail.com"
                      className="w-full rounded py-2 placeholder:text-md placeholder:font-normal placeholder:text-sm placeholder:text-gray-400 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary items-start"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <div className="mb-6">
                  <label className="items-start w-full text-gray-700 font-medium">
                    Pincode
                    <input
                      placeholder="Mention your Pincode"
                      className="w-full rounded py-2 placeholder:text-md placeholder:font-normal placeholder:text-sm placeholder:text-gray-400 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary items-start"
                      type="text"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <div className="mb-6">
                  <label className="items-start w-full text-gray-700 font-medium">
                    Address
                    <input
                      placeholder="Write your address with Street name"
                      className="w-full rounded py-2 placeholder:text-md placeholder:font-normal placeholder:text-sm placeholder:text-gray-400 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary items-start"
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <div className="mb-6">
                  <label className="items-start w-full text-gray-700 font-medium">
                    City
                    <input
                      placeholder="Mention your City"
                      className="w-full rounded py-2 placeholder:text-md placeholder:font-normal placeholder:text-sm placeholder:text-gray-400 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary items-start"
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <div className="mb-6">
                  <label className="items-start w-full text-gray-700 font-medium">
                    State
                    <input
                      placeholder="Mention your State"
                      className="w-full rounded py-2 placeholder:text-md placeholder:font-normal placeholder:text-sm placeholder:text-gray-400 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary items-start"
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <div className="mb-6">
                  <label className="items-start w-full text-gray-700 font-medium">
                    Post Office
                    <input
                      placeholder="Mention your Post Office"
                      className="w-full rounded py-2 placeholder:text-md placeholder:font-normal placeholder:text-sm placeholder:text-gray-400 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary items-start"
                      type="text"
                      name="postOffice"
                      value={formData.postOffice}
                      onChange={handleChange}
                    />
                  </label>
                </div>

                <div className="mb-0">
                  <button
                    type="submit"
                    className={`w-full bg-blue-600 rounded border border-primary p-3 transition ${
                      loading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-blue-700"
                    } text-white`}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Place Order"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Checkout;
