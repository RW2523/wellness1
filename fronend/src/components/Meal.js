import React, { useState } from "react";
import axios from "axios";

function Meal() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [mealType, setMealType] = useState("Breakfast");
  const [quantity, setQuantity] = useState(100);
  const [predictions, setPredictions] = useState([]);
  const [manualFoodName, setManualFoodName] = useState("");
  const [mode, setMode] = useState("image");

  // ADD THIS
  const [logs, setLogs] = useState([]);
  const [logsFetched, setLogsFetched] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const classifyImage = async () => {
    const formData = new FormData();
    formData.append("image", image);

    const res = await axios.post("http://localhost:8080/api/auth/food", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const sortedPredictions = Object.entries(res.data)
      .map(([label, score]) => ({ label, score: parseFloat(score) }))
      .sort((a, b) => b.score - a.score);  // Descending sort

    setPredictions(sortedPredictions);
  };

  const saveData = async (e) => {
    const id = localStorage.getItem('id');
    const data = {
      foodName: mode === "manual" ? manualFoodName : predictions[0]?.label,
      quantityInGrams: quantity,
      mealType,
      mealTime: new Date().toISOString(),
      user_id: id
    };

    if (!data.foodName) {
      return;
    }
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/meals", data, {
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // ADD THIS: View logs function
  const viewLogs = async () => {
    const id = localStorage.getItem("id");

    try {
      const res = await axios.post("http://localhost:8080/api/auth/mealslog", JSON.stringify(id), {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.mealLogs) {
        const parsedLogs = Array.isArray(res.data.mealLogs)
          ? res.data.mealLogs
          : res.data.mealLogs.split(",").map(item => item.trim());

        setLogs(parsedLogs);
      } else {
        setLogs([]);
      }
    } catch (err) {
      console.error("Failed to fetch meal logs:", err);
      setLogs([]);
    } finally {
      setLogsFetched(true);
    }
  };

  return (
    <div className="meal-container">
      <style dangerouslySetInnerHTML={{
        __html: `
          .meal-container {
            max-width: 500px;
            margin: 40px auto;
            padding: 25px;
            background-color: #f9f9f9;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            font-family: Arial, sans-serif;
          }
          h2 {
            text-align: center;
            color: #2c3e50;
            margin-bottom: 20px;
          }
          .mode-switch {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-bottom: 15px;
          }
          .image-section {
            margin-bottom: 20px;
          }
          .image-preview {
            display: block;
            max-width: 100%;
            margin: 10px auto;
            border-radius: 8px;
          }
          .form-group {
            margin-bottom: 15px;
          }
          label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
          }
          input[type="text"],
          input[type="number"],
          select {
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
            margin-bottom: 5px;
            border: 1px solid #ccc;
            border-radius: 6px;
          }
          .input {
            margin-top: 10px;
            padding: 8px;
            width: 100%;
            box-sizing: border-box;
          }
          .primary-button,
          .save-button,
          .view-button {
            width: 100%;
            padding: 10px;
            background-color: #3498db;
            border: none;
            color: white;
            font-size: 16px;
            border-radius: 6px;
            cursor: pointer;
            margin-top: 10px;
          }
          .primary-button:hover,
          .save-button:hover,
          .view-button:hover {
            background-color: #2980b9;
          }
          .prediction-box {
            background: #eef5fa;
            padding: 10px;
            border-radius: 6px;
            margin-top: 10px;
          }
          .prediction-box ul {
            padding-left: 20px;
          }
          .logs-section {
            margin-top: 20px;
            background: #e8f5e9;
            padding: 10px;
            border-radius: 8px;
          }
          .logs-section ul {
            padding-left: 20px;
          }
        `,
      }} />

      <h2>🍽️ Wellness Meal Logger</h2>

      <div className="mode-switch">
        <label>
          <input
            type="radio"
            value="image"
            checked={mode === "image"}
            onChange={() => setMode("image")}
          />
          Image Upload
        </label>
        <label>
          <input
            type="radio"
            value="manual"
            checked={mode === "manual"}
            onChange={() => setMode("manual")}
          />
          Manual Entry
        </label>
      </div>

      {mode === "image" ? (
        <div className="image-section">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {preview && <img src={preview} alt="Preview" className="image-preview" />}
          <button className="primary-button" onClick={classifyImage} disabled={!image}>Classify</button>
        </div>
      ) : (
        <input
          type="text"
          value={manualFoodName}
          onChange={(e) => setManualFoodName(e.target.value)}
          placeholder="Enter food name"
          className="input"
        />
      )}

      <div className="form-group">
        <label>Meal Type:</label>
        <select onChange={(e) => setMealType(e.target.value)} value={mealType}>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
        </select>
      </div>

      <div className="form-group">
        <label>Quantity (grams):</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          min="100"
          max="500"
          className="input"
        />
      </div>

      {predictions.length > 0 && mode === "image" && (
        <div className="prediction-box">
          <h4>Top Predictions:</h4>
          <ul>
            {predictions.map(p => (
              <li key={p.label}>{p.label} - {(p.score * 100).toFixed(1)}%</li>
            ))}
          </ul>
        </div>
      )}

      <button
        className="save-button"
        onClick={saveData}
        disabled={mode === "image" && predictions.length === 0 && !manualFoodName}
      >
        Save Meal
      </button>

      {/* ADD THIS: View Logs Section */}
      <button className="view-button" onClick={viewLogs}>View Previous Logs</button>

      {logsFetched && (
        <div className="logs-section">
          <h4>Previous Logs:</h4>
          {logs.length > 0 ? (
            <ul>
              {logs.map((log, idx) => (
                <div key={idx} style={{ border: "1px solid #ccc", padding: "8px", borderRadius: "6px", marginBottom: "6px" }}>
                  <p><strong>Food:</strong> {log.foodName}</p>
                  <p><strong>Meal Type:</strong> {log.mealType}</p>
                  <p><strong>Quantity:</strong> {log.quantityInGrams} g</p>
                  <p><strong>Time:</strong> {log.mealTime}</p>
                </div>
              ))}
            </ul>
          ) : (
            <p>No logs found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Meal;