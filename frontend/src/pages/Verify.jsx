import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import {Link, useNavigate} from "react-router-dom"
import toast from "react-hot-toast"
import axios from "axios"
const Verify = () => {
  const [otp, setOtp] = useState('');
  
 const navigate = useNavigate()
  const handleSubmit = async(e) => {
    
    e.preventDefault();
   
    try{
      const activationToken = localStorage.getItem('activationToken')
      const {data} =  await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/verify`,{otp,activationToken})
      if(data.message){
        toast.success(data.message)
        localStorage.clear()
        navigate("/login")
        
        
      }
    }catch(error){
      toast.error(error.message)
    }
  };

  return (
    <Container className='my-5'>
      <h1 className='mb-3'>Verify Page</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Enter otp</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </Form.Group>

       

        <Button variant="primary"  type="submit" className='mt-3'>
          Verify
        </Button>
      </Form>
      <p className='mt-2'>Go to Login Page  <Link to="/login" className=' text-primary'>Login</Link></p>
    </Container>
  );
};

export default Verify;
