import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- NEW

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
  const navigate = useNavigate(); // <-- NEW

  const filteredDoctors = doctorsList.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBook = (doctor) => {
    navigate(`/schedule/${doctor.id}`); // <-- Redirect to SchedulePage
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
  }
};

export default ConsultPage;
