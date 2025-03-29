import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/Welcome';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { useState } from 'react';

function BuyPage() {
  const navigate = useNavigate();
  const { title, bookID, price } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<Number>(1);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || 'No book found',
      price: Number(price),
      quantity: Number(quantity),
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <WelcomeBand />
      <h2>Purchase {title}</h2>
      <div>Price: ${price}</div>
      <label>
        Quantity:
        <input
          type="number"
          max="10"
          value={Number(quantity)}
          onChange={(q) => {
            setQuantity(Number(q.target.value));
          }}
        />
      </label>
      <div>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default BuyPage;
