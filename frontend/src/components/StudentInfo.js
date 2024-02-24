import React, { useEffect, useState } from 'react';
import studentServices from '../services/studentServices';
import NavigationBar from './NavigationBar';

const StudentInfo = () => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    studentServices.getDetail(1) // Fetching data for student with ID 1
      .then(response => {
        setStudent(response.data);
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
      });
  }, []);

  return (
    <div>
      <NavigationBar/>
      {student ? (
        <div>
          <h2>Student Information</h2>
          <p>Name: {student.first_name} {student.last_name}</p>
          <p>Age: {student.age}</p>
          <p>University: {student.university}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <div>Loading or no student found...</div>
      )}
    </div>
  );
};

export default StudentInfo;
