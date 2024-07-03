import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Button,
    MenuItem,
    FormControl,
    InputLabel,
    Select
  } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState,useEffect } from 'react';

const ExpensesTable = () => {
  const [expenses, setExpenses] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [currentExpense,setCurrentExpense] = useState({
    category:'',
    amount:'',
    comments:''
  });

  const categories = ['Food', 'Fees', 'Transport', 'Entertainment', 'Utilities', 'Others'];

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:5000/expense/viewall', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }
        const data = await response.json();
        setExpenses(data?.expenses?? []);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

    const handleEditOpen = (expense)=>{
        setCurrentExpense(expense)
        setEditOpen(true);
    }

    const handleEditClose = ()=>{
        setEditOpen(false)
    }

    const handleEditChange = (e)=>{
        const {name,value} = e.target;
        setCurrentExpense({...currentExpense,[name]:value})
    }

    const handleEditSave = async()=>{
        try{
            const token = localStorage.getItem('token');
            const response = await fetch(`http://127.0.0.1:5000/expense/update/${currentExpense._id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(currentExpense)
            });

            if(!response.ok){
                throw new Error('Failed to update expense')
            }
            const updatedExpense = await response.json();
            setExpenses(expenses.map(exp=>(
                exp._id === updatedExpense.expense._id ? updatedExpense.expense:exp
            )))
            console.log(updatedExpense)
            handleEditClose();
            
        }catch(error){
            console.error('Error updating the expense:',error);
        }

    }
    const handleDelete = async (id) => {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`http://127.0.0.1:5000/expense/remove/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          if (!response.ok) {
            throw new Error('Failed to delete expense');
          }
          setExpenses(expenses.filter(expense => expense._id !== id));
        } catch (error) {
          console.error('Error deleting expense:', error);
        }
    };
   
  return (
    // <div style={{ display: 'flex', justifyContent:"center", alignItems:"center", height: '20vh' }}>
      <div style={{alignItems:'center',height:'20vh'}}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold',fontSize: '1.1rem' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold',fontSize: '1.1rem' }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold',fontSize: '1.1rem' }}>Comment</TableCell>
              <TableCell sx={{ fontWeight: 'bold',fontSize: '1.1rem' }}>Created At</TableCell>
              <TableCell sx={{ fontWeight: 'bold',fontSize: '1.1rem' }}>Updated At</TableCell>
              <TableCell sx={{ fontWeight: 'bold',fontSize: '1.1rem' }}>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense._id}>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{expense.comments}</TableCell>
                <TableCell>{new Date(expense.createdAt).toLocaleString()}</TableCell>
                <TableCell>{new Date(expense.updatedAt).toLocaleString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditOpen(expense)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(expense._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Expense</DialogTitle>
        
         <DialogContent>
        <DialogContentText>
        Update the fields below to edit the expense.
        </DialogContentText>
        
        <FormControl fullWidth margin="dense">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
            labelId="category-label"
            name="category"
            value={currentExpense.category}
            onChange={handleEditChange}
            label="Category"
        >
            {categories.map((category) => (
            <MenuItem key={category} value={category}>
                {category}
            </MenuItem>
            ))}
        </Select>
        </FormControl>
        
        <TextField
        margin="dense"
        name="amount"
        label="Amount"
        type="number"
        fullWidth
        value={currentExpense.amount}
        onChange={handleEditChange}
        />
        
        <TextField
        margin="dense"
        name="comments"
        label="Comments"
        type="text"
        fullWidth
        value={currentExpense.comments}
        onChange={handleEditChange}
        />
    </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    // </div>
  );
};

export default ExpensesTable;
