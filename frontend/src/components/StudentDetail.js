import React, { useEffect, useState } from 'react';
import studentServices from '../services/studentServices';
import NavigationBar from './NavigationBar';
import { useParams } from 'react-router-dom';

const StudentDetail = () => {
  const [student, setStudent] = useState(null);
  const { id } = useParams(); 
  const [enrolledCourses, setEnrolledCourses] = useState([]);



  useEffect(() => {

    studentServices.getDetail(id) 
    .then(response => {
    setStudent(response.data);
    })
    .catch(error => console.error('Error fetching student details:', error));

    
    studentServices.getEnrolledCourses()
    .then(response => {
        const enrolledCourses = response.data.map(enrollment => enrollment.course_detail);
        setEnrolledCourses(enrolledCourses);
    })
    .catch(error => {
        console.error('Error fetching enrolled courses:', error);
    });
    }   
  , [id]);

    // Check if student data is not null before rendering
    if (!student) {
        return <div>Loading student information...</div>;
        }

  return (
    <div>
      <NavigationBar />
        <div>
          <h2>Student Information</h2>
          <p>Name: {student.first_name} {student.last_name}</p>
          <p>Age: {student.age}</p>
          <p>University: {student.university}</p>
          <h2>Enrolled Courses</h2>
          {enrolledCourses.length > 0 ? (
            <ul>
              {enrolledCourses.map((course) => (
                <li key={course.id}>
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No enrolled courses found.</p>
          )}
        </div>
      )
    </div>
  );
    
}  

export default StudentDetail;
