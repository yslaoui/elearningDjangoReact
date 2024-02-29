import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import contentServices from '../services/contentServices'; 
import studentServices from '../services/studentServices'; // Ensure you have this import
import NavigationBar from './NavigationBar';

const CourseContents = () => {
  const { id: courseId } = useParams();
  const [contents, setContents] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false); // New state to track enrollment

  useEffect(() => {
    // Check if the student is enrolled in the course
    studentServices.getEnrolledCourses()
      .then(response => {
        const enrolledCourseIds = response.data.map(enrollment => enrollment.course);
        setIsEnrolled(enrolledCourseIds.includes(parseInt(courseId)));

        // Fetch course contents only if enrolled
        if (enrolledCourseIds.includes(parseInt(courseId))) {
          contentServices.getByCourseId(courseId) 
            .then(response => {
              setContents(response.data);
            })
            .catch(error => {
              console.error('Error fetching course contents:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error checking course enrollment:', error);
      });

  }, [courseId]);

  return (
    <>
      <NavigationBar/>
      <div className="container mt-4">
        <h2>Course Contents</h2>
        {isEnrolled ? (
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
          <p>You are not enrolled in this course.</p>
        )}
      </div>
    </>
  );
};

export default CourseContents;
