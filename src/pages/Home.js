import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">Welcome to ShopEasy</h1>
          <p className="lead">Your one-stop shop for everything you need</p>
          <Link to="/products" className="btn btn-light btn-lg">
            Shop Now
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container my-5">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card border-0">
              <div className="card-body">
                <h1>🚚</h1>
                <h5 className="card-title">Free Shipping</h5>
                <p className="card-text">Free shipping on all orders above ₹500</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card border-0">
              <div className="card-body">
                <h1>🔒</h1>
                <h5 className="card-title">Secure Payment</h5>
                <p className="card-text">100% secure payment gateway</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card border-0">
              <div className="card-body">
                <h1>↩️</h1>
                <h5 className="card-title">Easy Returns</h5>
                <p className="card-text">7 days easy return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">Featured Products</h2>
          
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : products.length === 0 ? (
            <p className="text-center">No products found. Add some products!</p>
          ) : (
            <div className="row">
              {products.map((product) => (
                <div className="col-md-3 mb-4" key={product._id}>
                  <div className="card h-100 shadow-sm">
                    <img
                      src={`http://localhost:5000${product.image}`}
                      className="card-img-top"
                      alt={product.name}
                      style={{ height: '200px', objectFit: 'contain' }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text text-muted small">{product.category}</p>
                      <p className="card-text fw-bold fs-5 mt-auto">₹{product.price}</p>
                      <button className="btn btn-primary btn-sm w-100 mt-2">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;