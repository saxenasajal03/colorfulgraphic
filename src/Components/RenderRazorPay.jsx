import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import CryptoJS from "crypto-js";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyPayment, checkoutOrder } from "../services/api";
import { toast } from "react-toastify";

// Function to load script and append in DOM tree.
const loadScript = (src) =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      console.log("Razorpay loaded successfully");
      resolve(true);
    };
    script.onerror = () => {
      console.log("Error in loading Razorpay");
      resolve(false);
    };
    document.body.appendChild(script);
  });

const RenderRazorpay = () => {
  const location = useLocation();
  const { razorpayOptions, orderPayload, preFillFormData } =
    location.state || {};
  const navigate = useNavigate();

  if (!razorpayOptions || !orderPayload || !preFillFormData) {
    toast.error("Invalid payment session");
    navigate("/checkout");
    return null;
  }

  const displayRazorpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      console.log("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      ...razorpayOptions,
      handler: async function (response) {
        try {
          // Create order after successful payment
          const orderResponse = await checkoutOrder(orderPayload);

          if (!orderResponse.success) {
            throw new Error(orderResponse.message || "Failed to create order");
          }

          // Verify payment
          const verificationData = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            hem_order_id: orderResponse.data.id,
            amount: orderPayload.Total + orderPayload.DeliveryCharges,
            payment_mode: "online",
          };

          const verificationResponse = await verifyPayment(verificationData);

          if (!verificationResponse.success) {
            throw new Error(
              verificationResponse.message || "Payment verification failed"
            );
          }

          // Clear cart after successful order
          localStorage.removeItem("cart");

          // Navigate to success page
          navigate("/payment-success", {
            state: {
              orderDetails: orderResponse.data,
              paymentDetails: verificationResponse.data,
            },
          });
        } catch (error) {
          console.error("Error processing payment:", error);
          toast.error(
            error.message ||
              "Failed to process payment. Please contact support."
          );
        }
      },
      modal: {
        ondismiss: function () {
          toast.info("Payment cancelled");
          navigate("/checkout");
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  useEffect(() => {
    displayRazorpay();
  }, []);

  return null;
};

RenderRazorpay.propTypes = {
  orderId: PropTypes.string.isRequired,
  keyId: PropTypes.string.isRequired,
  keySecret: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  preFillFormData: PropTypes.object.isRequired,
  hemOrderId: PropTypes.string,
};

export default RenderRazorpay;
