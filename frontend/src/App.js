import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ChatRoom from './components/ChatRoom';
import ChatHome from './components/ChatHome';
import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';

const App = () => {
  return (
<Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/courses" element={<CourseList/>} />
        <Route path="/course/:id" element={<CourseDetail/>} />
        <Route path="/chatHome" element={<ChatHome/>} />
        <Route path="/chat_room/:room_name" element={<ChatRoom/>} />
      </Routes>
    </Router>
  );
};

export default App;
