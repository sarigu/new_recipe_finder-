import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Navbar() {
    return (
        <div className="navbar">
            <Link to="/"> <h2>R.</h2></Link>
        </div>
    );

}

export default Navbar;
