import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BooksPage from './pages/BooksPage';
import BuyPage from './pages/BuyPage';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import AdminBooksPage from './pages/AdminBooksPage';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route path="/buy/:bookID/:title/:price" element={<BuyPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/adminBooks" element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
