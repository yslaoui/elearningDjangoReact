import React, { useEffect, useState } from 'react';
import studentServices from '../services/studentServices';
import NavigationBar from './NavigationBar';

const StudentInfo = () => {
  const [student, setStudent] = useState(null);
  const [statusUpdates, setStatusUpdates] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);


  useEffect(() => {
    let currentStudent = null;
    studentServices.getCurrentStudent()
      .then(response => {
        currentStudent = response.data;
        setStudent(response.data);
        return studentServices.getStatusUpdates();
      })
      .then(response => {
        const updatesForStudent = response.data.filter(update => update.student.id === currentStudent.id);
        setStatusUpdates(updatesForStudent);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  
      studentServices.getEnrolledCourses()
      .then(response => {
          const enrolledCourses = response.data.map(enrollment => enrollment.course_detail);
          setEnrolledCourses(enrolledCourses);
      })
      .catch(error => {
          console.error('Error fetching enrolled courses:', error);
      });
  
  }, []);

  return (
    <div>
      <NavigationBar />
      {student ? (
        <div>
          <h2>Student Information</h2>
          <p>Name: {student.first_name} {student.last_name}</p>
          <p>Age: {student.age}</p>
          <p>University: {student.university}</p>
          <h2>Status Updates</h2>
          {statusUpdates.length > 0 ? (
            <ul>
              {statusUpdates.map((update) => (
                <li key={update.id}>{update.content} (Posted at: {new Date(update.posted_at).toLocaleString()})</li>
              ))}
            </ul>
          ) : (
            <p>No status updates found.</p>
          )}

          <h2>Enrolled Courses</h2>
          {enrolledCourses.length ? (
              <ul>
                  {enrolledCourses.map(course => (
                      <li key={course.id}>
                          <h3>{course.title}</h3>
                          <p>{course.description}</p>
                      </li>
                  ))}
              </ul>
          ) : (
              <p>No courses found.</p>
          )}
     
  
       
        </div>




      ) : (
        <div>Loading or no student found...</div>
      )}
    </div>
  );
};

export default StudentInfo;
