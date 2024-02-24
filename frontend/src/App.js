import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ChatRoom from './components/ChatRoom';
import ChatHome from './components/ChatHome';
import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';

const App = () => {
  return (
<Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/courses" element={<CourseList/>} />
        <Route path="/course/:id" element={<CourseDetail/>} />
        <Route path="/chatHome" element={<ChatHome/>} />
        <Route path="/chat_room/:room_name" element={<ChatRoom/>} />
        <Route path="/create-course" element={<CreateCourse/>} />
      </Routes>
    </Router>
  );
};

export default App;
