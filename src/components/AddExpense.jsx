import { TextField, Button, Container, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useState } from 'react'
import Navbar from './Navbar';

export const AddExpense = () => {
  const [formData,setFormData] = useState({
    amount:'',
    category:'',
    comments:''    
  });
  const categories = ['Food', 'Fees', 'Transport', 'Entertainment', 'Utilities', 'Others'];
  
  const handleChange = (e) =>{
    const {name,value} = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
        const token = localStorage.getItem('token')
        const response = await fetch('http://127.0.0.1:5000/expense/add',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });

        if(!response.ok){
            throw new Error('Failed to add expense')
        }
        setFormData({
            amount: '',
            category: '',
            comments: ''
        });
    }catch(error){
        console.error('Error adding expense')
    }
  };


  return (
    <div>
        <Navbar></Navbar>
    <div style={{ display: 'flex', justifyContent: "flex-end", alignItems: 'center', height: '80vh' }}>
        <Container maxWidth="sm">
            <Typography variant='h4' align='center' gutterBottom>
                Add Expense
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                 label="Amount"
                 type="text"
                 name="amount"
                 value={formData.amount}
                 onChange={handleChange}
                 fullWidth
                 margin="normal"
                 required
                 ></TextField>

                <FormControl fullWidth margin='normal' required>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select 
                        labelId='category-label'
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        label="Category"
                    >
                     {categories.map((category)=>(
                        <MenuItem key={category} value={category}>{category}</MenuItem>   
                     ))}     
                    </Select>
                </FormControl>

                <TextField
                label="comments"
                type="text"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                fullWidth
                margin='normal'
                ></TextField>

                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Submit
                </Button>
            </form>
        </Container>
    </div>
    </div>
  )
}
