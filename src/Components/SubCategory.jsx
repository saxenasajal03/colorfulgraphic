import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { addOrEditSubCategory } from '../services/api';

const SubCategory = () => {
  const location = useLocation();
  const passedCategoryId = location.state?.category_id || '';

  const [formData, setFormData] = useState({
    sub_category_name: '',
    Discription: '',
    master_category_id: '',
    sub_category_image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Set master_category_id from passed state
  useEffect(() => {
    if (passedCategoryId) {
      setFormData((prev) => ({
        ...prev,
        master_category_id: passedCategoryId,
      }));
    }
  }, [passedCategoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, sub_category_image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      sub_category_name: '',
      Discription: '',
      master_category_id: passedCategoryId, // Keep the passed ID
      sub_category_image: null,
    });
    setPreviewImage(null);
    document.querySelector("input[type='file']").value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const result = await addOrEditSubCategory(formData);

    setLoading(false);

    if (result.success) {
      setMessage('✅ ' + result.message);
      resetForm();
    } else {
      setMessage('❌ ' + result.error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Add Sub Category</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* 🔒 Hidden Master Category ID (Not shown on UI) */}
        <input type="hidden" name="master_category_id" value={formData.master_category_id} />

        {/* Sub Category Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Sub Category Name</label>
          <input
            type="text"
            name="sub_category_name"
            value={formData.sub_category_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter Sub Category Name"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="Discription"
            value={formData.Discription}
            onChange={handleChange}
            rows={3}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Enter Description"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            required
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0 file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-3 h-32 w-full object-cover border rounded-lg shadow"
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>

        {/* Message */}
        {message && (
          <p
            className={`text-center mt-4 text-sm ${
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

export default SubCategory;
