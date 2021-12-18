import React, { useState, useEffect } from 'react';
import Carousel, { CarouselItem } from "../../components/Carousel";
import RecipeModal from "../../components/RecipeModal";
import "./style.css";

function MealsPage() {

    const [recipes, setRecipes] = useState([]);
    const [modalShows, setModalShows] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState();
    const [pageIndex, setPageIndex] = useState(1);
    const [wasLast, setWasLast] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8000/meals/recipes?page=${pageIndex}`)
            .then((res) => res.json())
            .then((data) => {
                setRecipes(data);
                setPageIndex(pageIndex + 1)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleRecipeSelect = (recipeId) => {
        let recipe = recipes.find(recipe => recipe._id === recipeId);
        setSelectedRecipe(recipe)
        setModalShows(true);
    }

    const getNewRecipes = () => {
        fetch(`http://localhost:8000/meals/recipes?page=${pageIndex}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.length > 0) {
                    setRecipes([...recipes.concat(data)])
                    setPageIndex(pageIndex + 1);
                } else {
                    setWasLast(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <div className="landgin-page">
                <div>
                    <h1>Meals</h1>
                    <Carousel
                        onEnd={getNewRecipes}
                        wasLast={wasLast}
                    >
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
                                            {recipe.emojiUnicodes.map((emoji, index) => <span key={index}> {String.fromCodePoint(parseInt(emoji))}</span>)}
                                        </>
                                        : <span>&#x1F348;</span>
                                    }

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

export default MealsPage;
