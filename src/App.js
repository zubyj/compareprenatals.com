import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './components/HomePage';
import Footer from './components/Footer';

import 'aos/dist/aos.css';
import AOS from 'aos';



function App() {

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Router basename="/test">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
