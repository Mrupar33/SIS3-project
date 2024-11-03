const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || 5000;

// Import local files
const users = require('./routes/users');

// Configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  methods: ["GET", "POST",],
}));

// Serve static files from the React app (update the path to point to the client build folder)
app.use(express.static(path.join(__dirname, '../client/build')));

// Route to serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Catch all other requests and return index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Actual routes
app.use('/users', users);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the express server
app.listen(port, () => console.log(`Server listening on port ${port}!`));
