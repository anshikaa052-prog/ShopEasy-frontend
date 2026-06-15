import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext, UserContext } from '../App';
import axios from 'axios'; 

const ShippingScreen = () => {
  const navigate = useNavigate();
  const { shippingAddress, setShippingAddress } = useContext(CartContext);
  const { userInfo } = useContext(UserContext);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedAddress = JSON.parse(localStorage.getItem('shippingAddress'));
    if (savedAddress) {
      setAddress(savedAddress.address || '');
      setCity(savedAddress.city || '');
      setPostalCode(savedAddress.postalCode || '');
      setCountry(savedAddress.country || '');
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const shippingData = { address, city, postalCode, country };

    
    setShippingAddress(shippingData);
    
    localStorage.setItem('shippingAddress', JSON.stringify(shippingData));

    try {
      
      await axios.put(
        'https://shopeasy-backend-4thj.onrender.com/api/users/shipping', // Ye tera backend route hai
        shippingData,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` }
        }
      );
      
      setLoading(false);
      navigate('/payment'); // Sab ho gaya toh payment page pe bhej do
      
    } catch (error) {
      setLoading(false);
      alert(error.response?.data?.message || 'Address save nahi hua');
    }
  };

  return (
    <div style={{ minHeight: '90vh', padding: '40px 20px', background: '#f7fafc' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '12px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div style={{ color: '#667eea', fontWeight: '600' }}>Sign In</div>
          <div style={{ color: '#667eea', fontWeight: '600' }}>Shipping</div>
          <div style={{ color: '#cbd5e0' }}>Payment</div>
          <div style={{ color: '#cbd5e0' }}>Place Order</div>
        </div>

        <h1 style={{ marginBottom: '30px' }}>Shipping Address</h1>
        
        <form onSubmit={submitHandler}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Address</label>
            <input
              type="text"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>City</label>
            <input
              type="text"
              placeholder="Enter city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Postal Code</label>
            <input
              type="text"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0' }}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Country</label>
            <input
              type="text"
              placeholder="Enter country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e0' }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ 
              width: '100%', padding: '14px', background: loading ? '#cbd5e0' : '#667eea', 
              color: 'white', fontSize: '16px', border: 'none', borderRadius: '10px', 
              cursor: loading ? 'not-allowed' : 'pointer', fontWeight: '600'
            }}
          >
            {loading ? 'Saving...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingScreen;