const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/members', require('./routes/memberRoutes'));
//app.use('/api/trainers', require('./routes/trainerRoutes'));

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});