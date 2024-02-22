import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ChatRoom from './components/ChatRoom';
import ChatHome from './components/ChatHome';

const App = () => {
  return (
<Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/chatHome" element={<ChatHome/>} />
        <Route path="/chat_room/:room_name" element={<ChatRoom/>} />
      </Routes>
    </Router>
  );
};

export default App;
