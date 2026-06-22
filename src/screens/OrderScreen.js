import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../App'
import axios from 'axios'

const OrderScreen = () => {
  const { id: orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const { userInfo } = useContext(UserContext)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        console.log("UserInfo:", userInfo);
        console.log("Token:",userInfo?.token);
        console.log("Order ID:", orderId);

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
        const { data } = await axios.get(
          `https://shopeasy-backend-4jhj.onrender.com/api/orders/${orderId}`,
          config
        )
        setOrder(data)
        setLoading(false)
      } catch (err) {
        console.log("FULL ERROR:", err);
        console.log("RESPONSE:",err.response);
        setError(err.response?.data?.message || err.message)
        setLoading(false)
      }
    }

    if (userInfo) {
      fetchOrder()
    } else {
      setError('Please login to view order')
      setLoading(false)
    }
  }, [orderId, userInfo])

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Order {orderId}</h1>
      
      {loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <div style={{ color: 'red', padding: '15px', border: '1px solid red', borderRadius: '5px' }}>
          {error}
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h2>Shipping</h2>
            <p><strong>Name:</strong> {order.user.name}</p>
            <p><strong>Email:</strong> {order.user.email}</p>
            <p>
              <strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            {order.isDelivered ? (
              <div style={{ color: 'green', fontWeight: 'bold' }}>Delivered on {order.deliveredAt}</div>
            ) : (
              <div style={{ color: 'red', fontWeight: 'bold' }}>Not Delivered</div>
            )}
          </div>

          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h2>Payment Method</h2>
            <p><strong>Method:</strong> {order.paymentMethod}</p>
            {order.isPaid ? (
              <div style={{ color: 'green', fontWeight: 'bold' }}>Paid on {order.paidAt}</div>
            ) : (
              <div style={{ color: 'red', fontWeight: 'bold' }}>Not Paid</div>
            )}
          </div>

          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h2>Order Items</h2>
            {order.orderItems.length === 0 ? (
              <div>Order is empty</div>
            ) : (
              <div>
                {order.orderItems.map((item, index) => (
                  <div key={index} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
                    <p><strong>{item.name}</strong></p>
                    <p>{item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h2>Order Summary</h2>
            <p><strong>Items:</strong> ${order.itemsPrice}</p>
            <p><strong>Shipping:</strong> ${order.shippingPrice}</p>
            <p><strong>Tax:</strong> ${order.taxPrice}</p>
            <p style={{ fontSize: '20px' }}><strong>Total:</strong> ${order.totalPrice}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderScreen