import React, { useEffect, useState } from 'react';
import courseServices from '../services/courseServices';
import { Link } from 'react-router-dom'; // For linking to individual course detail pages


const CourseList = () => {
    const [courses, setCourses] = useState([]);

  useEffect(() => {
    courseServices.getAll() // Fetching data for student with ID 1
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
      });
  }, []);

  return (
    <div>
      <h2>Available Courses</h2>
      {courses.length ? (
        <ul>
          {courses.map(course => (
            <li key={course.id}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <Link to={`/course/${course.id}`}>View Course</Link>
              {/* #TODO enroll button here */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
};

export default CourseList;
