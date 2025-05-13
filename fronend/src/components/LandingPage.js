// import React from "react";
// import "./LandingPage.css";

// const LandingPage = ({ onStart }) => {
//   return (
//     <div className="landing-page">
//       <div className="center-content">
//         <h1 className="title">CALM STUDIO</h1>
//         <p className="subtitle">Breathe. Relax. Renew.</p>
//         <button className="start-button" onClick={onStart}>
//           Let’s Begin
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;

import StarBackground from './StarBackground';
import React from "react";
import "./styles/LandingPage.css"; // Adjust the path as needed

const LandingPage = ({ onStart }) => {
  return (
    <>
    <StarBackground />
    <div className="landing-page">
      <div className="center-content">
        <h1 className="title">CALM STUDIO</h1>
        <p className="subtitle">Breathe. Relax. Renew.</p>
        <button className="start-button" onClick={onStart}>
          Let’s Begin
        </button>
      </div>
    </div>
  </>
  );
};

export default LandingPage;

