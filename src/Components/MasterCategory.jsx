import React, { useState } from 'react';
import { addOrEditMasterCategory } from '../services/api'; // Update the path as needed
import { useNavigate } from 'react-router-dom';

const MasterCategory = () => {
  const [formData, setFormData] = useState({
    category_name: '',
    anysubcategory: false,
    Discription: '',
    category_imageurl: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle image file upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, category_imageurl: file }));

      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Reset form after successful submission
  const resetForm = () => {
    setFormData({
      category_name: '',
      anysubcategory: false,
      Discription: '',
      category_imageurl: null,
    });
    setPreviewImage(null);
    document.getElementsByName('category_image')[0].value = '';
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const result = await addOrEditMasterCategory(formData);
    setLoading(false);

    if (result.success) {
      const categoryId = result.data?.category_id;
      setMessage('✅ ' + result.message);
      resetForm();

      // Navigate based on subcategory flag
      if (formData.anysubcategory) {
        navigate('/subcategory', { state: { category_id: categoryId } });
      } else {
        navigate('/product', { state: { category_id: categoryId } });
      }
    } else {
      setMessage('❌ ' + result.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg border border-gray-200"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Add Category</h2>

        {/* Category Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Category Name</label>
          <input
            type="text"
            name="category_name"
            value={formData.category_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter category name"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="Discription"
            value={formData.Discription}
            onChange={handleChange}
            rows={3}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Write a short description"
          />
        </div>

        {/* Subcategory Checkbox */}
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            name="anysubcategory"
            checked={formData.anysubcategory}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-gray-700">Subcategory?</label>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Upload Category Image</label>
          <input
            type="file"
            name="category_image"
            accept="image/*"
            onChange={handleImageUpload}
            required
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0 file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-3 h-40 w-full object-cover border rounded-lg shadow"
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center mb-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>

        {/* Status Message */}
        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
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

export default MasterCategory;
