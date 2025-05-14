import React from "react";

const TimeSlotSelector = ({ slots, selectedTime, onTimeSelect }) => {
  return (
    <div className="time-slot-selector">
      <h3>Available Time Slots</h3>
      <div className="slot-grid">
        {slots.length > 0 ? (
          slots.map((slot, idx) => (
            <button
              key={idx}
              className={slot === selectedTime ? "slot selected" : "slot"}
              onClick={() => onTimeSelect(slot)}
            >
              {slot}
            </button>
          ))
        ) : (
          <p>No time slots available for selected date.</p>
        )}
      </div>
    </div>
  );
};

export default TimeSlotSelector;
