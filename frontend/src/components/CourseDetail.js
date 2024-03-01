import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import courseServices from '../services/courseServices';
import enrollServices from '../services/enrollServices';
import studentServices from '../services/studentServices';
import { Link } from 'react-router-dom';
import NavigationBar from './NavigationBar';



const CourseDetail = () => {
  const { id: courseId } = useParams(); // Get the course ID from URL parameters
  const [course, setCourse] = useState(null);
  const [studentId,  setStudentId] = useState(null)
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);


  useEffect(() => {

    const roles = JSON.parse(localStorage.getItem('userRoles') || '[]');
    setIsTeacher(roles.includes('Teachers'));

    // Get the current course information
    courseServices.getDetail(courseId)
      .then(response => {
        setCourse(response.data);
      })
      .catch(error => {
        console.error('Error fetching course details:', error);
      });



    if (roles.includes('Students')) 
    {
      // get the logged in student id
      studentServices.getCurrentStudent()
      .then(response => {
        setStudentId(response.data.id);
      })
      .catch(error => {
        console.error('Error fetching logged-in student info:', error);
      });

    // Check if the student is enrolled in the course
    studentServices.getEnrolledCourses()
      .then(response => {
        const enrolledCourseIds = response.data.map(enrollment => enrollment.course);
        setIsEnrolled(enrolledCourseIds.includes(parseInt(courseId)));
      })
      .catch(error => {
        console.error('Error checking course enrollment:', error);
      });
    }
    
  }, [courseId]);


  const handleEnrollment = () => {
    enrollServices.enrollStudentInCourse(courseId, studentId)
      .then(response => {
        alert('Enrollment successful!'); // Provide user feedback
      })
      .catch(error => {
        console.error('Enrollment failed:', error);
        if (error.response && error.response.data && error.response.data.message === 'Student already enrolled.' ) {
          alert('Student is already enrolled in this course')
        }
        else {
          alert('Failed to enroll in course.'); // Provide user feedback
        }
      });
  };

  // Check if course data is not yet loaded
  if (!course) return <div>Loading course details...</div>;

  return (
    <div>
      <NavigationBar/>
      <p>is teacher state:  {isTeacher}</p>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <div>Start Date: {new Date(course.start_date).toLocaleDateString()}</div>
      <div>End Date: {new Date(course.end_date).toLocaleDateString()}</div>
      <div>Teacher: {course.teacher.first_name} {course.teacher.last_name}</div>
      <button onClick={handleEnrollment}>Enroll in Course</button> {/* Enrollment button */}
      <br /> 
      {/* Show viewContents button if user is student and enrolled or if user role is  teacher */}
      {(isEnrolled || isTeacher) && (
        <>
          <br />
          <Link to={`/course/${courseId}/contents`} className="btn btn-primary ml-2">View Contents</Link>
        </>
      )}

      <br />
      <Link to={`/upload-content?course=${courseId}`} className="btn btn-secondary ml-2">Add Content</Link>

    </div>
  );
};

export default CourseDetail;
