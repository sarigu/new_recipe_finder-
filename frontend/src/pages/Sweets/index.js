import React, { useState, useEffect } from 'react';
import Carousel, { CarouselItem } from "../../components/Carousel";
import RecipeModal from "../../components/RecipeModal";
import Navbar from '../../components/Navbar/index';

function SweetsPage() {
    const [recipes, setRecipes] = useState([]);
    const [modalShows, setModalShows] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState();
    const [pageIndex, setPageIndex] = useState(1);
    const [lastRecipeReached, setLastRecipeReached] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:8000/sweets/recipes?page=${pageIndex}`)
            .then((res) => res.json())
            .then((data) => {
                setRecipes(data);
                console.log("DATA", data);
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
        fetch(`http://localhost:8000/sweets/recipes?page=${pageIndex}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.length > 0) {
                    setRecipes([...recipes.concat(data)])
                    setPageIndex(pageIndex + 1);
                } else {
                    setLastRecipeReached(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (
        <>
            <div>
                <Navbar></Navbar>
                <div className="subpage">
                    <h1 className="rotated-heading">Sweets</h1>
                    <Carousel
                        onEnd={getNewRecipes}
                        lastRecipeReached={lastRecipeReached}
                    >
                        {recipes && recipes.map((recipe, index) =>
                            <CarouselItem
                                key={index}
                                recipe={recipe}
                                onHandleRecipeSelect={handleRecipeSelect}>
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
