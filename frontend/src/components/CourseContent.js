import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import contentServices from '../services/contentServices';
import studentServices from '../services/studentServices';
import NavigationBar from './NavigationBar';

const CourseContents = () => {
  const { id: courseId } = useParams();
  const [contents, setContents] = useState([]);
  const [isEnrolledOrTeacher, setIsEnrolledOrTeacher] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      // Check user roles from local storage
      const roles = JSON.parse(localStorage.getItem('userRoles') || '[]');
      const isTeacher = roles.includes('Teachers'); 

      if (isTeacher) {
        setIsEnrolledOrTeacher(true);
      } else {
        // Check if the student is enrolled in the course
        const response = await studentServices.getEnrolledCourses();
        const enrolledCourseIds = response.data.map(enrollment => enrollment.course);
        setIsEnrolledOrTeacher(enrolledCourseIds.includes(parseInt(courseId)));
      }

      // Fetch course contents if the user is enrolled or is a teacher
      if (isEnrolledOrTeacher || isTeacher) {
        contentServices.getByCourseId(courseId)
          .then(response => {
            setContents(response.data);
          })
          .catch(error => {
            console.error('Error fetching course contents:', error);
          });
      }
    };

    checkAccess();
  }, [courseId, isEnrolledOrTeacher]);

  return (
    <>
      <NavigationBar/>
      <div className="container mt-4">
        <h2>Course Contents</h2>
        {isEnrolledOrTeacher ? (
          contents.length > 0 ? (
            contents.map((content) => (
              <div key={content.id} className="mb-3">
                <h3>{content.title}</h3>
                <p>{content.description}</p>
                {content.content_type === "pdf" && (
                  <div>
                    <a href={content.file} target="_blank" rel="noopener noreferrer">
                      View PDF
                    </a>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No contents found for this course.</p>
          )
        ) : (
          <p>You do not have access to this course's contents.</p>
        )}
      </div>
    </>
  );
};

export default CourseContents;
