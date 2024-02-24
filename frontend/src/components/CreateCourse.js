import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import courseServices from '../services/courseServices';

const CreateCourse = () => {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    teacher: 1 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // POST request to backend to create course
    courseServices
        .insert(course)
        .then(response => {
            alert('Course created successfully!');
        })
        .catch(error => {
            console.error('There was an error uploading the content:', error);
        });
    };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formCourseTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control 
          type="text" 
          name="title" 
          value={course.title} 
          onChange={handleChange} 
          placeholder="Enter course title" 
        />
      </Form.Group>

      <Form.Group controlId="formCourseDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control 
          as="textarea" 
          name="description" 
          value={course.description} 
          onChange={handleChange} 
          rows={3} 
        />
      </Form.Group>

      <Form.Group controlId="formCourseStartDate">
        <Form.Label>Start Date</Form.Label>
        <Form.Control 
          type="date" 
          name="start_date" 
          value={course.start_date} 
          onChange={handleChange} 
        />
      </Form.Group>

      <Form.Group controlId="formCourseEndDate">
        <Form.Label>End Date</Form.Label>
        <Form.Control 
          type="date" 
          name="end_date" 
          value={course.end_date} 
          onChange={handleChange} 
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create Course
      </Button>
    </Form>
  );
};

export default CreateCourse;
