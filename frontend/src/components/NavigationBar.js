import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className="fs-3">E-Learning App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto ms-3">
            <Nav.Link href="/" className="fs-6">Home</Nav.Link>
            <Nav.Link href="/courses" className="fs-6">Courses</Nav.Link>
            <Nav.Link href="/create-course" className="fs-6">Create a course</Nav.Link>
            <Nav.Link href="/upload-content" className="fs-6">upload Content</Nav.Link>
            <Nav.Link href="/course/1/contents" className="fs-6">View content </Nav.Link>
            <Nav.Link href="/login" className="fs-6">Login</Nav.Link>
            <Nav.Link href="/chatHome" className="fs-6">Chat</Nav.Link>
            <Nav.Link href="/register" className="fs-6">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;

