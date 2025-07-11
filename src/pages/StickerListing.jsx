import React, { useState } from 'react';
import { stickers } from '../data/stickers';
import ProductCard from '../components/ProductCard';

const StickerListing = () => {
  const [data] = useState(stickers); // useState holds dummy data

  return (
    <div style={{ padding: '20px' }}>
      <h2>Stickers</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {data.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default StickerListing;
