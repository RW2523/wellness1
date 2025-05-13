import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { poses } from "./suryaData";
import "./styles/SuryaModule.css";
import StarBackground from './StarBackground';

const SuryaModule = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const nextPose = () => {
    if (currentStep < poses.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevPose = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => setCurrentStep(0);
  const handleGoHome = () => navigate("/");

  const isLastStep = currentStep === poses.length - 1;

  const { title, image, description } = poses[currentStep];

  return (
    <>
    <StarBackground />
    <div className="surya-container">
      <h2 className="surya-title">{title}</h2>
      <img src={image} alt={title} className="pose-image" />
      <p className="pose-description">{description}</p>

      <div className="surya-controls">
        <button onClick={prevPose} disabled={currentStep === 0}>
          Previous
        </button>
        {!isLastStep ? (
          <button onClick={nextPose}>Next</button>
        ) : (
          <>
            <button onClick={handleRestart}>Start Again</button>
            <button onClick={handleGoHome}>Home</button>
          </>
        )}
      </div>

      <div className="step-counter">
        Pose {currentStep + 1} of {poses.length}
      </div>
    </div>
    </>
  );
};

export default SuryaModule;
