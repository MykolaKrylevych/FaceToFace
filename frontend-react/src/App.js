import React from 'react';
// import './App.css';
import Missions from './components/Missions';
import LoginPage from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import ApproveTab from './components/ApproveTab';

function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path="/" element={<Missions/>} />
          <Route path="/login" element={<LoginPage/>} />
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
