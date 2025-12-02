import React from 'react';
// import './App.css';
import Missions from './components/Missions';
import LoginPage from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import ApproveTab from './components/ApproveTab';
import LandingPage from './components/Home/LandingPage';
import SwipeDeck from './components/Dilemma/SwipeDeck';
import Dashboard from './components/testcode/Dashboard';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path="/app" element={<Missions/>} />
          <Route path="/dilema" element={<SwipeDeck/>}/>
          <Route path="/test" element={<Dashboard/>}/>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/" element={<LandingPage/>}/>
          <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        {/* Додаткові маршрути при потребі */}
      </Routes> 
    </Router>
    </div>
  );
}

export default App;
