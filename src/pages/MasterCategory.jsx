import { Link } from 'react-router-dom';

const MasterCategory = () => (
  <div style={{ padding: '20px' }}>
    <h2>Master Category Page</h2>

    {/* Dummy master‑category list */}
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Link to="/stickers" style={cardStyle}>
        Stickers
      </Link>
      <div style={cardStyle}>Flyers</div>
      <div style={cardStyle}>Photo Frames</div>
      <div style={cardStyle}>Packaging Labels</div>
    </div>
  </div>
);

const cardStyle = {
  border: '1px solid #ccc',
  padding: '30px',
  minWidth: '120px',
  textAlign: 'center',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default MasterCategory;
