import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import courseServices from '../services/courseServices';

const CourseDetail = () => {
  const { id } = useParams(); // Get the course ID from URL parameters
  const [course, setCourse] = useState(null);

  useEffect(() => {
    courseServices.getDetail(id)
      .then(response => {
        setCourse(response.data);
      })
      .catch(error => {
        console.error('Error fetching course details:', error);
      });
  }, [id]);

  // Check if course data is not yet loaded
  if (!course) return <div>Loading course details...</div>;

  return (
    <div>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <div>Start Date: {new Date(course.start_date).toLocaleDateString()}</div>
      <div>End Date: {new Date(course.end_date).toLocaleDateString()}</div>
      <div>Teacher: {course.teacher.first_name} {course.teacher.last_name} </div>

    </div>
  );
};

export default CourseDetail;
