import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; 

const Login = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', { email, password });

      if(res.data.message == "Invalid credentials"){
        setMessage('Try again! Invalid credentials.');
      }
      else if (res.data.message.includes("Login successful")){
        var message = res.data.message;
        var char_index = message.indexOf("ID=");
        if(char_index){
          var user_id = message.substr(char_index+3);
          localStorage.setItem('id', user_id);
        }
        setMessageType('success');
        localStorage.setItem('userEmail', email);
        setTimeout(() => navigate('/Dashboard'), 1000); // Delay for user to read message
      }
    } catch (err) {
      setMessage('Login failed. Please check your credentials.');
      setMessageType('error');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>ZeNalam</h1>
        <p style={styles.quote}>“Take a deep breath and find your balance.”</p>
      </div>
      <form onSubmit={login} style={styles.form}>
        <h2 style={styles.formTitle}>Login</h2>
        <input 
          type="email" 
          placeholder="Email" 
          onChange={e => setEmail(e.target.value)} 
          value={email}
          required
          style={styles.input}
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={e => setPassword(e.target.value)} 
          value={password}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>

        {/* Message display */}
        {message && (
          <p style={{ 
            ...styles.message, 
            color: messageType === 'error' ? 'red' : 'green' 
          }}>
            {message}
          </p>
        )}
      </form>
      <p style={styles.footerText}>
        Don't have an account? <Link to="/register" style={styles.link}>Register</Link>
      </p>
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
  message: {
    marginTop: '15px',
    fontSize: '14px',
    textAlign: 'center',
  },
};

export default Login;
