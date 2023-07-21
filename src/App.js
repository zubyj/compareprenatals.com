import React from 'react';
import { BrowserRouter as Router, Route, Routes, useSearchParams } from 'react-router-dom';

import HomePage from './components/HomePage';

function App() {
  return (
    <Router basename="/test">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
