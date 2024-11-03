// import dependencies and initialize the express app
const express = require('express');
require('dotenv').config();
const app = express();
const cors = require("cors");
const path = require('path');
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const connectDB = require('./db/dbConn.js'); // Import the database connection

// import local files
const users = require('./routes/users');

// Connect to the database
let dbConnection;
connectDB().then(connection => {
    dbConnection = connection;
}).catch(err => {
    console.error('Failed to connect to the database:', err);
    process.exit(1);
});

// configurations
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  methods: ["GET", "POST"],
}));
app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Use the users route
app.use('/api/users', users);

// actual routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/api", (req, res) => {
  res.json({ "users": ["userOne", "userTwo", "userThree"] });
});

app.post('/api/signup', async (req, res) => {
    const { username, password } = req.body;
    // Handle user signup logic here, e.g., save to database
    try {
        const [rows] = await dbConnection.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});