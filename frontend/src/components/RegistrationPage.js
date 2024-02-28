import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import registrationServices from '../services/registrationServices';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        age: '', // Keeping age as a string in the state for input handling.  Will be parsed as interger before sending to backend
        university: '', 
        role: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Convert age to an integer before sending
        const registrationData = {
            ...userData,
            age: parseInt(userData.age, 10) || 0, // Convert age to integer, default to 0 if conversion fails
        };

        registrationServices.register(registrationData)
            .then(response => {
                alert('Registration successful');
                navigate('/');
            })
            .catch(error => {
                alert('Registration failed');
                console.error('Registration error:', error);
            });
    };

    return (
        <>
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <h2>Create Your Account</h2>
                    <Form onSubmit={handleSubmit}>
                        
                        <Form.Group className="mb-3" controlId="formBasicRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control as="select" name="role" value={userData.role} onChange={handleChange} required>
                                <option value="">Select Role</option>
                                <option value="Students">Student</option>
                                <option value="Teachers">Teacher</option>
                            </Form.Control>
                        </Form.Group>                        
                        
                        
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" placeholder="Enter username" value={userData.username} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" value={userData.password} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" name="first_name" placeholder="Enter your first name" value={userData.first_name} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="last_name" placeholder="Enter your last name" value={userData.last_name} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicAge">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="text" name="age" placeholder="Enter your age" value={userData.age} onChange={handleChange} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicUniversity">
                            <Form.Label>University</Form.Label>
                            <Form.Control type="text" name="university" placeholder="Enter your university" value={userData.university} onChange={handleChange} required />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Form>
                </div>
            </Container>
        </>
    );
};

export default RegistrationPage;
