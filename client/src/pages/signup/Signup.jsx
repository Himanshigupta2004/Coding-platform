import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json().catch(() => ({}));
  
      if (!res.ok) {
        setError(data.message || 'Signup failed');
        setLoading(false);
        return;
      }
  
      localStorage.setItem('token', data.token);
      alert('Signup Successful!');
      window.location.href = '/login';
  
    } catch (err) {
      setError('Something went wrong!');
    }
  
    setLoading(false);
  };
  
  

  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <div className='backgroundStyle'></div>

      <div className="signup-container">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />

          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={loading}>
             {loading ? 'Signing up...' : 'Signup'}
          </button>


          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
