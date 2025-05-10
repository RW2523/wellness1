from flask import Flask, request, jsonify
import joblib
import pandas as pd
import logging
logging.basicConfig(level=logging.INFO)

app = Flask(__name__)

# Load model and encoders
model = joblib.load("rf_model.pkl")
le_dict = joblib.load("label_encoders.pkl")

# Allowed values
allowed_values = {
    'Gender': ['Male', 'Female'],
    'Occupation': ['Software Engineer', 'Doctor', 'Sales Representative', 'Teacher', 'Scientist'],
    'BMI Category': ['Overweight', 'Normal', 'Obese'],
    'Blood Pressure': ['126/83', '125/80', '140/90', '131/86']
}

# Default input structure
default_input = {
    'Gender': 'Male',
    'Age': 28,
    'Occupation': 'Sales Representative',
    'Sleep Duration': 5.9,
    'Quality of Sleep': 4,
    'Physical Activity Level': 30,
    'Stress Level': 8,
    'BMI Category': 'Normal',
    'Blood Pressure': '128/83',
    'Heart Rate': 85,
    'Daily Steps': 2000
}

# Fields that must be set
ordered_fields = [
    'Gender', 'Occupation', 'BMI Category', 'Blood Pressure',
    'Age', 'Sleep Duration', 'Quality of Sleep', 'Physical Activity Level'
]

@app.route("/predict", methods=["POST", "GET"])
def predict():
    try:
        
        user_data = request.get_json()
        print(f"Prediction: {user_data}")
        if not user_data:
            return jsonify({"error": "No input data provided"}), 400

        # Convert features list to named dict if necessary
        if 'features' in user_data:
            features = user_data['features']
            if len(features) != len(ordered_fields):
                return jsonify({
                    "error": f"Expected {len(ordered_fields)} features, got {len(features)}"
                }), 400
            for i, field in enumerate(ordered_fields):
                user_data[field] = features[i]

        # Construct full input dictionary using user-provided values or defaults
        full_input = {}
        for field in default_input:
            if field in user_data:
                full_input[field] = user_data[field]
            else:
                full_input[field] = default_input[field]

        # Build DataFrame
        df_input = pd.DataFrame([full_input])

        # Validate and encode categorical features
        for col in allowed_values:
            val = df_input[col][0]
            if val not in allowed_values[col]:
                return jsonify({
                    "error": f"Invalid value for {col}: '{val}'. Allowed: {allowed_values[col]}"
                }), 400
            df_input[col] = le_dict[col].transform([val])

        # Predict
        prediction = model.predict(df_input)

        logging.info(f"Prediction: {prediction}")

        # Decode using label encoder
        decoded = le_dict['Sleep Disorder'].inverse_transform(prediction)

        logging.info(f"Prediction: {decoded}")

        # Replace NaN with a safe string
        safe_result = [
            "Unknown" if (isinstance(p, float) and pd.isna(p)) else str(p)
            for p in decoded
        ]

        return jsonify({"prediction": safe_result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5002)
