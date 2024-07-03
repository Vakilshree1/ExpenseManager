import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook from react-router-dom

export const SignUp = () => {
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    const requestData = { username, email, password };  
    try {
      const response = await fetch('http://127.0.0.1:5000/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });
  
      if (!response.ok) {
        throw new Error('Sign up failed');
      }
  
      navigateTo('/signin');
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
    
  };

  const handleNavigateToSignIn = ()=>{
    navigateTo('/signin')
  }


  return (
    <div style={{ display: 'flex', justifyContent: "flex-end", alignItems: 'center', height: '100vh' }}>
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign Up
        </Button>
      </form>

      <Button 
        onClick={handleNavigateToSignIn}
        variant='text'
        color='primary'
        fullWidth
        style={{marginTop:'16px'}}
      >Already a User? Sign In</Button>
    </Container>
    </div>
  );
};

// export default SignUp;
