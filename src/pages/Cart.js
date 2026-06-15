import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../App'; // Apna CartContext ka path check kar lena

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useContext(CartContext);

  // Qty badhane-ghatane ka function
  const updateQty = (id, qty) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id ? { ...item, qty: Number(qty) } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  // Item remove karne ka function
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  // Ye naya function add kar
  const checkoutHandler = () => {
    navigate('/shipping'); // Shipping page pe bhej dega
  };

  // Total calculate kar
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const totalItems = cartItems.reduce((a, c) => a + c.qty, 0);

  return (
    <div style={{ minHeight: '90vh', padding: '40px 20px', background: '#f7fafc' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '30px' }}>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', marginBottom: '20px' }}>Cart is empty</p>
            <Link 
              to="/products"
              style={{ 
                backgroundColor: '#667eea', 
                color: 'white', 
                padding: '12px 24px', 
                borderRadius: '8px', 
                textDecoration: 'none' 
              }}
            >
              Go Shopping
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
            
            {/* Left Side - Cart Items */}
            <div>
              {cartItems.map((item) => (
                <div 
                  key={item._id} 
                  style={{ 
                    backgroundColor: 'white', 
                    padding: '20px', 
                    borderRadius: '12px', 
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px'
                  }}
                >
                  <img 
                    src={item.image} 
                    alt={item.name}
                    onError={(e) => { 
                      e.target.src = 'https://via.placeholder.com/80x80?text=No+Image' 
                    }}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  
                  <div style={{ flex: 1 }}>
                    <Link to={`/product/${item._id}`} style={{ textDecoration: 'none', color: '#1a202c', fontWeight: '600' }}>
                      {item.name}
                    </Link>
                    <p style={{ color: '#718096', margin: '5px 0' }}>₹{item.price}</p>
                  </div>

                  <select
                    value={item.qty}
                    onChange={(e) => updateQty(item._id, e.target.value)}
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e0' }}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    style={{ 
                      background: '#ef4444', 
                      color: 'white', 
                      border: 'none', 
                      padding: '8px 12px', 
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            {/* Right Side - Summary */}
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', height: 'fit-content' }}>
              <h2 style={{ marginBottom: '20px' }}>
                Subtotal ({totalItems} items): ₹{itemsPrice}
              </h2>
              
              {/* Yahi hai naya button */}
              <button
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
                style={{ 
                  width: '100%',
                  padding: '14px 32px', 
                  background: cartItems.length === 0 ? '#9ca3af' : '#10b981', 
                  color: 'white', 
                  fontSize: '16px',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer',
                  fontWeight: '600'
                }}
              >
                Proceed to Checkout
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;