import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Inventory = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/mastercategory'); // Redirect to /add when /inventory is visited
  }, [navigate]);

  return null; // You can return a loader if you want
};

export default Inventory;
