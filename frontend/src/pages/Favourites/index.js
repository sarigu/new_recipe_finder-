import React, { useState, useEffect } from 'react';
import "./style.css";
import Navbar from '../../components/Navbar/index';

function LandingPage() {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        let storedFavouriteRecipes = JSON.parse(localStorage.getItem("favouriteRecipes"));
        if (storedFavouriteRecipes) {
            setRecipes(storedFavouriteRecipes);
        }
    }, []);

    return (
        <div className="landgin-page">
            <Navbar></Navbar>
            <div>
                <h1>Favourites</h1>
                <div>
                    {recipes && recipes.map((recipe, index) =>
                        <div key={index}>{recipe.title}</div>
                    )}
                </div>
            </div>
        </div>
    );

}

export default LandingPage;
