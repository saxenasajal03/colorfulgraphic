import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./Context/CartContext";
import { ShoppingCart, CheckCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const serverUrl = import.meta.env.VITE_SERVER_PORT || "https://api.colorfulgraphic.com";

  const totalAmount = cart.reduce((total, item) => {
    const itemPrice = parseFloat(item.price || 0);
    const itemQuantity = parseInt(item.quantity || 1);
    return total + itemPrice * itemQuantity;
  }, 0);

  return (
    <div className="relative min-h-screen flex flex-col items-center p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      {cart.length === 0 ? (
        <div className="flex flex-col items-center text-gray-500 mt-10">
          <ShoppingCart className="w-24 h-24 mb-4 text-gray-400" />
          <p className="text-lg">Your cart is empty.</p>
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 w-full ${
            showForm ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <div className="col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-4 shadow-lg rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  {item.uploadedImage && (
                    <img
                      src={item.uploadedImage}
                      alt="Product"
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  <div>
                    <h2 className="text-lg font-bold">{item.name}</h2>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                    <p className="text-gray-500">Price: ₹{item.price}</p>
                    {item.material && (
                      <p className="text-gray-500">Material: {item.material}</p>
                    )}
                    {item.lamination && (
                      <p className="text-gray-500">
                        Lamination: {item.lamination}
                      </p>
                    )}
                    {item.orientation && (
                      <p className="text-gray-500">
                        Orientation: {item.orientation}
                      </p>
                    )}
                    {item.printingLocation && (
                      <p className="text-gray-500">
                        Printing Location: {item.printingLocation}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-lg font-bold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-100 p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </p>
              <p className="flex justify-between">
                <span>Delivery Charges:</span>
                <span>₹50.00</span>
              </p>
              <hr className="my-2" />
              <p className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>₹{(totalAmount + 50).toFixed(2)}</span>
              </p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-purple-600 text-white w-full py-2 mt-4 rounded hover:bg-purple-700 transition"
            >
              Proceed to Order
            </button>
          </div>
        </div>
      )}
      {showForm && (
        <OrderForm
          totalAmount={totalAmount + 50}
          closeForm={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

const OrderForm = ({ totalAmount, closeForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    payment_prooffilePath: null,
    total: totalAmount,
  });
  const [loading, setLoading] = useState(false);
  const serverUrl = import.meta.env.VITE_SERVER_PORT || "http://localhost:3000";

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      // Check if script is already loaded
      if (window.Razorpay) {
        console.log("Razorpay already loaded");
        resolve(true);
        return;
      }

      // Create script element
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.crossOrigin = "anonymous";
      script.integrity =
        "sha384-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // This is a placeholder

      // Add event listeners
      script.onload = () => {
        console.log("Razorpay script loaded successfully");
        resolve(true);
      };

      script.onerror = (error) => {
        console.error("Failed to load Razorpay script:", error);
        reject(new Error("Failed to load Razorpay script"));
      };

      // Add to document head instead of body
      document.head.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("Starting payment process...");

      // Validate form data
      if (
        !formData.name ||
        !formData.mobile ||
        !formData.email ||
        !formData.address ||
        !formData.city ||
        !formData.state ||
        !formData.pinCode
      ) {
        toast.error("Please fill in all required fields");
        setLoading(false);
        return;
      }

      // Load Razorpay script
      try {
        await loadRazorpayScript();
      } catch (error) {
        console.error("Script loading error:", error);
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.head.appendChild(script);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // Create order
      const paymentData = {
        amount: Math.round(totalAmount),
        currency: "INR",
        orderId: "order_" + Date.now(),
        receipt: "receipt_id_" + Date.now(),
        notes: {
          orderDetails: "Payment for order",
          customerName: formData.name,
        },
      };

      console.log("Creating order with data:", paymentData);

      const orderResponse = await fetch(
        `${serverUrl}/api/payments/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Origin: window.location.origin,
          },
          body: JSON.stringify(paymentData),
        }
      );

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${orderResponse.status}`
        );
      }

      const order = await orderResponse.json();
      // console.log("Order created:", order);
      // console.log("Order id Gaurav:", order.data.id);
      if (!order.data || !order.data.id) {
        throw new Error("Failed to create order");
      }

      // Initialize Razorpay
      const options = {
        key: "rzp_test_KzsiM82ElcnEu1",
        amount: order.data.amount,
        currency: "INR",
        name: "Colorful Graphic",
        description: "Order Payment",
        order_id: order.data.id,
        handler: async function (response) {
          console.log("Payment successful:", response);
          toast.success("Payment successful!");
          await handleSubmit(response.razorpay_payment_id);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: {
          color: "#3399cc",
          hide_topbar: false,
        },
        modal: {
          ondismiss: function () {
            console.log("Modal dismissed");
            setLoading(false);
          },
        },
      };

      console.log("Opening Razorpay with options:", options);

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(
        error.message || "Failed to process payment. Please try again."
      );
      setLoading(false);
    }
  };

  const handleSubmit = async (paymentId) => {
    try {
      console.log("Gaurav paymentId", paymentId);
      setLoading(true);
      let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      if (cartItems.length === 0) {
        toast.error("Your cart is empty!");
        return;
      }

      // Remove uploadedImage from cart items
      const sanitizedCartItems = cartItems.map(
        ({ uploadedImage, ...rest }) => rest
      );

      const orderPayload = {
        Total: totalAmount,
        OrderDate: new Date().toISOString(),
        PaymentDate: new Date().toISOString(),
        Name: formData.name,
        Mobile: formData.mobile,
        Email: formData.email,
        City: formData.city,
        State: formData.state,
        PinCode: formData.pinCode,
        Address: formData.address,
        DeliveryCharges: 50.0,
        payment_prooffilePath: paymentId,
        _lstUM_OrderItem: sanitizedCartItems.map((item) => ({
          ProductId: item.id,
          ProductQuantity: item.quantity,
          PerUnitProductPrice: item.price,
          TotalProductPrice: item.price * item.quantity,
          AddDate: new Date().toISOString(),
          UpdateDate: new Date().toISOString(),
        })),
        _lstUM_OrderStatus: [{ StatusID: 1 }],
      };

      const orderResponse = await fetch(`${serverUrl}/Home/Checkoutorder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to place order");
      }

      const responseData = await orderResponse.json();
      console.log("Order Placed Successfully:", responseData);

      localStorage.removeItem("cart");
      toast.success("Order placed successfully!");
      closeForm();
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      payment_prooffilePath: e.target.files[0],
    }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="max-w-lg p-6 bg-white shadow-lg rounded-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={closeForm}
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
        <form onSubmit={handlePayment} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Name"
          />
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Mobile"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Email"
          />
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Address"
          ></textarea>
          <div className="flex space-x-4">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="City"
            />
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="State"
            />
          </div>
          <input
            type="text"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Pin Code"
          />
          <input
            type="number"
            name="total"
            value={formData.total}
            disabled
            className="w-full p-2 border rounded bg-gray-200"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Submit Order"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cart;
