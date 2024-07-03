import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AddExpense } from './AddExpense';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async(e)=>{
    e.preventDefault()
    try{
        localStorage.removeItem('token');
      navigate('/signin');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  }

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Expense Manager
        </Typography>
        <Button color="inherit" component={Link} to="/dashboard">
          View Expenses
        </Button>
        <Button color="inherit" component={Link} to="/add">
          Add Expense
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
