import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrderScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false); // Naya flag
  const navigate = useNavigate();
  
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));

  // Redirect agar login nahi hai - cart wala check hata diya
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    if (!shippingAddress) {
      navigate('/shipping');
    }
    // Cart wala check yahan se hata diya, warna order ke baad redirect ho jayega
    if (cartItems.length === 0 && !orderPlaced) {
      navigate('/cart');
    }
  }, [userInfo, shippingAddress, cartItems, navigate, orderPlaced]);

  // Price calculation
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 500 ? 0 : 50;
  const taxPrice = Number((0.18 * itemsPrice).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = async (e) => {
    e.preventDefault(); // Form submit rokne ke liye
    if (loading) return; // Double click roko
    
    setLoading(true);
    
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item._id,
        })),
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      }, config);

      console.log('Order Success:', data);
      setOrderPlaced(true); // Flag set kar do taaki cart check na ho
      localStorage.removeItem('cartItems'); 
      setLoading(false);
      navigate(`/order/${data._id}`); // Ab ye chalega
    } catch (error) {
      setLoading(false);
      console.log('Order Error:', error.response?.data?.message || error.message);
      alert('Order place nahi hua: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{ minHeight: '90vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
        <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>Place Order</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          {/* Left Side */}
          <div>
            <div style={{ marginBottom: '25px' }}>
              <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Shipping Address</h2>
              <p>{shippingAddress?.address}, {shippingAddress?.city}</p>
              <p>{shippingAddress?.postalCode}, {shippingAddress?.country}</p>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Payment Method</h2>
              <div> {/* form tag hata diya */}
                <label style={{ display: 'flex', alignItems: 'center', padding: '15px', border: '1px solid #cbd5e0', borderRadius: '8px', marginBottom: '10px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ marginRight: '10px' }}
                  />
                  Cash on Delivery
                </label>

                <label style={{ display: 'flex', alignItems: 'center', padding: '15px', border: '1px solid #cbd5e0', borderRadius: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    value="UPI"
                    checked={paymentMethod === 'UPI'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ marginRight: '10px' }}
                  />
                  UPI / Online Payment
                </label>
              </div>
            </div>

            <div>
              <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Order Items</h2>
              {cartItems.length === 0 ? (
                <p>Cart is empty</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                    <span>{item.name} x {item.qty}</span>
                    <span>₹{item.qty * item.price}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px' }}>
              <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Order Summary</h2>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>Items:</span>
                <span>₹{itemsPrice.toFixed(2)}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>Shipping:</span>
                <span>₹{shippingPrice.toFixed(2)}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>Tax (18%):</span>
                <span>₹{taxPrice.toFixed(2)}</span>
              </div>
              
              <hr style={{ margin: '15px 0' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontWeight: 'bold', fontSize: '18px' }}>
                <span>Total:</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>

              <button
                type="button" // type="submit" se "button" kar diya
                onClick={placeOrderHandler}
                disabled={cartItems.length === 0 || loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: loading ? '#ccc' : '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;