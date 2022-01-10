import React, { useState, useEffect } from 'react';
import "./style.css";
import Navbar from '../../components/Navbar/index';
import RecipeFavouriteCard from '../../components/RecipeFavouriteCard/index';
import RecipeModal from "../../components/Modals/RecipeModal";
import Footer from '../../components/Footer/index';

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
        <div>
            <Navbar></Navbar>
            <div className="scroll-subpage favourites">
                <h1>Favourites</h1>
                <p>You can save up to 10 of your favourite recipes. This list is temporary.</p>
                <div className="favourites-container">
                    {recipes && recipes.length > 0 ?
                        <>
                            {
                                recipes.map((recipe, index) =>
                                    <RecipeFavouriteCard
                                        key={index}
                                        recipe={recipe}
                                        onFavouriteCardClick={() => { setSelectedRecipe(recipe); setModalShows(true); }}
                                    >
                                    </RecipeFavouriteCard>
                                )
                            }
                        </>
                        : <p style={{ fontWeight: "bold" }}>You have no saved recipes</p>
                    }
                </div>
            </div>
            <Footer />
            <RecipeModal
                recipe={selectedRecipe}
                modalShows={modalShows}
                handleClose={() => { setModalShows(false); fetchData(); }}
            />
        </div>
    );

}

export default FavouritesPage;
