import axios from "axios";

// Set up the base URL for axios (could be done globally for all requests)
axios.defaults.baseURL = 'https://moviebooking-backend-rqa1.onrender.com';

export const newBooking = async (data) => {
  try {
    // Sending a POST request to create a new booking
    const res = await axios.post("/bookings/", {
      movie: data.movie, // Movie selected by the user
      slot: data.slot,   // Time slot selected by the user
      seats: data.seats, // Seats selected by the user
    });

    // Return the response data if the request is successful
    return res.data;
  } catch (err) {
    console.error("Error creating booking:", err);
    return null; // or return a specific error message
  }
};

// Function to fetch details of the last booking
export const lastBookingDetails = async () => {
  try {
    // Sending a GET request to fetch the last booking details
    const res = await axios.get("/bookings/lastbooking");

    // Return the response data if the request is successful
    return res.data;
  } catch (err) {
    console.error("Error fetching last booking details:", err);
    return null; // or return a specific error message
  }
};
