import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router basename="/test">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
