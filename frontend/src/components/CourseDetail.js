import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import courseServices from '../services/courseServices';
import enrollServices from '../services/enrollServices';
import { Link } from 'react-router-dom';

const CourseDetail = () => {
  const { id: courseId } = useParams(); // Get the course ID from URL parameters
  const [course, setCourse] = useState(null);
  const studentId = 4; 

  useEffect(() => {
    courseServices.getDetail(courseId)
      .then(response => {
        setCourse(response.data);
      })
      .catch(error => {
        console.error('Error fetching course details:', error);
      });
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
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <div>Start Date: {new Date(course.start_date).toLocaleDateString()}</div>
      <div>End Date: {new Date(course.end_date).toLocaleDateString()}</div>
      <div>Teacher: {course.teacher.first_name} {course.teacher.last_name}</div>
      <button onClick={handleEnrollment}>Enroll in Course</button> {/* Enrollment button */}
      <br />
      <Link to={`/course/${courseId}/contents`} className="btn btn-primary ml-2">View Contents</Link>
      <br />
      <Link to={`/upload-content?course=${courseId}`} className="btn btn-secondary ml-2">Add Content</Link>

    </div>
  );
};

export default CourseDetail;
