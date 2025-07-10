import React, { useContext } from "react";
import { Button, Typography, Box } from "@mui/material";
import { CartContext } from "./Context/CartContext";

const CheckoutOptions = ({ product, formData, calculateTotalPrice }) => {
  const { addToCart } = useContext(CartContext);

  const createCartItem = () => {
    const quantity = Number(formData.quantity) || 1;
    const totalPrice = calculateTotalPrice();

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      quantity: quantity,
      price: product.price,
      totalPrice: totalPrice,
      material: formData.material,
      lamination: formData.lamination,
      orientation: formData.orientation,
      printingLocation: formData.printinglocation,
      uploadedImage: formData.uploadedImage,
      dateAdded: new Date().toISOString(),
    };
  };

  const addToCartHandler = () => {
    if (!formData.uploadedImage) {
      alert("Please upload an image first!");
      return;
    }

    const cartItem = createCartItem();

    // Add to cart in localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = [...existingCart, cartItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Update cart context
    addToCart(cartItem);

    // Notify other components
    window.dispatchEvent(new Event("cartUpdated"));

    alert("Product added to cart!");
  };

  return (
    <Box mt={2}>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        Once you add this item to cart, you can proceed to checkout from the
        cart page.
      </Typography>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={addToCartHandler}
        disabled={!formData.uploadedImage}
        sx={{ mt: 1 }}
      >
        Add to Cart
      </Button>
    </Box>
  );
};

export default CheckoutOptions;
