import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />       {/* This shows the top navigation bar */}
      <AppRoutes />    {/* This handles page routing */}
    </BrowserRouter>
  );
}

export default App;
