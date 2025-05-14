import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "./DatePicker";
import TimeSlotSelector from "./TimeSlotSelector";
import "./scheduling.css";

const SchedulePage = () => {
  const { consultantId } = useParams();
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    if (consultantId && selectedDate) {
      fetch(`/api/consultants/${consultantId}/availability?date=${selectedDate}`)
        .then((res) => res.json())
        .then((data) => setAvailableSlots(data.slots))
        .catch((err) => console.error("Failed to fetch slots:", err));
    }
  }, [consultantId, selectedDate]);

  const handleBooking = () => {
    if (!selectedTime || !selectedDate) return;

    fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        consultantId,
        date: selectedDate,
        time: selectedTime,
      }),
    })
      .then((res) => {
        if (res.ok) alert("Booking confirmed!");
        else throw new Error("Booking failed.");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="schedule-page">
      <h2>Book a Session with Consultant #{consultantId}</h2>
      <DatePicker onDateSelect={setSelectedDate} />
      {selectedDate && (
        <TimeSlotSelector
          slots={availableSlots}
          selectedTime={selectedTime}
          onTimeSelect={setSelectedTime}
        />
      )}
      <button onClick={handleBooking} disabled={!selectedTime}>
        Confirm Booking
      </button>
    </div>
  );
};

export default SchedulePage;
