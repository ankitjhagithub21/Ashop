import React from 'react'
import {Button,Container,Nav,Navbar} from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setIsAuth } from '../app/slices/authSlice'
import toast from 'react-hot-toast'
const Header = () => {
  const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = useSelector(state=>state.auth.isAuth)
    const handleLogout = () =>{
      localStorage.clear()
      dispatch(setIsAuth(false))
      toast.success("Logged out successfully.")
    }
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme = "dark" className="bg-body-tertiary">
      <Container fluid>
            <Navbar.Brand>Ashop</Navbar.Brand>
            <Navbar.Toggle aria-controls='navbarScroll'></Navbar.Toggle>
            <Navbar.Collapse id='navbarScroll'>
                <Nav className='me-auto  my-2 my-lg-0' navbarScroll>
                <Link to={"/"} className='mx-2'>Home</Link>
                <Link to={"/products"} className='mx-2'>Products</Link>
               {
                isAuth &&  <Link to={"/account"} className='mx-2'>Account</Link>
               }
                </Nav>
              {
                isAuth ?   <Button variant='danger' onClick={handleLogout}>Logout</Button> :   <Button variant='success' onClick={()=>navigate("/login")}>Login</Button>
              }
            </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
