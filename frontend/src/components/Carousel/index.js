import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import "./style.css";

//Modified from https://medium.com/tinyso/how-to-create-the-responsive-and-swipeable-carousel-slider-component-in-react-99f433364aa0

export const CarouselItem = ({ width, height, recipe, onHandleRecipeSelect }) => {
    return (
        <div className="carousel-item" style={{ width: width, height: height }} onClick={() => onHandleRecipeSelect(recipe._id)}>
            <div className="recipe"  >
                <div className="emojis">
                    <div>
                        {recipe.emojiUnicodes && recipe.emojiUnicodes.length > 0 ?
                            <>
                                {recipe.emojiUnicodes.map((emoji, index) => <span key={index}> {String.fromCodePoint(parseInt(emoji))}</span>)}
                            </>
                            : <span>&#x1F348;</span>
                        }
                    </div>
                </div>
                <h1 style={{ textAlign: "center" }}>{recipe.title}</h1>
                <div className="details">
                    <span>Prep: {recipe.prepTime}min </span>
                    <span>Cooking: {recipe.cookingTime}min</span>
                    <span>Servings: {recipe.serving} people</span>
                </div>

            </div>
        </div>
    );
};

const Carousel = ({ children, onEnd, lastRecipeReached }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            newIndex = React.Children.count(children) - 1;
        } else if (newIndex == React.Children.count(children) - 1 && !lastRecipeReached) {
            onEnd();
        } else if (newIndex >= React.Children.count(children)) {
            newIndex = 0;
        }
        setActiveIndex(newIndex);
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => updateIndex(activeIndex + 1),
        onSwipedRight: () => updateIndex(activeIndex - 1)
    });

    return (
        <div
            {...handlers}
            className="carousel"
        >
            <div
                className="inner"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
                {React.Children.map(children, (child, index) => {
                    return React.cloneElement(child, { width: "100%", height: "85vh" });
                })}
            </div>
            <div className="indicators">
                <div
                    className="back-button"
                    onClick={() => {
                        updateIndex(activeIndex - 1);
                    }}
                >
                </div>
                <div
                    className="next-button"
                    onClick={() => {
                        updateIndex(activeIndex + 1);
                    }}
                >
                </div>
            </div>
        </div>
    );
};

export default Carousel;
