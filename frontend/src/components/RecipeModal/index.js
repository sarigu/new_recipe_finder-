import React from "react";
import "./style.css";

function RecipeModal({ recipe, modalShows, handleClose }) {
    return (
        <div className={modalShows ? "modal-container" : "modal-container hide"}>
            <div className="modal-content">
                <span className="close" onClick={() => handleClose()}>&times;</span>
                {recipe ?
                    <>
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
                            {recipe.ingredients && recipe.ingredients.map((ingredient) => <><span>{ingredient.quantity}</span> <span>{ingredient.ingredient}</span><br /></>)}
                        </div>



                    </>
                    : <div>Loads</div>
                }
            </div>
        </div>
    );

}

export default RecipeModal;
