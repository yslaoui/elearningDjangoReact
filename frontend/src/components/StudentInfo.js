import React, { useEffect, useState } from 'react';
import studentServices from '../services/studentServices';
import NavigationBar from './NavigationBar';
import teacherServices from '../services/teacherServices';

const StudentInfo = () => {
  const [student, setStudent] = useState(null);
  const [statusUpdates, setStatusUpdates] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const [teacher, setTeacher] = useState(null);



  useEffect(() => {
    // I retrieve user roles from local storage
    const roles = JSON.parse(localStorage.getItem('userRoles') || '[]');
    console.log(roles)
    setUserRoles(roles);
    if (roles.includes('Teachers')) {
      console.log(`The role is teacher`)
      let currentTeacher = null
      teacherServices.getCurrentTeacher()
        .then(response => {
          console.log(response.data)
          currentTeacher = response.data
          setTeacher(response.data);
          console.log(teacher) 
        })
        .catch(error => {
          console.error('Error fetching teacher info:', error);
        });
    }
    else if (roles.includes('Students')) {
      console.log(`The role is student`)
      let currentStudent = null;
      studentServices.getCurrentStudent()
        .then(response => {
          console.log('response.data', response.data)
          currentStudent = response.data;
          setStudent(response.data);
          console.log('teacher', teacher) 
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
    }   
  }, []);

  return (
    <div>
      <NavigationBar />
      {teacher && (
        <div>
          <h2>Teacher Information</h2>
          <p>Name: {teacher.first_name} {teacher.last_name}</p>
          <p>University: {teacher.university}</p>
        </div>
      )}
      {student && (
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
      )}
    </div>
  );
    
}  

export default StudentInfo;
