import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import loginServices from '../services/loginServices';

const NavigationBar = () => {
  const navigate = useNavigate(); 
  // Fetch user roles from local storage
  const userRoles = JSON.parse(localStorage.getItem('userRoles')) || [];

  // Check if user is a teacher
  const isTeacher = userRoles.includes('Teachers');

  const handleLogout = () => {
    loginServices.logout().then(() => {
        navigate('/login');
    }).catch(error => {
        console.error('Logout failed:', error);
    });
};
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className="fs-3">E-Learning App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-3">
            <Nav.Link href="/" className="fs-6">Home</Nav.Link>
            <Nav.Link href="/courses" className="fs-6">Courses</Nav.Link>
            {isTeacher && <Nav.Link href="/create-course" className="fs-6">Create a course</Nav.Link>}
            {isTeacher && <Nav.Link href="/user-search" className="fs-6">Student Search</Nav.Link>}
            <Nav.Link href="/login" className="fs-6">Login</Nav.Link>
            <Nav.Link href="/chatHome" className="fs-6">Chat</Nav.Link>
            <Nav.Link href="/register" className="fs-6">Register</Nav.Link>
          </Nav>
          <Button onClick={handleLogout}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
