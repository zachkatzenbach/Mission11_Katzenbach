import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { useEffect, useState } from 'react';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(cart.reduce((acc, item) => acc + item.price * item.quantity, 0));
  }, [cart]);

  return (
    <div>
      <h1>Your cart</h1>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="list-group">
            {cart.map((item: CartItem) => (
              <li className="list-group-item" key={item.bookID}>
                <strong>{item.title}: </strong>${item.price.toFixed(2)} -{' '}
                <strong> Qty: </strong>
                {item.quantity}
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item.bookID)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <br />
      <h3>Total: ${total.toFixed(2)}</h3>
      <button>Checkout</button>
      <button onClick={() => navigate('/')}>Continue Browsing</button>
    </div>
  );
}

export default CartPage;
