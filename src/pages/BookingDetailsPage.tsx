import React from 'react';
import { useParams } from 'react-router-dom';

const BookingDetailsPage: React.FC = () => {
  const { id } = useParams();
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Booking Details</h1>
      <p>Booking ID: {id}</p>
      <p>Booking details will be shown here.</p>
    </div>
  );
};

export default BookingDetailsPage; 