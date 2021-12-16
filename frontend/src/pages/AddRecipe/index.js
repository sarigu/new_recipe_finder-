import React, { useState, useEffect } from 'react';
import Picker from 'emoji-picker-react';
import "./style.css";

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

        console.log("SUBMIT");
        console.log("INPUTS", inputs)
        console.log("INGREDIENTS", ingredients)
        console.log("EMOJIS", emojiUnicodes)

        await checkForErrors(inputs, ingredients, emojiUnicodes);

        if (!titleError && !descriptionError && !servingError && !cookingTimeError && !prepTimeError && !emojiError && !ingredientsError) {
            console.log("READY");
            let newInputs = inputs;
            newInputs.ingredients = ingredients;
            newInputs.emojiUnicodes = emojiUnicodes;

            console.log("GOOD TO GO", newInputs, "TYPE", type);

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
            console.log("ERR")
            setTitleError(true);
        }

        if (!inputs.description) {
            console.log("ERR")
            setDescriptionError(true);
        }

        if (!inputs.prepTime) {
            console.log("ERR")
            setPrepTimeError(true);
        }

        if (!inputs.cookingTime) {
            console.log("ERR")
            setCookingTimeError(true);
        }

        if (!inputs.serving) {
            console.log("ERR")
            setServingTimeError(true);
        }

        console.log(emojiUnicodes[0])
        if (emojiUnicodes.length < 1 || !emojiUnicodes[0]) {
            console.log("EMOJI ERR")
            setEmojiError(true);
        }

        if (!ingredients.length > 1 || !ingredients[0].quantity || !ingredients[0].ingredient) {
            console.log("INGREDIENTS ERR")
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

    return (
        <div>
            <h1>Add Recipe</h1>
            <form className="recipe-form" onSubmit={handleSubmit}>
                <input className={titleError ? "error" : null} type="text" name="title" placeholder="title" onChange={(e) => { setTitleError(false); handleChange(e) }} />
                <textarea className={descriptionError ? "error" : null} name="description" rows="4" cols="50" placeholder="description" onChange={(e) => { setDescriptionError(false); handleChange(e) }} >
                </textarea>
                <input className={prepTimeError ? "error" : null} type="number" name="prepTime" placeholder="prep time" onChange={(e) => { setPrepTimeError(false); handleChange(e) }} />
                <input className={cookingTimeError ? "error" : null} type="number" name="cookingTime" placeholder="cooking time" onChange={(e) => { setCookingTimeError(false); handleChange(e) }} />
                <input className={servingError ? "error" : null} type="number" name="serving" placeholder="serving" onChange={(e) => { setServingTimeError(false); handleChange(e) }} />
                {emojis.map((emoji, index) =>

                    <div key={index} className={emojiError ? "error" : null}>
                        {chosenEmoji ? (
                            <span onClick={() => { setShowEmojis(true); setEmojiIndex(index); setEmojiError(false) }} >You chose: {emoji}</span>
                        ) : (
                                <span onClick={() => { setShowEmojis(true); setEmojiIndex(index); setEmojiError(false) }}>No emoji Chosen</span>
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


                <button onClick={addEmojis}>Add emoji</button>
                <div className={ingredientsError ? "error ingredients-container" : "ingredients-container"} >
                    {ingredients.map((ingredient, index) =>
                        <div key={index}>
                            <input type="text" data-id={index} name="quantity" placeholder="quantity" onChange={(e) => { setIngredientsError(false); handleIngredientsChange(e) }} />
                            <input type="text" data-id={index} name="ingredient" placeholder="ingredient" onChange={(e) => { setIngredientsError(false); handleIngredientsChange(e) }} />
                        </div>
                    )}

                </div>
                <button onClick={addIngredients}>Add ingredients</button>
                <select id="type" name="type" onChange={handleChange}>
                    <option value="meal">meal</option>
                    <option value="treat">treat</option>
                </select>
                <input type="checkbox" id="vegan" name="vegan" value="true" onChange={handleChange} />
                <label for="vegan">Vegan</label>
                <input type="checkbox" id="vegetarian" name="vegetarian" value="true" onChange={handleChange} />
                <label for="vegetarian">Vegetarian</label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );

}

export default AddRecipe;
