import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/index';
import MealsPage from './pages/Meals/index';
import SweetsPage from './pages/Sweets/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<LandingPage />}> </Route>
        <Route path="/meals" exact element={<MealsPage />}> </Route>
        <Route path="/sweets" exact element={<SweetsPage />}> </Route>
      </Routes>
    </Router>
  );
}

export default App;