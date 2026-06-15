import React, { useState } from 'react';
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


const validateForm = () => {
  const newErrors = {};

  if (!name.trim()) newErrors.name = 'Name is required';
  else if (name.length < 3) newErrors.name = 'Name must be at least 3 characters long';

  if (!email) newErrors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Please enter a valid  email address';

  if (!password) newErrors.password = 'Password is required';
  else if (password.length < 6) newErrors.password = 'Password  must be at least 6 characters long';

  return newErrors;
};

const handleSubmit = async(e) => {  
  e.preventDefault();
  const formErrors = validateForm();

  if (Object.keys(formErrors).length > 0) {
    setErrors(formErrors);
  } 
  else {
    setErrors({});
  try {
    const {data} = await axios.post('http://localhost:5000/api/users/Signup',
      {
        name,
        email,
        password
      }
    );

    localStorage.setItem('userInfo', JSON.stringify(data));
    alert(data.message);
    navigate('/');
     }
      catch (error) {
    alert(error.response?.data?.message);
  }
}
};
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Sign Up</h2>
              
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="Enter your name" value={name}
                                  onChange={(e) => setName(e.target.value)} />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                 <input
                   type="email"
                   className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                     placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                     {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                     className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="Create password" value={password} onChange={(e) => setPassword(e.target.value)} />
                       
                   {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <button type="submit" className="btn btn-success w-100 mb-3">
                  Sign Up
                </button>

                <p className="text-center mb-0">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;