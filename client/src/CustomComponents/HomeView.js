import React from 'react';
import './HomeView.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";

/**
 * The HomeView component displays a welcome message with enhanced styling
 * and buttons to navigate to Login and Sign Up pages.
 *
 * @function HomeView
 * @param {Object} props - The properties passed to the component.
 * @returns JSX.Element
 */
const HomeView = (props) => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title">FAMNIT Zapiski App</h1>
                    <p className="card-text">Narejeni s pomočjo Oke Bizjak</p>
                    <div className="button-group">
                        <button onClick={() => navigate("/login")} className="btn btn-bordered">
                            Log In
                        </button>
                        <button onClick={() => navigate("/signup")} className="btn btn-bordered">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeView;
