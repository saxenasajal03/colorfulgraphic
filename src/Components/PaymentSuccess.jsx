import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchOrderById } from "../services/api";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (!location.state?.orderId) {
          navigate("/");
          return;
        }

        const token = localStorage.getItem("authToken");
        const response = await fetchOrderById(location.state.orderId, token);

        if (response.success) {
          setOrderDetails(response.data);
        } else {
          toast.error("Failed to fetch order details");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        toast.error("Error fetching order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [location.state?.orderId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Order not found
          </h2>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="text-center">
              <svg
                className="mx-auto h-16 w-16 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h2 className="mt-4 text-3xl font-bold text-gray-900">
                Payment Successful!
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                Thank you for your order
              </p>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8">
              <dl className="divide-y divide-gray-200">
                <div className="py-4 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">
                    Order ID
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {orderDetails.orderId}
                  </dd>
                </div>
                <div className="py-4 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">Date</dt>
                  <dd className="text-sm text-gray-900">
                    {new Date(orderDetails.orderDate).toLocaleDateString()}
                  </dd>
                </div>
                <div className="py-4 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">
                    Total Amount
                  </dt>
                  <dd className="text-sm text-gray-900">
                    ₹{orderDetails.total}
                  </dd>
                </div>
                <div className="py-4 flex justify-between">
                  <dt className="text-sm font-medium text-gray-500">
                    Delivery Address
                  </dt>
                  <dd className="text-sm text-gray-900">
                    {orderDetails.address}, {orderDetails.city},{" "}
                    {orderDetails.state} - {orderDetails.pinCode}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Order Items</h3>
              <div className="mt-4 space-y-4">
                {orderDetails.OrderItems?.map((item) => (
                  <div
                    key={item.orderItemId}
                    className="flex justify-between items-center py-4 border-b border-gray-200"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {item.Product?.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.productQuantity}
                      </p>
                    </div>
                    <p className="text-sm text-gray-900">
                      ₹{item.totalProductPrice}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={() => navigate("/")}
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate("/orders")}
                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
              >
                View Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
