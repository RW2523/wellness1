import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faRefresh, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const quotes = [
    { text: "A 30-minute walk a day keeps the doctor away.", type: "Exercise" },
    { text: "Eat more greens, your body will thank you.", type: "Healthy Food" },
    { text: "Hydration is the key to glowing skin.", type: "Wellness" },
    { text: "Sleep is the best meditation. – Dalai Lama", type: "Rest" },
    { text: "Stretching daily improves posture and reduces stress.", type: "Flexibility" },
    { text: "You are what you eat. Choose wisely.", type: "Nutrition" },
    { text: "Start your day with movement – it sparks productivity.", type: "Routine" },
    { text: "Taking deep breaths helps reduce anxiety.", type: "Mindfulness" },
    { text: "Strong body, strong mind.", type: "Fitness" },
    { text: "Skip sugar today — feel better tomorrow.", type: "Healthy Choice" },
    { text: "A calm mind brings inner strength and self-confidence.", type: "Mental Health" },
    { text: "Rest and recovery are just as important as training.", type: "Recovery" },
    { text: "Sunlight and fresh air are underrated medicines.", type: "Natural Wellness" },
    { text: "Your health is an investment, not an expense.", type: "Motivation" },
    { text: "Sweat is just your fat crying.", type: "Humor" },
    { text: "Eat to fuel your body, not to feed your emotions.", type: "Mindful Eating" },
    { text: "Discipline is choosing what you want most over what you want now.", type: "Discipline" },
    { text: "Laughter is the best medicine — and it’s free.", type: "Joy" },
    { text: "Progress, not perfection.", type: "Growth" },
    { text: "Make time for yourself. You’re worth it.", type: "Self-Care" }
  ];

const WellnessQuotes = () => {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        let interval;
        if (!isPaused) {
            interval = setInterval(() => {
                setIndex(prev => (prev + 1) % quotes.length);
            }, 5000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isPaused]);

    const handlePausePlay = () => {
        setIsPaused(!isPaused);
    };

    const handleRefresh = () => {
        setIndex(Math.floor(Math.random() * quotes.length));
    };

    const handleMealLog = (e) => {
        e.preventDefault();
        navigate('/meal');
    };

    return (
        <div>
            <style>
                {`
                .container {
                    max-width: 400px;
                    margin: 0 auto;
                    font-family: 'Segoe UI', sans-serif;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .section {
                    height: 200px;
                    background: #ffffff;
                    border-radius: 15px;
                    padding: 1rem;
                    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .quote-text {
                    font-size: 1rem;
                    color: #333;
                    margin-bottom: 0.5rem;
                    text-align: center;
                }

                .quote-type {
                    font-size: 0.75rem;
                    color: #00bfa5;
                    font-weight: bold;
                    text-transform: uppercase;
                }

                .icon-container {
                    margin-top: 1rem;
                }

                .icon-button {
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 5px;
                    font-size: 18px;
                    margin: 0 5px;
                    color: #00bfa5;
                }

                .icon-button:hover {
                    color: #008f77;
                }

                .chart-circle {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    background: conic-gradient(
                        #00bfa5 0% 25%, 
                        #ffa726 25% 55%, 
                        #29b6f6 55% 80%, 
                        #ab47bc 80% 100%
                    );
                    position: relative;
                    margin-bottom: 1rem;
                }

                .chart-center {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 50px;
                    height: 50px;
                    background: white;
                    border-radius: 50%;
                }

                .progress-details {
                    list-style: none;
                    padding: 0;
                    font-size: 0.75rem;
                }

                .dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    display: inline-block;
                    margin-right: 5px;
                }

                .cardio-dot { background-color: #00bfa5; }
                .stretching-dot { background-color: #ffa726; }
                .treadmill-dot { background-color: #29b6f6; }
                .strength-dot { background-color: #ab47bc; }

                .meal-log-button {
                    background-color: #00bfa5;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    font-size: 1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .meal-log-button:hover {
                    background-color: #008f77;
                }
                `}
            </style>

            <div className="container">

                {/* Quote Section */}
                <div className="section" style={{ background: 'linear-gradient(to right, #e0f7fa, #ffffff)' }}>
                    <p className="quote-text">"{quotes[index].text}"</p>
                    <span className="quote-type">{quotes[index].type}</span>
                    <div className="icon-container">
                        <button className="icon-button" onClick={handlePausePlay}>
                            <FontAwesomeIcon icon={isPaused ? faPlay : faPause} />
                        </button>
                        <button className="icon-button" onClick={handleRefresh}>
                            <FontAwesomeIcon icon={faRefresh} />
                        </button>
                    </div>
                </div>

                {/* Fitness Progress Section
                <div className="section" style={{ background: '#ecfdf5' }}>
                    <div className="chart-circle">
                        <div className="chart-center"></div>
                    </div>
                    <ul className="progress-details">
                        <li><span className="dot cardio-dot"></span>Cardio | 30 hrs</li>
                        <li><span className="dot stretching-dot"></span>Stretching | 40 hrs</li>
                        <li><span className="dot treadmill-dot"></span>Treadmill | 30 hrs</li>
                        <li><span className="dot strength-dot"></span>Strength | 20 hrs</li>
                    </ul>
                </div> */}

                <div className="section" style={{ background: '#ecfdf5', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '2rem' }}>
                    <div className="chart-circle">
                        <div className="chart-center"></div>
                    </div>
                    <ul className="progress-details">
                        <li><span className="dot cardio-dot"></span>Cardio | 30 hrs</li>
                        <li><span className="dot stretching-dot"></span>Stretching | 40 hrs</li>
                        <li><span className="dot treadmill-dot"></span>Treadmill | 30 hrs</li>
                        <li><span className="dot strength-dot"></span>Strength | 20 hrs</li>
                    </ul>
                </div>

                {/* Meal Logger Section */}
                <div className="section" style={{ background: '#ecfdf5' }}>
                    <h3>Meal Logger</h3>
                    <p>Track your daily meals for a healthier lifestyle.</p>
                    <button className="meal-log-button" onClick={handleMealLog}>
                        <FontAwesomeIcon icon={faUtensils} />
                        Log a Meal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WellnessQuotes;
