import axios from 'axios';
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import {Link, useNavigate} from "react-router-dom"
import Loader from '../components/Loader';
const Register = () => {
    const [name,setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const { data } = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/register`, { email, name, password });
      if (data.message) {
        toast.success(data.message);
        localStorage.setItem('activationToken', data.activationToken);
        navigate("/verify");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Registration failed. Please try again.');
      }
    }finally{
      setLoading(false)
    }
  };


  return (
    <Container className='my-5'>
      <h1 className='mb-3'>Register Page</h1>
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className='mb-3'
          />
        </Form.Group>

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
          {
            loading ? <Loader/> : 'Send otp'
          }
        </Button>
      </Form>
      <p className='mt-2'>Already have an account ? <Link to="/login" className=' text-primary'>Login Here</Link></p>
    </Container>
  );
};

export default Register;
