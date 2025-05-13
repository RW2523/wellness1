import React, { useState } from 'react';

const doctorsList = [
  {
    id: 1,
    name: 'Dr. Ananya Rao',
    specialization: 'Psychiatrist',
    hospital: 'MindCare Hospital',
    location: 'Chennai',
    contact: 'ananya@mindcare.com',
    available: 'Mon-Fri, 10am - 4pm',
    image: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 2,
    name: 'Dr. Karthik Menon',
    specialization: 'Nutritionist',
    hospital: 'Wellness Life Center',
    location: 'Bangalore',
    contact: 'karthik@wellness.com',
    available: 'Tue-Sat, 9am - 2pm',
    image: 'https://randomuser.me/api/portraits/men/65.jpg'
  },
  {
    id: 3,
    name: 'Dr. Priya Singh',
    specialization: 'General Physician',
    hospital: 'City Health Clinic',
    location: 'Hyderabad',
    contact: 'priya@cityhealth.com',
    available: 'Mon-Sat, 11am - 6pm',
    image: 'https://randomuser.me/api/portraits/women/68.jpg'
  }
];

function ConsultPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingMessage, setBookingMessage] = useState('');

  const filteredDoctors = doctorsList.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBook = (doctor) => {
    setSelectedDoctor(doctor);
    setBookingMessage('');
  };

  const confirmBooking = () => {
    setBookingMessage(`Appointment booked with ${selectedDoctor.name}. Confirmation will be sent to ${selectedDoctor.contact}.`);
    setSelectedDoctor(null);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>🏥 Book a Wellness Consultation</h2>

      <input
        type="text"
        placeholder="Search by doctor or specialization..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchBar}
      />

      <div style={styles.doctorGrid}>
        {filteredDoctors.map((doc) => (
          <div key={doc.id} style={styles.card}>
            <img src={doc.image} alt={doc.name} style={styles.image} />
            <h3>{doc.name}</h3>
            <p><strong>{doc.specialization}</strong></p>
            <p>{doc.hospital} - {doc.location}</p>
            <p><small>{doc.available}</small></p>
            <button style={styles.bookButton} onClick={() => handleBook(doc)}>Book Appointment</button>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedDoctor && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Confirm Booking</h3>
            <p>Doctor: <strong>{selectedDoctor.name}</strong></p>
            <p>Specialization: {selectedDoctor.specialization}</p>
            <p>Hospital: {selectedDoctor.hospital}</p>
            <button onClick={confirmBooking} style={styles.confirmButton}>Confirm</button>
            <button onClick={() => setSelectedDoctor(null)} style={styles.cancelButton}>Cancel</button>
          </div>
        </div>
      )}

      {bookingMessage && (
        <div style={styles.successBox}>
          ✅ {bookingMessage}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    background: '#f8f9fa',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#2e7d32'
  },
  searchBar: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    marginBottom: '2rem',
    borderRadius: '8px',
    border: '1px solid #ccc'
  },
  doctorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '1.5rem'
  },
  card: {
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    padding: '1rem',
    textAlign: 'center'
  },
  image: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '1rem'
  },
  bookButton: {
    marginTop: '1rem',
    padding: '0.6rem 1.2rem',
    fontSize: '0.95rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modal: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    textAlign: 'center',
    width: '300px'
  },
  confirmButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '0.6rem 1rem',
    marginRight: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    padding: '0.6rem 1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  successBox: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#d4edda',
    color: '#155724',
    borderLeft: '5px solid #28a745'
  }
};

export default ConsultPage;
