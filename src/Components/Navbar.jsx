import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav
    style={{
      padding: '12px 24px',
      display: 'flex',
      gap: '24px',
      background: '#f5f5f5',
      borderBottom: '1px solid #ddd',
    }}
  >
    <Link to="/">Master Category</Link>
    <Link to="/sub-category">Sub Category</Link>
    <Link to="/stickers">Stickers</Link>
  </nav>
);

export default Navbar;
