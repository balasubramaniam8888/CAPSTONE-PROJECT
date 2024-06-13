import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Documents from './pages/Documents.jsx';
import Document from './pages/Document.jsx';
import DocumentEditor from './pages/DocumentEditor.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path='/documents/new' element={<DocumentEditor/>} / >
        <Route path="/documents/:id" element={<DocumentEditor/>} />
        <Route path="/documents" element={<Documents/>} />
        <Route path="/" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;

