import React, { useEffect, useState } from 'react';
import { FaBiking, FaRunning, FaWalking } from 'react-icons/fa';
import './styles/ActivityCards.css';
import axios from 'axios';

const iconMap = {
    cycling: <FaBiking />,
    running: <FaRunning />,
    walking: <FaWalking />,
};

const ActivityCards = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/activities')
            .then(response => setActivities(response.data))
            .catch(error => console.error('Error fetching activities:', error));
    }, []);

    return (
        <div className="activity-cards">
            {activities.map((activity, index) => (
                <div className="activity-card" key={index}>
                    <div className="activity-header">
                        <div className="activity-icon">{iconMap[activity.type]}</div>
                        <div className="activity-name">{activity.name}</div>
                    </div>
                    <div className="activity-info">
                        <div className="activity-details">Goal: {activity.goal}</div>
                        <div className="progress-header">
                            <span className="progress-label">Progress</span>
                            <span className="progress-percent">{activity.progress}%</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress" style={{ width: `${activity.progress}%` }}></div>
                        </div>
                        <div className="current-progress">
                            <span>{activity.current}</span>
                            <span className="days-left">{activity.daysLeft} days left</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ActivityCards;
