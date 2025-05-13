import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { psychQuestions } from "./psychQuestions";
import "./styles/PsychModule.css";
import StarBackground from './StarBackground';

const PsychModule = () => {
  const [step, setStep] = useState(-1); // -1 = intro
  const [responses, setResponses] = useState([]);
  const navigate = useNavigate();

  const currentQuestion = psychQuestions[step];

  const handleAnswer = (value) => {
    setResponses([...responses, value]);
    setStep(step + 1);
  };

  const restart = () => {
    setStep(-1);
    setResponses([]);
  };

  const getSummary = () => {
    const total = responses.reduce((a, b) => a + b, 0);
    const average = total / responses.length;

    if (average >= 8) return "🟢 You seem calm and focused.";
    if (average >= 5) return "🟡 You're doing okay, but there may be some stress.";
    return "🔴 High stress or fatigue detected. Consider taking a mindful break.";
  };

  return (
    <>
    <StarBackground />
    <div className="psych-container">
      {step === -1 && (
        <div className="intro">
          <h2>Psychological Assessment</h2>
          <p>We'll ask you 10 short questions to understand how you're feeling today.</p>
          <button className="action-btn" onClick={() => setStep(0)}>Start Assessment</button>
        </div>
      )}

      {step >= 0 && step < psychQuestions.length && (
        <div className="question-block">
          <h3>Question {step + 1} of {psychQuestions.length}</h3>
          <p className="question-text">{currentQuestion}</p>
          <div className="answer-scale">
            {[...Array(10)].map((_, i) => (
              <button key={i} className="big-answer" onClick={() => handleAnswer(i + 1)}>
                {i + 1}
              </button>
            ))}
          </div>
          <p className="scale-label">1 = Very Low, 10 = Very High</p>
        </div>
      )}

      {step === psychQuestions.length && (
        <div className="result-block">
          <h2>Assessment Complete</h2>
          <p>{getSummary()}</p>
          <div className="session-actions">
            <button className="action-btn" onClick={restart}>Retake Assessment</button>
            <button className="action-btn" onClick={() => navigate("/")}>Go to Home</button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default PsychModule;
