import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import SleepPrediction from './components/SleepPrediction';
import ProfilePage from './components/Profile';
import ZenMode from './components/ZenMode';
import ConsultPage from './components/ConsultPage';
import Meal from './components/Meal';
import SchedulePage from './scheduling/SchedulePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sleep_prediction" element={<SleepPrediction />} /> 
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/zen" element={<ZenMode />} />
        <Route path="/consult" element={<ConsultPage />} />
        <Route path="/meal" element={<Meal />} />
        <Route path="/schedule/:consultantId" element={<SchedulePage />} />
      </Routes>
    </Router>
  );
}

export default App;
