import React, { useRef, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import SleepPrediction from './components/SleepPrediction';
import ProfilePage from './components/Profile';
import ZenMode from './components/ZenMode';
import ConsultPage from './components/ConsultPage';
import Meal from './components/Meal';

import LandingPage from "./components/LandingPage";
import UserInputSection from "./components/UserInputSection";
import BreathingModule from "./components/BreathingModule";
import SuryaModule from "./components/SuryaModule";
import PsychModule from "./components/PsychModule";

import StarBackground from './components/StarBackground';


// 👇 This is your full home page with scroll logic
function HomePage() {
  const inputRef = useRef(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleScroll = () => {
    inputRef.current?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => setShowDialog(true), 1000);
  };

  return (
    <>
      <LandingPage onStart={handleScroll} />
      <div ref={inputRef}>
        <UserInputSection showDialog={showDialog} />
      </div>
    </>
  );
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sleep_prediction" element={<SleepPrediction />} /> 
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/consult" element={<ConsultPage />} />
        <Route path="/meal" element={<Meal />} />

        <Route path="/zen" element={<HomePage />} />
        <Route path="/breathing" element={<BreathingModule />} />
        <Route path="/surya" element={<SuryaModule />} />
        <Route path="/psych" element={<PsychModule />} />
      </Routes>
    </Router>
  );
}

export default App;