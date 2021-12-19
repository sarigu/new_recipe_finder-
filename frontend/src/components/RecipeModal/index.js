import React from "react";
import "./style.css";

function RecipeModal({ recipe, modalShows, handleClose }) {
    return (
        <div className={modalShows ? "modal-container" : "modal-container hide"} onClick={() => handleClose()}>
            <div className="modal-content">
                <span className="close" onClick={() => handleClose()}>&times;</span>
                {recipe ?
                    <>
                        <h1>{recipe.title}</h1>
                        <div className="modal-recipe-details">
                            <span>Prep: {recipe.prepTime}min </span>
                            <span>Cooking: {recipe.cookingTime}min</span>
                            <span>Serving: {recipe.serving} people</span>
                        </div>
                        <div className="emojis">
                            <div>
                                {recipe.emojiUnicodes && recipe.emojiUnicodes.length > 0 ?
                                    <>
                                        {recipe.emojiUnicodes.map((emoji) => <span> {String.fromCodePoint(parseInt(emoji))}</span>)}
                                    </>
                                    : <span>&#x1F348;</span>
                                }
                            </div>
                        </div>
                        <p>{recipe.description}</p>
                        <h3>Ingredients</h3>
                        <ul>
                            {recipe.ingredients && recipe.ingredients.map((ingredient) => <li><span>{ingredient.quantity}</span> <span>{ingredient.ingredient}</span></li>)}
                        </ul>



                    </>
                    : <div>Loads</div>
                }
            </div>
        </div>
    );

}

export default RecipeModal;
