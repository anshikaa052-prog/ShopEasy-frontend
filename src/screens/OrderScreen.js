import React from 'react';
import { useParams } from 'react-router-dom';

const OrderScreen = () => {
  const { id } = useParams();
  
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Order Placed Successfully! 🎉</h1>
      <p>Your Order ID: {id}</p>
      <p>Thank you for shopping with us</p>
    </div>
  );
};

export default OrderScreen;