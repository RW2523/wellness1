import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Overview from './Overview';
import ActivityCards from './ActivityCards';
import WellnessQuotes from './WellnessQuotes';
import '../App.css';

function Dashboard() {
  return (
    <div className="app">
    <Sidebar />
    <div className="main-content">
      <Header />
      <Overview />
      <ActivityCards />
    </div>
    <WellnessQuotes />
  </div>
  );
}

export default Dashboard;
