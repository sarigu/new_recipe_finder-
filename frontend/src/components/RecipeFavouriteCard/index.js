import React from "react";
import "./style.css";

function RecipeFavouriteCard({ recipe, onFavouriteCardClick }) {
    return (
        <div className="recipe-card" onClick={onFavouriteCardClick}>
            <h2>{recipe.title}</h2>
            <div className="emojis">
                <div>
                    {recipe.emojiUnicodes && recipe.emojiUnicodes.length > 0 ?
                        <>
                            {recipe.emojiUnicodes.map((emoji) =>
                                <span> {String.fromCodePoint(parseInt(emoji))}</span>
                            )}
                        </>
                        : <span>&#x1f348;</span>
                    }
                </div>
            </div>
        </div>
    );

}

export default RecipeFavouriteCard;
