import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import { CartContext } from "./Context/CartContext";
// import { fetchProductById } from "../services/api";
import { fetchProductById } from "../services/api"; // Adjust the import path as necessary
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from "@mui/material";
import CheckoutOptions from "./CheckoutOptions";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';

const Product3DBox = ({ imageUrl }) => {
  const texture = useTexture(imageUrl);
  return (
    <mesh>
      <boxGeometry args={[7, 5, 0.2]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

const ProductDetails = () => {
  const { productId } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const canvasRef = useRef();

  useEffect(() => {
    // First, try to use the product from location state (passed from product list)
    if (location.state && location.state.product) {
      console.log("Using product from location state:", location.state.product);
      setProduct(location.state.product);
      setLoading(false);
      return;
    }

    // If not available in location state, fetch from API
    const getProduct = async () => {
      try {
        console.log("Fetching product with ID:", productId);
        const data = await fetchProductById(productId);

        // Handle the nested API response structure
        if (data.success && data.data) {
          setProduct(data.data);
        } else if (data.product) {
          setProduct(data.product);
        } else {
          setProduct(data);
        }

        console.log("Fetched product:", data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product. Please try again later.");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [productId, location.state]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-10">
        <Typography variant="h5">
          Product not found. Please try a different product.
        </Typography>
      </div>
    );
  }

  return (
    <Container maxWidth="lg" style={{ marginTop: "30px" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          {/* 3D Product View */}
          <div style={{ width: '100%', height: 400, background: '#f9f9f9', borderRadius: 12 }}>
            <Canvas
              ref={canvasRef}
              camera={{ position: [0, 0, 7] }}
              onPointerDown={() => setAutoRotate(false)}
            >
              <ambientLight intensity={0.7} />
              <directionalLight position={[5, 5, 5]} intensity={0.7} />
              <Product3DBox imageUrl={product.image_url} />
              <OrbitControls 
                enablePan={false} 
                autoRotate={autoRotate} 
                autoRotateSpeed={5}
              />
            </Canvas>
          </div>
        </Grid>

        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {product.description || "No description available"}
            </Typography>
            <Typography variant="h6">Price: ₹{product.price}</Typography>
            {product.discountedPrice > 0 && (
              <Typography variant="h6" color="secondary">
                Discounted Price: ₹{product.discountedPrice}
              </Typography>
            )}
            <Typography variant="body2" color="textSecondary">
              Category: {product.category || "Not specified"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Brand: {product.brand || "Not specified"}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Stock: {product.stockQuantity || "Not available"}
            </Typography>
            <CustomPrintForm product={product} />
          </CardContent>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;

const CustomPrintForm = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [formData, setFormData] = useState({
    material: "lykam_matte_coated",
    lamination: "no_finish",
    orientation: "landscape",
    printinglocation: "front",
    quantity: "100",
    uploadedImage: null,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Prepare form data
    const formDataObj = new FormData();
    formDataObj.append("image", file);

    try {
      // Call your backend API
      const response = await fetch("https://api.colorfulgraphic.com/Home/uploadImage", {
        method: "POST",
        body: formDataObj,
      });
      const data = await response.json();

      if (data.success) {
        // Store the public URL in your form state
        setFormData((prev) => ({
          ...prev,
          uploadedImage: data.imagePath, // This is the public GCS URL
        }));
      } else {
        alert("Image upload failed: " + data.message);
      }
    } catch (err) {
      alert("Error uploading image: " + err.message);
    }
  };

  // PRICE CALCULATION
  const calculateTotalPrice = () => {
    const basePrice =
      product.discountedPrice > 0 ? product.discountedPrice : product.price;

    const quantity = parseInt(formData.quantity);

    let totalPrice = basePrice * quantity;

    if (
      formData.lamination === "matte_lamination" ||
      formData.lamination === "glossy_lamination"
    ) {
      totalPrice += Math.ceil(totalPrice / 100) * 50;
    }

    if (formData.printinglocation === "front_back") {
      totalPrice += (basePrice * quantity) / 2;
    }

    return totalPrice;
  };

  const totalPrice = calculateTotalPrice();
  const quantity = parseInt(formData.quantity);

  return (
    <Grid container spacing={2} style={{ marginTop: "20px" }}>
      {/* Form Inputs */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          select
          label="Material"
          name="material"
          value={formData.material}
          onChange={handleChange}
        >
          <MenuItem value="lykam_matte_coated">
            Lykam Matte Coated Paper
          </MenuItem>
          <MenuItem value="lykam_glossy_coated">
            Lykam Glossy Coated Paper
          </MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          select
          label="Lamination"
          name="lamination"
          value={formData.lamination}
          onChange={handleChange}
        >
          <MenuItem value="no_finish">No Finish</MenuItem>
          <MenuItem value="matte_lamination">Matte Lamination</MenuItem>
          <MenuItem value="glossy_lamination">Glossy Lamination</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          select
          label="Orientation"
          name="orientation"
          value={formData.orientation}
          onChange={handleChange}
        >
          <MenuItem value="landscape">Landscape</MenuItem>
          <MenuItem value="portrait">Portrait</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          select
          label="Printing Location"
          name="printinglocation"
          value={formData.printinglocation}
          onChange={handleChange}
        >
          <MenuItem value="front">Front</MenuItem>
          <MenuItem value="front_back">Front & Back</MenuItem>
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          select
          label="Quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        >
          {[100, 200, 300, 400, 500, 600, 750, 1000].map((qty) => (
            <MenuItem key={qty} value={qty}>
              {qty}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* Pricing and Upload Row */}
      <Grid
        item
        xs={12}
        container
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Left side: price */}
        <Grid item xs={6}>
          <Typography variant="subtitle1">
            Per Piece Price: ₹{Math.ceil(totalPrice / quantity)}
          </Typography>
          <Typography variant="h6" color="primary">
            Total Price: ₹{totalPrice}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            (Inclusive of all taxes)
          </Typography>
        </Grid>

        {/* Right side: upload button + note */}
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button variant="contained" component="span">
              Upload Design
            </Button>
          </label>
          {formData.printinglocation === "front_back" && (
            <Typography
              variant="caption"
              color="error"
              display="block"
              style={{ marginTop: "4px" }}
            >
              * Please upload front & back design in a single file
            </Typography>
          )}
        </Grid>
      </Grid>

      {/* Checkout Options Component */}
      <Grid item xs={12}>
        <CheckoutOptions
          product={product}
          formData={formData}
          calculateTotalPrice={calculateTotalPrice}
        />
      </Grid>
    </Grid>
  );
};
