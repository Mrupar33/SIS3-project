// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
} from "react-router-dom";
import HomeView from "./CustomComponents/HomeView";
import LogInView from "./CustomComponents/LogInView";
import SignUpView from "./CustomComponents/SignUpView";


function App() {
    const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
            {/*Implementing Routes for respective Path */}
            <Routes>
                <Route path="*" element={<HomeView />} />
                <Route path="/login" element={<LogInView />} />
                <Route path="/signup" element={<SignUpView />} />
            </Routes>
        </Router>
    );
}

export default App;