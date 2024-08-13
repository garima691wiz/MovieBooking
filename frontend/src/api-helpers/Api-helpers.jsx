import axios from 'axios';

// Set up the base URL for axios
axios.defaults.baseURL = 'http://localhost:8080';

// Function to create a new booking
export const newBooking = async (data) => {
  try {
    // Sending a POST request to create a new booking
    const response = await axios.post('/bookings/', {
      movie: data.movie,
      slot: data.slot,
      seats: data.seats,
    });

    // Return the response data if the request is successful
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Error creating booking:', error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Error creating booking: No response received');
    } else {
      // Something else went wrong
      console.error('Error creating booking:', error.message);
    }
    // Return a specific error message or null
    return { error: 'Failed to create booking' };
  }
};

// Function to fetch details of the last booking
export const lastBookingDetails = async () => {
  try {
    // Sending a GET request to fetch the last booking details
    const response = await axios.get('/api/booking');

    // Return the response data if the request is successful
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Error fetching last booking details:', error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Error fetching last booking details: No response received');
    } else {
      // Something else went wrong
      console.error('Error fetching last booking details:', error.message);
    }
    // Return a specific error message or null
    return { error: 'Failed to fetch last booking details' };
  }
};
