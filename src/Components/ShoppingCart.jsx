import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    console.log("Cart Data: ", cart);
  }, []);

  const calculateTotal = () => {
    return cart
      .reduce(
        (total, item) => total + (item.quantity ? parseInt(item.quantity) : 0),
        0
      )
      .toFixed(2);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-4 shadow-lg rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  {/* Image Display */}
                  <img
                    src={item.image}
                    alt="Product Image"
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="text-lg font-bold">{item.material}</h2>
                    <p className="text-gray-500">
                      Lamination: {item.lamination}
                    </p>
                    <p className="text-gray-500">
                      Orientation: {item.orientation}
                    </p>
                    <p className="text-gray-500">
                      Printing Location: {item.printinglocation}
                    </p>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-100 p-6 shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <p className="flex justify-between">
                <span>Total Items:</span>
                <span>{calculateTotal()}</span>
              </p>
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="bg-purple-600 text-white w-full py-2 mt-4 rounded hover:bg-purple-700 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
