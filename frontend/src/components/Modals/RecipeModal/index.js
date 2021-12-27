import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../style.css";

function RecipeModal({ recipe, modalShows, handleClose }) {
    const [isFavouriteRecipe, setIsFavouriteRecipe] = useState(false);
    const [favouritesLimitReached, setFavouritesLimitReached] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const navigate = useNavigate();

    const FAVORUTIE_LIMIT = 10;

    useEffect(() => {
        if (recipe) {
            let storedFavouriteRecipes = JSON.parse(localStorage.getItem("favouriteRecipes"));
            if (storedFavouriteRecipes) {
                let recipeExists = storedFavouriteRecipes.find(elem => elem._id === recipe._id);
                if (recipeExists) {
                    setIsFavouriteRecipe(true);
                }
            }
        }
    }, [recipe]);

    const handleAddToFavourites = () => {
        let storedFavouriteRecipes = JSON.parse(localStorage.getItem("favouriteRecipes"));
        let favouriteRecipes = [];
        if (storedFavouriteRecipes && storedFavouriteRecipes.length > 0 && storedFavouriteRecipes.length < FAVORUTIE_LIMIT) {
            let recipeExists = storedFavouriteRecipes.find(elem => elem._id === recipe._id);
            if (!recipeExists) {
                storedFavouriteRecipes.push(recipe);
                localStorage.setItem("favouriteRecipes", JSON.stringify(storedFavouriteRecipes));
                setIsFavouriteRecipe(true);
            }
        } else if (storedFavouriteRecipes && storedFavouriteRecipes.length >= FAVORUTIE_LIMIT) {
            setFavouritesLimitReached(true);
            setShowNotification(true);
        } else {
            favouriteRecipes.push(recipe)
            localStorage.setItem("favouriteRecipes", JSON.stringify(favouriteRecipes));
            setIsFavouriteRecipe(true);
        }
    }

    const handleRemoveFromFavourites = () => {
        let storedFavouriteRecipes = JSON.parse(localStorage.getItem("favouriteRecipes"));
        let recipeIndex = storedFavouriteRecipes.findIndex(elem => elem._id === recipe._id);
        storedFavouriteRecipes.splice(recipeIndex, 1);
        localStorage.setItem("favouriteRecipes", JSON.stringify(storedFavouriteRecipes));
        setIsFavouriteRecipe(false);

    }

    return (
        <div className={modalShows ? "modal-container" : "modal-container hide"} >
            <div className="modal-content">
                <span className="close" onClick={() => { setIsFavouriteRecipe(false); handleClose(); }}>&times;</span>
                {recipe ?
                    <>
                        <div className="modal-heading">
                            <h1>{recipe.title}</h1>
                            {isFavouriteRecipe ?
                                <div className="filled-heart" onClick={handleRemoveFromFavourites} ></div> :
                                <div className="heart" onClick={handleAddToFavourites} > </div>
                            }
                        </div>
                        <div className="recipe-details">
                            <span>Prep: {recipe.prepTime}min </span>
                            <span>Cooking: {recipe.cookingTime}min</span>
                            <span>Serving: {recipe.serving} people</span>
                        </div>
                        <div className="diet-type">
                            {recipe.vegan ? <span>Vegan</span> : null}
                            {recipe.vegetarian ? <span>Vegetarian</span> : null}

                        </div>
                        <div className="emojis">
                            <div>
                                {recipe.emojiUnicodes && recipe.emojiUnicodes.length > 0 ?
                                    <>
                                        {recipe.emojiUnicodes.map((emoji) =>
                                            <span> {String.fromCodePoint(parseInt(emoji))}</span>
                                        )}
                                    </>
                                    : <span>&#x1F348;</span>
                                }
                            </div>
                        </div>
                        <p className="recipe-description">{recipe.description}</p>
                        <h3>Ingredients</h3>
                        <ul>
                            {recipe.ingredients && recipe.ingredients.map((ingredient) =>
                                <li><span>{ingredient.quantity}</span> <span>{ingredient.ingredient}</span></li>
                            )}
                        </ul>
                    </>
                    : <div>Loads</div>
                }
            </div>
            {favouritesLimitReached && showNotification ?
                <div className="notification">
                    <div className="notification-content">
                        <p>You can only have 10 favourites. Please remove some</p>
                        <button
                            style={{ margin: "0 auto 20px auto" }}
                            onClick={() => setShowNotification(false)}
                        >
                            Ok
                        </button>
                        <button
                            style={{ margin: "auto" }}
                            onClick={() => navigate("/favourites")}
                        >
                            Update your favourites
                        </button>
                    </div>
                </div>
                :
                null
            }
        </div>
    );

}

export default RecipeModal;
