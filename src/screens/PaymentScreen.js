import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem('paymentMethod', paymentMethod);
    navigate('/placeorder');
  };

  if (!localStorage.getItem('shippingAddress')) {
    navigate('/shipping');
    return null;
  }

  return (
    <div style={{ 
      minHeight: '90vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>Payment Method</h1>
        <form onSubmit={submitHandler}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', padding: '15px', border: '1px solid #cbd5e0', borderRadius: '8px', marginBottom: '10px' }}>
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === 'COD'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ marginRight: '10px' }}
              />
              Cash on Delivery
            </label>

            <label style={{ display: 'flex', alignItems: 'center', padding: '15px', border: '1px solid #cbd5e0', borderRadius: '8px' }}>
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

          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Continue to Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;