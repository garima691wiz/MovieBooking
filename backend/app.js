import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bookingRouter from "./routes/bookingRoutes.js";

dotenv.config();

const mongodbURI = process.env.MONGODBURI || "mongodb://127.0.0.1:27017/bookings";
const app = express();
const PORT = process.env.PORT || 8080;

let bookingData = {}; // In-memory store for demo purposes

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies

// Route to handle POST requests and log JSON data
app.post('/api/', (req, res) => {
    bookingData = req.body; // Store received data
    console.log('Received data:', req.body); // Log received JSON data
    res.json({ message: 'Seats Booked!' });
});

//http://localhost:8080/api/booking
// Route to fetch the last booking data
app.get('/api/booking', (req, res) => {
    res.json(bookingData); // Respond with the last booking data
});

// Root route
app.get("/", (req, res) => {
    res.send("Hello from the backend server!");
});

// Connect to MongoDB and start the server
mongoose.connect(mongodbURI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to MongoDB database and server is running on port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
    });
