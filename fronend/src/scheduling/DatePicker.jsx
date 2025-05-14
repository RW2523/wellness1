import React from "react";

const DatePicker = ({ onDateSelect }) => {
  const handleChange = (e) => {
    onDateSelect(e.target.value);
  };

  return (
    <div className="date-picker">
      <label>Select a date:</label>
      <input type="date" onChange={handleChange} />
    </div>
  );
};

export default DatePicker;
