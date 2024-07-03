const express=require('express');
const expenseModel = require('../models/expense')
const expenseRouter=express.Router();
const auth = require('../middleware/auth')

expenseRouter.post('/add',auth,async(req,res)=>{
    const { amount, category, comments } = req.body;
    const userId = req.userId;

    if (!amount || !category || !userId) {
        return res.status(400).json({ message: 'Amount, category, and userId are required' });
    }

    try {
        const newExpense = new expenseModel({
            amount,
            category,
            comments,
            userId,
            time: Date.now() 
        });
        await newExpense.save();
        res.status(201).json({ message: 'Expense added successfully', expense: newExpense });
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ message: 'Server error' });
    }
})


expenseRouter.get('/viewall',auth,async(req,res)=>{
    const userId = req.userId;
    try {
        const expenses = await expenseModel.find({ userId });
        if (!expenses || expenses.length === 0) {
            return res.status(200).json({ message: 'No expenses found for this user' });
        }
        res.status(201).json({ expenses });
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ message: 'Server error' });
    }
} )


expenseRouter.put('/update/:id',auth,async(req,res)=>{
    const userId = req.userId;
    const expenseId = req.params.id;

    const {amount,category,comments} = req.body;
    try{
        const expense = await expenseModel.findOne({_id:expenseId,userId});
        if(!expense){
            return res.status(404).json({message:'Expense Not Found'})
        }
        if(amount !== undefined) expense.amount = amount;
        if(category !== undefined) expense.category = category;
        if(comments !== undefined) expense.comments = comments;
        
        expense.time = Date.now()
        const updatedExpense = await expense.save()
        res.status(200).json({message:'Expense updated Successfully',expense:updatedExpense}) 
    }catch(error){
        console.log(error)
        res.status(400).json({message:'Server Error'})
    }
})


expenseRouter.delete('/remove/:id',auth,async(req,res)=>{
    const userId = req.userId;
    const expenseId = req.params.id;
    try {
        const expense = await expenseModel.findOneAndDelete({ _id: expenseId, userId });
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found or unauthorized' });
        }
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ message: 'Server error' });
    }
})


module.exports = expenseRouter;
