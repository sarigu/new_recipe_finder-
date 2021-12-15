import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function LandingPage() {
    return (
        <div className="landgin-page">
            <div>
                <h1>Recipe Finder</h1>
                <div className="options">
                    <Link to="/meals"> Meals</Link>
                    <Link to="/sweets"> Sweets</Link>
                </div>
            </div>
        </div>
    );

}

export default LandingPage;
