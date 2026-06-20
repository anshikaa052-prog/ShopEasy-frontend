import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">
        <div className="container">
          <Link className="navbar-brand" to="/">
            ShopEasy
          </Link>
          
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              
              <li className="nav-item">
                <Link className="nav-link text-white" to="/">
                  Home
                </Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart
                </Link>
              </li>

              {userInfo ? (
                <>
                  {/* ✅ YAHAN ADD KAR - Login ke baad dikhega */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/myorders">
                      My Orders
                    </Link>
                  </li>
                  
                  <li className="nav-item">
                    <span className="nav-link text-white">
                      Hi, {userInfo.name}
                    </span>
                  </li>
                  <li className="nav-item">
                    <button 
                      onClick={handleLogout} 
                      className="btn btn-danger btn-sm ms-2"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Signup
                    </Link>
                  </li>
                </>
              )}

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;