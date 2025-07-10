import React from "react";
import { useLocation } from "react-router-dom";
import RenderRazorpay from "./RenderRazorPay.jsx";
// import config from "../config/config.json";

const Payment = () => {
  const location = useLocation();
  const { razorpayOptions, orderPayload, preFillFormData } =
    location.state || {};

  if (!razorpayOptions || !orderPayload || !preFillFormData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Invalid Payment Session
          </h2>
          <p className="text-gray-600">
            Please return to checkout and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Complete Your Payment
            </h2>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Order Summary
              </h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-600">
                  Amount to Pay: ₹{razorpayOptions.amount / 100}
                </p>
              </div>
            </div>
            <RenderRazorpay
              amount={razorpayOptions.amount}
              currency={razorpayOptions.currency}
              orderId={razorpayOptions.order_id}
              keyId={process.env.RAZOR_PAY_API_KEY}
              keySecret={process.env.RAZOR_PAY_API_SECRET}
              preFillFormData={preFillFormData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
