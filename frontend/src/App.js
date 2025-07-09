import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import primaryPage from './routes/primaryPage/index';

function App() {

  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<primaryPage />} />
        <Route path="/search" element={< search />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
