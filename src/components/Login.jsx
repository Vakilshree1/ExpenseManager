import React,{useState} from 'react'
import { TextField,Button,Container,Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigateTo = useNavigate()

    const [formData,setFormData] = useState({
        email:'',
        password:''
    });


    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        });
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const response = await fetch('http://127.0.0.1:5000/users/signin',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formData)
            });

            if(!response.ok){
                throw new Error("Login Failed !")
            }
            const responseData = await response.json();
            localStorage.setItem('token', responseData.token);
        }
        catch(error){
            console.log('Error Login in :',error.message);
        }
        navigateTo('/dashboard')
    };



    return (
    <div style={{ display: 'flex', justifyContent: "flex-end", alignItems: "center", height: '80vh' }}>
    <Container maxWidth="sm">
        <Typography varient="h4" align="center" gutterBottom>
            Sign in
        </Typography>
        <form onSubmit={handleSubmit}>
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
            type='password'
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required            
            ></TextField>
        </form>

        <Button 
        type="submit"
        variant='contained'
        color='primary'
        fullWidth
        onClick={handleSubmit}
        >
        Sign in
        </Button>
        <Button
        variant='text'
        color='primary'
        fullWidth
        style={{marginTop:'16px'}}
        onClick={()=>navigateTo('/')}
        
        >Not a User? Register here</Button>

    </Container>
    </div>
)
}
