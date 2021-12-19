import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Navbar() {
    return (
        <div className="navbar">
            <Link to="/"> <h2>R.</h2></Link>
            <Link to="/favourites"> <span>Your 10 Favourites</span></Link>
        </div>
    );

}

export default Navbar;
