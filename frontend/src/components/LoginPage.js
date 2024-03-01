import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import loginServices from '../services/loginServices';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate(); 


  
  
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginServices.login(credentials.username, credentials.password);
      console.log('Login successful:', response.data);
      navigate('/'); 
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      alert("Invalid username and / or password")
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };


  return (
    <>
    <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h1>Welcome to your elearning journey</h1>
        <br />
        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" name="username" value={credentials.username} onChange={handleChange} placeholder="Enter username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Password" />
          </Form.Group>
          <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Button variant="secondary" onClick={handleRegister} style={{ marginLeft: '20px' }}>
                Register
              </Button>
          </div>    

        </Form>


      </div>
    </Container>
    </>
  );
};

export default LoginPage;
