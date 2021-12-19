import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Navbar from '../../components/Navbar/index';

function LandingPage() {
    return (
        <div className="landgin-page">
            <Navbar></Navbar>
            <div>
                <h1>Recipe Finder</h1>
                <div className="options">
                    <Link to="/meals"> Meals</Link>
                    <Link to="/sweets"> Sweets</Link>
                    <Link to="/add/recipe"> Add</Link>
                </div>
            </div>
        </div>
    );

}

export default LandingPage;
