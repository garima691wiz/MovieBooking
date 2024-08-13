import React, { useEffect, useState } from 'react';
import { lastBookingDetails } from '../api-helpers/Api-helpers'; // Adjust the import path as needed

const MyBookings = () => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLastBooking = async () => {
      try {
        const data = await lastBookingDetails();
        if (data && !data.error) {
          setBooking(data); // Set booking data if no error
        } else {
          setError(data ? data.error : 'Error fetching data');
        }
      } catch (err) {
        setError('Error fetching data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLastBooking();
  }, []);

  if (loading) {
    return <p className="text-lg text-center text-gray-700">Loading...</p>;
  }

  if (error) {
    return <p className="text-lg text-center text-red-600">Error: {error}</p>;
  }

  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-500">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full sm:w-72 h-full overflow-hidden">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-3 underline">
          My Bookings
        </h1>
        {booking && (booking.movie || booking.slot || Object.keys(booking.seats || {}).length) ? (
          <div className="space-y-1">
            <div className="flex gap-2">
              <p className="text-lg font-semibold text-gray-800">Movie:</p>
              <p className="text-lg text-gray-700 underline font-semibold">
                {booking.movie || 'N/A'}
              </p>
            </div>
            <div className="flex gap-5">
              <p className="text-lg font-semibold text-gray-800">Slot:</p>
              <p className="text-lg underline text-gray-700 font-semibold">
                {booking.slot || 'N/A'}
              </p>
            </div>
            <div className="flex justify-between gap-2">
              <p className="text-lg font-semibold text-gray-800">Seats:</p>
              <ul className="flex flex-wrap gap-4">
                {Object.entries(booking.seats || {}).map(([seatName, count]) => (
                  <li
                    key={seatName}
                    className={`text-lg text-gray-700 ${
                      count > 0 ? 'underline font-semibold' : ''
                    }`}
                  >
                    {seatName}: {count || '0'}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-lg text-center text-gray-700">
            <p>No booking found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
