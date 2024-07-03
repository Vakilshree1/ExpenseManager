const express=require('express');
const userRouter=express.Router();
const userModel = require('../models/user')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');
userRouter.post('/signup',async(req,res)=>{

    const {username,email,password}=req.body;
    try{
        const existingUser=await userModel.findOne({email:email})
        
        if(existingUser){
            return res.status(400).json({message:'User already exists'});
        }

        const hashedPassword=await bcrypt.hash(password,10)
       
        const result =await userModel.create({
            email:email,
            password:hashedPassword,
            username:username
        })
        res.status(201).json({result:"User created successfully"});

    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'something went wrong long ago...'})

    }

})

userRouter.post('/signin', async(req,res)=>{
    const {email,password}=req.body;
	try{
		const existingUser=await userModel.findOne({email:email});
		if(!existingUser){
			return res.status(404).json({message:'User Not Found !'})	
	

		}
		const matchPassword=await bcrypt.compare(password,existingUser.password);
		if(!matchPassword){
			return res.status(400).json({message:'Invalid Credentials'});
		
		}

		const token =jwt.sign({email:existingUser.email,id:existingUser._id},process.env.SECRET_KEY,{expiresIn:'1000s'});
		res.status(201).json({token:token});

	}
	catch(error){
	console.log(error);
		res.status(500).json({message:"Something went wrong"});
	
	}
})





module.exports=userRouter;