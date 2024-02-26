import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ChatRoom from './components/ChatRoom';
import ChatHome from './components/ChatHome';
import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UploadContent from './components/UploadContent';
import CourseContents from './components/CourseContent';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';

const App = () => {
  return (
<Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/courses" element={<CourseList/>} />
        <Route path="/course/:id" element={<CourseDetail/>} />
        <Route path="/chatHome" element={<ChatHome/>} />
        <Route path="/chat_room/:room_name" element={<ChatRoom/>} />
        <Route path="/create-course" element={<CreateCourse/>} />
        <Route path="/upload-content" element={<UploadContent/>} />
        <Route path="/course/:id/contents" element={<CourseContents/>} />
        <Route path="/register" element={<RegistrationPage />} />
        
      </Routes>
    </Router>
  );
};

export default App;
