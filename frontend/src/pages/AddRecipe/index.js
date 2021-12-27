import React, { useState, useEffect } from 'react';
import Picker from 'emoji-picker-react';
import "./style.css";
import Navbar from '../../components/Navbar/index';

function AddRecipe() {
    const [inputs, setInputs] = useState({ meal: true, treat: false, vegan: false, vegetarian: false });
    const [ingredients, setIngredients] = useState([{ quantity: "", ingredient: "" }]);
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [showEmojis, setShowEmojis] = useState(false);
    const [emojis, setEmojis] = useState(['']);
    const [emojiUnicodes, setEmojiUnicodes] = useState(['']);
    const [emojiIndex, setEmojiIndex] = useState(0);
    const [type, setType] = useState("meals");

    //Errors

    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [emojiError, setEmojiError] = useState(false);
    const [prepTimeError, setPrepTimeError] = useState(false);
    const [cookingTimeError, setCookingTimeError] = useState(false);
    const [servingError, setServingTimeError] = useState(false);
    const [ingredientsError, setIngredientsError] = useState(false);


    useEffect(() => {
        setIngredients([{ quantity: "", ingredient: "" }])
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        await checkForErrors(inputs, ingredients, emojiUnicodes);

        if (!titleError && !descriptionError && !servingError && !cookingTimeError && !prepTimeError && !emojiError && !ingredientsError) {
            let newInputs = inputs;
            newInputs.ingredients = ingredients;
            newInputs.emojiUnicodes = emojiUnicodes;

            fetch(`http://localhost:8000/${type}/recipe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newInputs),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }

    const checkForErrors = async (inputs, ingredients, emojiUnicodes) => {
        if (!inputs.title) {
            setTitleError(true);
        }

        if (!inputs.description) {
            setDescriptionError(true);
        }

        if (!inputs.prepTime) {
            setPrepTimeError(true);
        }

        if (!inputs.cookingTime) {
            setCookingTimeError(true);
        }

        if (!inputs.serving) {
            setServingTimeError(true);
        }

        if (emojiUnicodes.length < 1 || !emojiUnicodes[0]) {
            setEmojiError(true);
        }

        if (!ingredients.length > 1 || !ingredients[0].quantity || !ingredients[0].ingredient) {
            setIngredientsError(true);
        }
    }


    const handleChange = (e) => {
        if (e.target.name === "type") {
            if (e.target.value === "meal") {
                setType("meals");
                setInputs(inputs => ({ ...inputs, ["meal"]: true }));
                setInputs(inputs => ({ ...inputs, ["treat"]: false }));
            } else {
                setType("sweets");
                setInputs(inputs => ({ ...inputs, ["treat"]: true }));
                setInputs(inputs => ({ ...inputs, ["meal"]: false }));
            }
        } else if (e.target.name === "vegetarian" || e.target.name === "vegan") {
            if (e.target.checked) {
                setInputs(inputs => ({ ...inputs, [e.target.name]: true }));
            } else {
                setInputs(inputs => ({ ...inputs, [e.target.name]: false }));
            }
        } else if (e.target.name === "prepTime" || e.target.name === "cookingTime" || e.target.name === "serving") {
            setInputs(inputs => ({ ...inputs, [e.target.name]: parseInt(e.target.value) }));
        } else {
            setInputs(inputs => ({ ...inputs, [e.target.name]: e.target.value }));
        }
    }

    const handleIngredientsChange = (e) => {
        setIngredients(Object.values({ ...ingredients, [e.target.dataset.id]: { ...ingredients[e.target.dataset.id], [e.target.name]: e.target.value } }));
    }

    const addIngredients = (e) => {
        e.preventDefault();
        setIngredients([...ingredients, { quantity: "", ingredient: "" }])
    }

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        setEmojiUnicodes(Object.values({ ...emojiUnicodes, [emojiIndex]: emojiObject.unified }));
        setEmojis(Object.values({ ...emojis, [emojiIndex]: emojiObject.emoji }));
        setShowEmojis(false);
    };

    const addEmojis = (e) => {
        e.preventDefault();
        setEmojis([...emojis, ''])
    }

    const removeEmojis = (e) => {
        e.preventDefault();
        console.log("REMOVE EMOJI", emojiIndex)
        console.log("ALL EMOJI", emojis)
    }

    return (
        <>
            <div>
                <Navbar></Navbar>
                <div className="scroll-subpage">
                    <h1 className="rotated-heading">Add</h1>
                    <div className="recipe-form" >
                        <h2>Your recipe</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                className={titleError ? "error" : null}
                                type="text"
                                name="title"
                                placeholder="title"
                                onChange={(e) => { setTitleError(false); handleChange(e) }}
                            />
                            <textarea
                                className={descriptionError ? "error" : null}
                                name="description"
                                rows="4"
                                cols="50"
                                placeholder="description"
                                onChange={(e) => { setDescriptionError(false); handleChange(e) }}
                            >
                            </textarea>
                            <input
                                className={prepTimeError ? "error" : null}
                                type="number"
                                min="0"
                                name="prepTime"
                                placeholder="prep time"
                                onChange={(e) => { setPrepTimeError(false); handleChange(e) }}
                            />
                            <input
                                className={cookingTimeError ? "error" : null}
                                type="number"
                                min="0"
                                name="cookingTime"
                                placeholder="cooking time"
                                onChange={(e) => { setCookingTimeError(false); handleChange(e) }}
                            />
                            <input
                                className={servingError ? "error" : null}
                                type="number"
                                min="0"
                                name="serving"
                                placeholder="serving"
                                onChange={(e) => { setServingTimeError(false); handleChange(e) }}
                            />

                            <div className="emojis-container">
                                {emojis.map((emoji, index) =>
                                    <div
                                        key={index}
                                        className={emojiError ? "emoji-error" : null}
                                        style={{ marginBottom: "15px" }}
                                    >
                                        {chosenEmoji ? (
                                            <>
                                                <span onClick={() => { setShowEmojis(true); setEmojiIndex(index); setEmojiError(false) }}>
                                                    You chose: {emoji}
                                                </span>
                                                <span className="close" onClick={(e) => { removeEmojis(e); setEmojiError(false) }}>&times;</span>
                                            </>
                                        ) : (
                                                <>
                                                    <span onClick={() => { setShowEmojis(true); setEmojiIndex(index); setEmojiError(false) }}>
                                                        Choose an emoji
                                                    </span>
                                                    <span className="close" onClick={(e) => { removeEmojis(e); setEmojiError(false) }}>&times;</span>
                                                </>
                                            )}
                                        {showEmojis ?
                                            <Picker
                                                onEmojiClick={onEmojiClick}
                                                disableAutoFocus={true}
                                            />
                                            : null
                                        }
                                    </div>
                                )}
                                <button onClick={addEmojis}>Add another emoji</button>
                            </div>
                            <div className="ingredients-container" >
                                {ingredients.map((ingredient, index) =>
                                    <div key={index}>
                                        <input
                                            style={{ marginRight: "15px" }}
                                            className={ingredientsError ? "error" : null}
                                            type="text"
                                            data-id={index}
                                            name="quantity"
                                            placeholder="quantity"
                                            onChange={(e) => { setIngredientsError(false); handleIngredientsChange(e) }}
                                        />
                                        <input
                                            className={ingredientsError ? "error" : null}
                                            type="text"
                                            data-id={index}
                                            name="ingredient"
                                            placeholder="ingredient"
                                            onChange={(e) => { setIngredientsError(false); handleIngredientsChange(e) }}
                                        />
                                        <span className="close" onClick={() => { }}>&times;</span>
                                    </div>
                                )}
                                <button onClick={addIngredients}>Add more ingredients</button>
                            </div>
                            <select
                                id="type"
                                name="type"
                                onChange={handleChange}
                            >
                                <option value="meal">meal</option>
                                <option value="treat">treat</option>
                            </select>
                            <div className="diet-type-options">
                                <input
                                    type="checkbox"
                                    id="vegan"
                                    name="vegan"
                                    value="true"
                                    onChange={handleChange}
                                />
                                <label for="vegan">Vegan</label>

                                <input
                                    style={{ marginLeft: "20px" }}
                                    type="checkbox"
                                    id="vegetarian"
                                    name="vegetarian"
                                    value="true"
                                    onChange={handleChange}
                                />
                                <label for="vegetarian">Vegetarian</label>
                            </div>
                            <input
                                type="submit"
                                value="Submit"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );

}

export default AddRecipe;
