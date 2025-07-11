import { Routes, Route } from 'react-router-dom';
import StickerListing from '../pages/StickerListing';
import MasterCategory from '../pages/MasterCategory';
import SubCategory from '../pages/SubCategory';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MasterCategory />} />
    <Route path="/sub-category" element={<SubCategory />} />
    <Route path="/stickers" element={<StickerListing />} />
  </Routes>
);

export default AppRoutes;
