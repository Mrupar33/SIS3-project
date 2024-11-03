const db = require('../db/dbConn');

// Fetch all users
const getAllUsers = async () => {
  try {
    const [results] = await db.query('SELECT * FROM users'); // No callbacks, only promises
    return results;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Add a new user
const addUser = async (username, password) => {
  try {
    const [result] = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]); // No callbacks
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { getAllUsers, addUser };
