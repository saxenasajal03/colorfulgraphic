import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Container,
  Grid,
} from "@mui/material";

const Labels = () => {
  const [formData, setFormData] = useState({
    shape: "rectangle",
    size: "2x2",
    quantity: 30,
    image: null,
  });

  const [pricePerPiece, setPricePerPiece] = useState(24.5);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false); // Prevents multiple submissions

  useEffect(() => {
    calculatePrice();
  }, [formData.size, formData.quantity]);

  const sizePrices = {
    "2x2": 24.5,
    "3x3": 30,
    "4x4": 40,
    "5x5": 50,
    custom: 60,
  };

  const calculatePrice = () => {
    const price = sizePrices[formData.size] || 24.5;
    setPricePerPiece(price);
    setTotalPrice(price * formData.quantity);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log("form data ", formData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    console.log("image form data ", formData);
  };

  const handleSubmit = async () => {
    // Validate fields before submission
    // if (!formData.shape || !formData.size || !formData.quantity || !formData.image) {
    //     alert("All fields are required. Please fill in all details.");
    //     return;
    // }

    setLoading(true);

    const formDataObject = new FormData();
    formDataObject.append("shape", formData.shape);
    formDataObject.append("size", formData.size);
    formDataObject.append("quantity", formData.quantity);
    formDataObject.append("image", formData.image);

    // Debugging: Log FormData values
    console.log("Form Data being sent:", formDataObject);
    for (let pair of formDataObject.entries()) {
      console.log(pair[0] + ":", pair[1]);
    }

    try {
      const response = await fetch("http://localhost:5000/submit-form", {
        method: "POST",
        body: formDataObject,
      });

      const result = await response.json();
      // alert(result.message);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "50px" }}>
      <Grid container spacing={4} alignItems="flex-start">
        <Grid item xs={12} xl={6}>
          <img
            src="mattelaminated.jpeg"
            alt="Sticker Preview"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "600px",
              objectFit: "cover",
              borderRadius: "10px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Grid>
        <Grid item xs={12} xl={6}>
          <Typography variant="h6" gutterBottom style={{ fontWeight: "bold" }}>
            Stickers that offer durability and a sleek finish, making them
            perfect for enhancing your branding and packaging.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Available in 7 different shapes.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Perfect for packaging, branding, or employee engagement.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Customize easily: upload your logo, choose shape and size.
          </Typography>
          <Typography variant="body1" gutterBottom>
            Rapid production for quick delivery of your custom stickers.
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            style={{ marginTop: "10px", fontWeight: "bold", color: "#ff5733" }}
          >
            Order from as low as 30 units.
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Shape"
                name="shape"
                value={formData.shape}
                onChange={handleChange}
              >
                <MenuItem value="rectangle">Rectangle</MenuItem>
                <MenuItem value="circle">Circle</MenuItem>
                <MenuItem value="square">Square</MenuItem>
                <MenuItem value="oval">Oval</MenuItem>
                <MenuItem value="triangle">Triangle</MenuItem>
                <MenuItem value="star">Star</MenuItem>
                <MenuItem value="custom">Custom Shape</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Size"
                name="size"
                value={formData.size}
                onChange={handleChange}
              >
                <MenuItem value="2x2">2x2 inches</MenuItem>
                <MenuItem value="3x3">3x3 inches</MenuItem>
                <MenuItem value="4x4">4x4 inches</MenuItem>
                <MenuItem value="5x5">5x5 inches</MenuItem>
                <MenuItem value="custom">Custom Size</MenuItem>
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
                {[30, 50, 100, 200, 500, 1000, 2000, 5000].map((qty) => (
                  <MenuItem key={qty} value={qty}>
                    {qty}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Price Section */}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                style={{ color: "#ff5733", fontWeight: "bold" }}
              >
                Price per piece: ₹{pricePerPiece.toFixed(2)}
              </Typography>
              <Typography
                variant="h6"
                style={{ fontWeight: "bold", color: "#28a745" }}
              >
                Total: ₹{totalPrice.toFixed(2)}
              </Typography>
              <Typography variant="body2" style={{ color: "#888" }}>
                (Inclusive of all taxes)
              </Typography>
            </Grid>

            {/* Upload Your Design Section */}
            <Grid item xs={12}>
              <label
                htmlFor="fileInput"
                style={{
                  fontSize: "1.2rem",
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  borderRadius: "5px",
                  cursor: "pointer",
                  display: "inline-block",
                }}
              >
                Upload your design
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </Grid>

            {/* Submit Form Button */}
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ fontSize: "1rem", padding: "10px 20px" }}
                disabled={!formData.image || loading}
              >
                {loading ? "Submitting..." : "Submit Form"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Labels;
