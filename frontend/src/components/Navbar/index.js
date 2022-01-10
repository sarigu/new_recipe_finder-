import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Navbar() {
    return (
        <div className="navbar">
            <Link to="/"> <h2>R<span className="dot"></span></h2></Link>
            <div>
                <Link to="/add/recipe"> <span style={{ marginRight: "25px" }}>Add</span></Link>
                <Link to="/favourites"> <span>Your 10 Favourites</span></Link>
            </div>
        </div>
    );
}

export default Navbar;
