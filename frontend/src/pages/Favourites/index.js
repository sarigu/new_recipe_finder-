import React, { useState, useEffect } from 'react';
import "./style.css";
import Navbar from '../../components/Navbar/index';
import RecipeFavouriteCard from '../../components/RecipeFavouriteCard/index';
import RecipeModal from "../../components/RecipeModal";

function FavouritesPage() {

    const [recipes, setRecipes] = useState([]);
    const [modalShows, setModalShows] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        let storedFavouriteRecipes = JSON.parse(localStorage.getItem("favouriteRecipes"));
        if (storedFavouriteRecipes) {
            setRecipes(storedFavouriteRecipes);
        }
    }

    return (
        <div className="subpage">
            <Navbar></Navbar>
            <div >
                <h1>Favourites</h1>
                <p>You can save your 10 favourite recipes. This list is temporary.</p>
                <div className="favourites-container">
                    {recipes && recipes.map((recipe, index) =>
                        <RecipeFavouriteCard
                            key={index}
                            recipe={recipe}
                            onFavouriteCardClick={() => { setSelectedRecipe(recipe); setModalShows(true); }}
                        >
                        </RecipeFavouriteCard>
                    )}
                </div>
            </div>
            <RecipeModal
                recipe={selectedRecipe}
                modalShows={modalShows}
                handleClose={() => { setModalShows(false); fetchData(); }}
            />
        </div>
    );

}

export default FavouritesPage;
