import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { CubicEquation } from './pages/CubicEquation';
import { MonteCarlo } from './pages/MonteCarlo';
import { QuinticEquation } from './pages/QuinticEquation';
import { SieveOfEratosthenes } from './pages/SieveOfEratosthenes';
import { TravelingSalesmanProblem } from './pages/TravelingSalesmanProblem';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cubicequation" element={<CubicEquation />} />
            <Route path="/montecarlo" element={<MonteCarlo />} />
            <Route path="/quinticequation" element={<QuinticEquation />} />
            <Route path="/sieveoferatosthenes" element={<SieveOfEratosthenes />} />
            <Route path="/travelingsalesmanprob" element={<TravelingSalesmanProblem />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
