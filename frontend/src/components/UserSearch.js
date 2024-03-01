import React, { useEffect, useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import studentServices from '../services/studentServices';

const UserSearch = () => {
  const [students, setStudents] = useState([]);
  const [filterTerm, setFilterTerm] = useState('');

  useEffect(() => {
    studentServices.getAll()
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  // Function to handle filter change
  const handleFilterChange = (e) => {
    setFilterTerm(e.target.value);
  };

  // Filter students based on the filterTerm
  const filteredStudents = students.filter(student =>
    new RegExp(filterTerm, 'i').test(student.first_name)
  );

  return (
    <div>
      <h2>Student List</h2>
      <Form.Group className="mb-3">
        <Form.Label>Filter by First Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter first name"
          value={filterTerm}
          onChange={handleFilterChange}
        />
      </Form.Group>
      {filteredStudents && filteredStudents.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>University</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{student.first_name}</td>
                <td>{student.last_name}</td>
                <td>{student.university}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
};

export default UserSearch;
