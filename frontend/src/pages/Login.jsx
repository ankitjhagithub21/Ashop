import axios from 'axios';
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {Link, useNavigate} from "react-router-dom"
import { setIsAuth } from '../app/slices/authSlice';
import Loader from '../components/Loader';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(false)
  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      setLoading(true)
      const {data} = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`,{email,password})
        
      if(data.message){
       toast.success(data.message)
       localStorage.setItem('token',data.token)
       setEmail('')
       setPassword('')
       dispatch(setIsAuth(true))
       navigate("/")
      }
    }catch(error){
      toast.error(error.response.data.message)
      dispatch(setIsAuth(false))
    }finally{
      setLoading(false)
    }
     
  };

  return (
    <Container className='my-5'>
      <h1 className='mb-3'>Login Page</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className='mt-2'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary"  type="submit" className='mt-3'>
          {loading ? <Loader/> : 'Login'}
        </Button>
      </Form>
      <p className='mt-2'>Don't have an account ? <Link to="/register" className=' text-primary'>Register Here</Link></p>
    </Container>
  );
};

export default Login;
