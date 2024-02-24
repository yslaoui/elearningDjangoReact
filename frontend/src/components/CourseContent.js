import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import contentServices from '../services/contentServices'; 

const CourseContents = () => {
  const { id: courseId } = useParams();
  const [contents, setContents] = useState([]);

  useEffect(() => {
    contentServices.getByCourseId(courseId) 
      .then(response => {
        setContents(response.data);
        console.log(courseId)
      })
      .catch(error => {
        console.error('Error fetching course contents:', error);
      });
  }, [courseId]);

  return (
    <div className="container mt-4">
      <h2>Course Contents</h2>
      {contents.length > 0 ? (
        contents.map((content) => (
          <div key={content.id} className="mb-3">
            <h3>{content.title}</h3>
            <p>{content.description}</p>
            <h4>Section {content.order}</h4>
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
      )}
    </div>
  );
};

export default CourseContents;
