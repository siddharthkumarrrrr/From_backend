require('dotenv').config();
const mongoose = require('mongoose');

const DB_CONN_STRING = process.env.DB_CONN_STRING;
if (!DB_CONN_STRING) {
    console.error('Error: Missing DB_CONN_STRING in environment variables');
    process.exit(1); // Exit the process with a failure code
}

// Connect to the MongoDB database
mongoose.connect(DB_CONN_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

const DB = mongoose.connection;

// Handle connection errors
DB.on('error', (error) => {
    console.error('Error connecting to the database:', error);
});

// Log successful connection
DB.once('open', () => {
    console.log('Connected to the database successfully');
});

// Export the connection object
module.exports = DB;
