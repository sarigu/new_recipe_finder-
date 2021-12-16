import React, { useState, useEffect } from 'react';
import Carousel, { CarouselItem } from "../../components/Carousel";
import RecipeModal from "../../components/RecipeModal";
import "./style.css";

function SweetsPage() {

    const [recipes, setRecipes] = useState([]);
    const [modalShows, setModalShows] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState();

    useEffect(() => {
        fetch('http://localhost:8000/sweets/recipes')
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
                    <h1>Sweets</h1>
                    <Carousel>
                        {recipes && recipes.map((recipe, index) =>
                            <CarouselItem key={index}>
                                <div className="recipe-box" onClick={() => handleRecipeSelect(recipe._id)}>
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
                                    <p>{recipe.description}</p>
                                    <h4>Ingredients</h4>
                                    <div>
                                        {recipe.ingredients && recipe.ingredients.map((ingredient, index) => <><span key={index}>{ingredient.quantity}</span> <span>{ingredient.ingredient}</span><br /></>)}
                                    </div>
                                </div>
                            </CarouselItem>
                        )}
                    </Carousel>
                </div>
            </div>
            <RecipeModal
                recipe={selectedRecipe}
                modalShows={modalShows}
                handleClose={() => setModalShows(false)}
            />
        </>
    );

}

export default SweetsPage;
