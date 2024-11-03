import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './SignUpLogInView.css';

/**
 * The LogInView component provides a form for users to log in.
 *
 * @function LogInView
 * @returns JSX.Element
 */
const LogInView = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                username: formData.username,
                password: formData.password
            });
            if (response.status === 200) {
                navigate('/dashboard'); // Navigate to the dashboard or another page after successful login
            }
        } catch (error) {
            console.error("There was an error logging in!", error);
        }
    };

    return (
        <div className="SL-container">
            <div className="SL-card">
                <div className="card-body">
                    <h1 className="card-title">Log In</h1>
                    <form className='SL-form' onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Log In</button>
                    </form>
                    <p className="card-text">Don't have an account? <Link to="/signup">Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LogInView;
