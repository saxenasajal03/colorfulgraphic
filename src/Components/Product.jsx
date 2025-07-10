import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { addOrEditProduct } from '../services/api';

const Product = () => {
  const location = useLocation();

  // Read master and sub category IDs passed from navigation
  const masterCategoryId = location.state?.category_id || '';
  const subCategoryId = location.state?.subcategory_id || '';

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    stock_quantity: '',
    master_category_id: '',
    sub_category_id: '',
    imageFile: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Set category IDs internally on page load
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      master_category_id: masterCategoryId,
      sub_category_id: subCategoryId,
    }));
  }, [masterCategoryId, subCategoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageFile: file }));

      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      description: '',
      stock_quantity: '',
      master_category_id: masterCategoryId,
      sub_category_id: subCategoryId,
      imageFile: null,
    });
    setPreviewImage(null);
    setMessage('');
    document.querySelector("input[type='file']").value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const result = await addOrEditProduct(formData);
    setLoading(false);

    if (result.success) {
      setMessage('✅ ' + result.message);
      resetForm();
    } else {
      setMessage('❌ ' + result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-100 px-4 py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-10 rounded-3xl shadow-2xl border border-gray-300 space-y-6"
        encType="multipart/form-data"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">Add Product</h2>

        {/* Product Name */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
            placeholder="e.g., Butter Naan"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
            placeholder="e.g., 199"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
            placeholder="Product details"
          />
        </div>

        {/* Stock Quantity */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Stock Quantity</label>
          <input
            type="number"
            name="stock_quantity"
            value={formData.stock_quantity}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400"
            placeholder="e.g., 50"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Upload Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
            file:rounded-xl file:border-0 file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-4 h-48 w-full object-cover rounded-xl border border-blue-300 shadow-md"
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
          >
            {loading ? 'Submitting...' : 'Submit Product'}
          </button>
        </div>

        {/* Message */}
        {message && (
          <p
            className={`text-center mt-4 text-sm font-semibold ${
              message.startsWith('✅') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default Product;
