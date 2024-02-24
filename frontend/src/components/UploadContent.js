import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import contentServices from '../services/contentServices'; 

const UploadContent = () => {
  const [content, setContent] = useState({
    title: '',
    description: '',
    order: '',
    content_type: '', 
    file: null,
  });

  const handleFileChange = (e) => {
    setContent({ ...content, file: e.target.files[0] });
  };

  const handleChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', content.title);
    formData.append('description', content.description);
    formData.append('order', content.order);
    formData.append('content_type', content.content_type);
    formData.append('file', content.file);
    formData.append('course', 1); 

    contentServices.insert(formData) // Using the insert method from contentServices
      .then(response => {
        alert('Content uploaded successfully!');
      })
      .catch(error => {
        console.error('There was an error uploading the content:', error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group controlId="formContentTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={content.title}
              onChange={handleChange}
              placeholder="Enter content title"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group controlId="formContentDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={content.description}
              onChange={handleChange}
              rows={3}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group controlId="formContentOrder">
            <Form.Label>Order</Form.Label>
            <Form.Control
              type="number"
              name="order"
              value={content.order}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group controlId="formContentType">
            <Form.Label>Content Type</Form.Label>
            <Form.Control
              as="select"
              name="content_type"
              value={content.content_type}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="pdf">PDF</option>
              <option value="video">Video</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group controlId="formContentFile">
            <Form.Label>File</Form.Label>
            <Form.Control
              type="file"
              name="file"
              onChange={handleFileChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Button variant="primary" type="submit">
        Upload Content
      </Button>
    </Form>
  );
};

export default UploadContent;
