import React, { useState, useEffect } from 'react';
import Carousel, { CarouselItem } from "../../components/Carousel";
import Modal from "../../components/Modal";

import "./style.css";

function MealsPage() {

    const [recipes, setRecipes] = useState([]);
    const [modalShows, setModalShows] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState();


    useEffect(() => {
        fetch('http://localhost:8000/meals/recipes')
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setRecipes(data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleRecipeSelect = (recipeId) => {
        console.log("RECIPE ID", recipeId);
        let recipe = recipes.find(recipe => recipe._id === recipeId);
        console.log("SELECTED", recipe);
        setSelectedRecipe(recipe)
        setModalShows(true);
    }

    return (
        <>
            <div className="landgin-page">
                <div>
                    <h1>Meals</h1>
                    <Carousel>
                        {recipes && recipes.map((recipe) =>
                            <CarouselItem>
                                <div className="recipe-box" data-tag={recipe._id} onClick={() => handleRecipeSelect(recipe._id)}>
                                    <h2>{recipe.title}</h2>
                                    <span>Prep: {recipe.prepTime}min </span>
                                    <br></br>
                                    <span>Cooking: {recipe.cookingTime}min</span>
                                    <br></br>
                                    <span>Serving: {recipe.serving} people</span>
                                    <br></br>
                                    {recipe.emojiUnicodes && recipe.emojiUnicodes.length > 0 ?
                                        <>
                                            {recipe.emojiUnicodes.map((emoji) => <span> {String.fromCodePoint(parseInt(emoji))}</span>)}
                                        </>
                                        : <span>&#x1F348;</span>
                                    }

                                </div>
                            </CarouselItem>
                        )}
                    </Carousel>
                </div>
            </div>
            <Modal recipe={selectedRecipe} modalShows={modalShows} handleClose={() => setModalShows(false)} />
        </>
    );

}

export default MealsPage;
