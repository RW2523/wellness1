import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', user);
      navigate('/'); // Redirect to login page after successful registration
    } catch (err) {
       // Show error message
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>ZeNalam</h1>
        <p style={styles.quote}>“Your journey to wellness begins here.”</p>
      </div>
      <form onSubmit={register} style={styles.form}>
        <h2 style={styles.formTitle}>Create an Account</h2>
        
        <input 
          placeholder="Full Name" 
          onChange={e => setUser({ ...user, name: e.target.value })} 
          value={user.name}
          style={styles.input}
          required
        />
        
        <input 
          placeholder="Email" 
          type="email" 
          onChange={e => setUser({ ...user, email: e.target.value })} 
          value={user.email}
          style={styles.input}
          required
        />
        
        <input 
          placeholder="Password" 
          type="password" 
          onChange={e => setUser({ ...user, password: e.target.value })} 
          value={user.password}
          style={styles.input}
          required
        />
        
        <button type="submit" style={styles.button}>Register</button>
      </form>
      
      <p style={styles.footerText}>Already have an account? <a href="/" style={styles.link}>Login</a></p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f8ff',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    color: '#333',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  title: {
    fontSize: '48px',
    color: '#2e8b57',
    marginBottom: '10px',
  },
  quote: {
    fontStyle: 'italic',
    color: '#5f6368',
    fontSize: '18px',
    marginTop: '10px',
  },
  form: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  formTitle: {
    fontSize: '24px',
    color: '#2e8b57',
    marginBottom: '20px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#2e8b57',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#256e4c',
  },
  footerText: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#5f6368',
  },
  link: {
    textDecoration: 'none',
    color: '#2e8b57',
    fontWeight: 'bold',
  },
};

export default Register;
