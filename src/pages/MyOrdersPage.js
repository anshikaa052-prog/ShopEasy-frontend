import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.get(`${API_URL}/api/orders/myorders`, config);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [navigate, userInfo, API_URL]);

  if (loading) return <div className="text-center p-8">Loading your orders...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center p-8 border rounded-lg">
          <p className="text-xl mb-4">You haven't placed any orders yet 😢</p>
          <Link to="/" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded-lg shadow hover:shadow-md bg-white">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div>
                  <p className="text-gray-500 text-sm">ORDER ID</p>
                  <p className="font-mono text-xs">{order._id.substring(0, 10)}...</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">DATE</p>
                  <p>{new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">TOTAL</p>
                  <p className="font-bold">₹{order.totalPrice.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">STATUS</p>
                  <p>
                    {order.isDelivered ? (
                      <span className="text-green-600 font-semibold">Delivered</span>
                    ) : order.isPaid ? (
                      <span className="text-blue-600 font-semibold">Paid</span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">Processing</span>
                    )}
                  </p>
                </div>
              </div>
              <Link 
                to={`/order/${order._id}`} 
                className="text-blue-500 hover:underline font-medium"
              >
                View Order Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;