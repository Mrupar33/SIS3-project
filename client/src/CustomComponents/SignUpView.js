import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './SignUpLogInView.css';

/**
 * The SignUpView component provides a form for users to sign up.
 *
 * @function SignUpView
 * @returns JSX.Element
 */
const SignUpView = (props) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
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
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post('/users', {
                username: formData.username,
                password: formData.password
            });
            if (response.status === 201) {
                navigate('/login');
            }
        } catch (error) {
            console.error("There was an error signing up!", error);
        }
    };

    return (
        <div className="SL-container">
            <div className="SL-card">
                <div className="card-body">
                    <h1 className="card-title">Sign Up</h1>
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
                        <div className="form-group">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirm-password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                    </form>
                    <p className="card-text">Already have an account? <Link to="/login">Log in</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUpView;
