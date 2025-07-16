import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import Primarypage from './routes/primaryPage';

function App() {

  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Primarypage />}/>
        <Route path="/search" element={<search />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
