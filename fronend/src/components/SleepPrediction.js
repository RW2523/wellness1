import React, { useState } from 'react';
import axios from 'axios';

const GENDERS = ['Male', 'Female'];
const OCCUPATIONS = ['Software Engineer', 'Doctor', 'Sales Representative', 'Teacher', 'Scientist'];
const BMI_CATEGORIES = ['Overweight', 'Normal', 'Obese'];
const BLOOD_PRESSURES = ['126/83', '125/80', '140/90', '131/86'];



function SleepPrediction() {
  const [form, setForm] = useState({
    Gender: '',
    Occupation: '',
    'BMI Category': '',
    'Blood Pressure': '',
    Age: '',
    'Sleep Duration': '',
    'Quality of Sleep': '',
    'Physical Activity Level': '',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const defaults = {
        Gender: 'Male',
        Occupation: 'Doctor',
        'BMI Category': 'Normal',
        'Blood Pressure': 'Normal',
        Age: 25,
        'Sleep Duration': 7,
        'Quality of Sleep': 3,
        'Physical Activity Level': 3
      };

      const featureOrder = [
        'Gender',
        'Occupation',
        'BMI Category',
        'Blood Pressure',
        'Age',
        'Sleep Duration',
        'Quality of Sleep',
        'Physical Activity Level'
      ];

      const payload = {
        features: featureOrder.map((key) => {
          const value = form[key] || defaults[key];
          return isNaN(Number(value)) ? value : Number(value);
        })
      };

      // Force value for demonstration if needed
      payload.features[3] = "140/90";

      const res = await axios.post('http://localhost:8080/api/auth/pred', { payload }, {
        headers: { "Content-Type": "application/json" }
      });

      setResult(res.data.prediction ?? JSON.stringify(res.data));
    } catch (err) {
      console.error(err);
      setResult("Prediction failed.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f4f7fa', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        width: '100%',
        maxWidth: '700px',
        animation: 'fadeIn 0.5s ease-in-out'
      }}>
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '1.5rem' }}>🛌 Sleep Disorder Prediction</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem 2rem',
          marginBottom: '1.5rem'
        }}>
          {[
            { label: 'Gender', options: GENDERS },
            { label: 'Occupation', options: OCCUPATIONS },
            { label: 'BMI Category', options: BMI_CATEGORIES },
            { label: 'Blood Pressure', options: BLOOD_PRESSURES }
          ].map(({ label, options }) => (
            <div key={label} style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ marginBottom: '0.4rem', fontWeight: '500', color: '#444' }}>{label}</label>
              <select
                onChange={(e) => handleChange(label, e.target.value)}
                value={form[label]}
                style={{
                  padding: '0.5rem',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  fontSize: '1rem'
                }}
              >
                <option value="">Select</option>
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          ))}

          {[
            'Age',
            'Sleep Duration',
            'Quality of Sleep',
            'Physical Activity Level'
          ].map((field) => (
            <div key={field} style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ marginBottom: '0.4rem', fontWeight: '500', color: '#444' }}>{field}</label>
              <input
                type="number"
                value={form[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                style={{
                  padding: '0.5rem',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  fontSize: '1rem'
                }}
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            fontSize: '1.1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background 0.3s ease'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#007bff'}
        >
          {loading ? 'Predicting...' : 'Submit'}
        </button>

        {result !== null && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: '#e6f2ff',
            borderLeft: '5px solid #007bff',
            fontSize: '1.1rem',
            color: '#003366'
          }}>
            <strong>Prediction (Encoded):</strong> {result}
          </div>
        )}

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
}

export default SleepPrediction;
