const API_BASE_URL =
  import.meta.env.VITE_SERVER_PORT || "http://localhost:3000";

// Categories API
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/categories`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Products API
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const result = await response.json();

    // Check if the response has the expected structure
    if (result.success && result.data && result.data.products) {
      return result.data.products;
    } else {
      // If the response doesn't have the expected structure, return the whole response
      // This allows for backward compatibility
      return result;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductsByCategory = async (categoryName) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/products?category=${encodeURIComponent(
        categoryName
      )}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch products for category: ${categoryName}`);
    }
    const result = await response.json();

    // Check if the response has the expected structure
    if (result.success && result.data && result.data.products) {
      // Filter products by category (in case the API doesn't filter server-side)
      return result.data.products.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() === categoryName.toLowerCase()
      );
    } else {
      // If the response doesn't have the expected structure, return the whole response
      return result;
    }
  } catch (error) {
    console.error(
      `Error fetching products for category ${categoryName}:`,
      error
    );
    throw error;
  }
};

export const fetchProductById = async (productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/${productId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product with ID: ${productId}`);
    }
    const result = await response.json();

    // Check if the response has the expected structure
    if (result.success && result.data) {
      return result;
    } else {
      // If the response doesn't have the expected structure, return the whole response
      return result;
    }
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error;
  }
};

// // Auth API
// export const loginUser = async (email, password) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Login failed");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Login error:", error);
//     throw error;
//   }
// };

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// Orders API
export const createOrder = async (orderData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create order");
    }

    return await response.json();
  } catch (error) {
    console.error("Order creation error:", error);
    throw error;
  }
};

// export const fetchOrders = async (token) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/api/orders`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Failed to fetch orders");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     throw error;
//   }
// };

export const fetchAllOrders = async (page = 1, limit = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/orders?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    const result = await response.json();
    return result.data.orders; // <-- Return just the orders array
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
};

export const fetchOrderById = async (orderId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch order details");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

// Payments API
export const initiatePayment = async (paymentData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/payments/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(paymentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to initiate payment");
    }

    return await response.json();
  } catch (error) {
    console.error("Payment initiation error:", error);
    throw error;
  }
};

export const verifyPayment = async (paymentVerificationData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/payments/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(paymentVerificationData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to verify payment");
    }

    return await response.json();
  } catch (error) {
    console.error("Payment verification error:", error);
    throw error;
  }
};

// Feedback API
export const submitFeedback = async (feedbackData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to submit feedback");
    }

    return await response.json();
  } catch (error) {
    console.error("Feedback submission error:", error);
    throw error;
  }
};

export const checkoutOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Home/Checkoutorder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create order");
    }

    return await response.json();
  } catch (error) {
    console.error("Order creation error:", error);
    throw error;
  }
};
export const LoginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json(); // ✅ define data

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    console.log("Login Successful:", data); // ✅ now data is defined

    localStorage.setItem("token", data.token);
    localStorage.setItem("userDetails", JSON.stringify(data.userDetails || {}));

    return data; // ✅ return parsed data

  } catch (error) {
    console.error("Login failed:", error.message);
    throw error;
  }
};

 export const AddorEditUser =  async (UserData)=>{
  try{
const response = await fetch(`${API_BASE_URL}/api/auth/addOrEditUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UserData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to initiate payment");
    }

    return  response.json();
  }
  catch(error){
   console.error(" Error Occured When Registering User:", error);
    throw error;
  }
 };
 export const AddorEditAdmin =  async (UserData)=>{
  try{
const response = await fetch(`${API_BASE_URL}/api/auth/addOrEditAdmin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UserData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to initiate payment");
    }

    return await response.json();
  }
  catch(error){
   console.error(" Error Occured When Registering Admin:", error);
    throw error;
  }
 };

export const fetchCategoryProductTree = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/categories/tree`);
    if (!response.ok) {
      throw new Error("Failed to fetch category tree");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching category tree:", error);
    throw error;
  }
};

// Add or Edit Master Category
export const addOrEditMasterCategory = async (data) => {
  const response = await fetch(`${API_BASE_URL}/category/master`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to add/edit master category');
  return await response.json();
};

// Add or Edit Sub Category
export const addOrEditSubCategory = async (data) => {
  const response = await fetch(`${API_BASE_URL}/api/category/sub`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to add/edit sub category');
  return await response.json();
};

// Add or Edit Product
export const addOrEditProduct = async (data) => {
  const response = await fetch(`${API_BASE_URL}/api/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to add/edit product');
  return await response.json();
};


export const fetchMasterCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/category/master-categories`);
  if (!response.ok) throw new Error('Failed to fetch master categories');
  return await response.json();
};


export const fetchSubCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/category/subcategories`);
  if (!response.ok) throw new Error('Failed to fetch subcategories');
  return await response.json();
};

export default {
  fetchCategories,
  fetchProducts,
  fetchProductsByCategory,
  fetchProductById,
  //loginUser,
  registerUser,
  createOrder,
  // fetchOrders,
  fetchAllOrders,
  fetchOrderById,
  initiatePayment,
  verifyPayment,
  submitFeedback,
  checkoutOrder,
  LoginUser,
  AddorEditUser,
  AddorEditAdmin,
  fetchCategoryProductTree,
  addOrEditMasterCategory,
  addOrEditSubCategory,
  addOrEditProduct,
  fetchSubCategories,
  fetchMasterCategories,
};
