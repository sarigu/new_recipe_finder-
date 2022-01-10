import React, { useState, useEffect } from 'react';
import "./style.css";
import Navbar from '../../components/Navbar';
import EmoijInput from '../../components/EmojiInput';
import FeedbackModal from '../../components/Modals/FeedbackModal';
import Footer from '../../components/Footer/index';
import { useNavigate } from "react-router-dom";

function AddRecipe() {

    const [inputs, setInputs] = useState({ meal: true, treat: false, vegan: false, vegetarian: false });
    const [ingredients, setIngredients] = useState([{ quantity: "", ingredient: "" }]);
    const [emojis, setEmojis] = useState(['']);
    const [emojiUnicodes, setEmojiUnicodes] = useState(['']);
    const [type, setType] = useState("meals");
    const [modalShows, setModalShows] = useState(false);

    const navigate = useNavigate();


    //Errors

    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [emojiError, setEmojiError] = useState(false);
    const [prepTimeError, setPrepTimeError] = useState(false);
    const [cookingTimeError, setCookingTimeError] = useState(false);
    const [servingError, setServingTimeError] = useState(false);
    const [ingredientsError, setIngredientsError] = useState(false);
    const [submissionFailed, setSubmissionFailed] = useState(false);


    useEffect(() => {
        setIngredients([{ quantity: "", ingredient: "" }])
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        let result = await checkForErrors(inputs, ingredients, emojiUnicodes);

        if (result) {
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
                .then(res => {
                    if (res.status === 200) {
                        setSubmissionFailed(false);
                        setModalShows(true);
                    } else {
                        setSubmissionFailed(true);
                        setModalShows(true);
                    }
                })
        }
    }

    const checkForErrors = async (inputs, ingredients, emojiUnicodes) => {
        if (!inputs.title) {
            setTitleError(true);
            return false;
        }

        if (!inputs.description) {
            setDescriptionError(true);
            return false;
        }

        if (!inputs.prepTime) {
            setPrepTimeError(true);
            return false;
        }

        if (!inputs.cookingTime) {
            setCookingTimeError(true);
            return false;
        }

        if (!inputs.serving) {
            setServingTimeError(true);
            return false;
        }

        if (emojiUnicodes.length < 1 || !emojiUnicodes[0]) {
            setEmojiError(true);
            return false;
        }

        if (!ingredients.length > 1 || !ingredients[0].quantity || !ingredients[0].ingredient) {
            setIngredientsError(true);
            return false;
        }

        return true;
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
        setIngredients(Object.values({ ...ingredients, [ingredients.length + 1]: { quantity: "", ingredient: "" } }));
    }

    const handleAddEmojis = (e) => {
        e.preventDefault();
        setEmojis([...emojis, ''])
    }

    const handleRemoveIngredients = (e) => {
        e.preventDefault();
        const ingredientsResult = ingredients.filter(ingredient => ingredients.indexOf(ingredient) != e.target.dataset.id);
        if (ingredientsResult.length > 0) {
            setIngredients(ingredientsResult);
        } else {
            setIngredients([{ quantity: "", ingredient: "" }]);
        }
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
                                <p>Describe the food in emojis</p>
                                {emojis.map((emoji, index) =>
                                    <EmoijInput
                                        key={index}
                                        index={index}
                                        emojiError={emojiError}
                                        setEmojiUnicodes={setEmojiUnicodes}
                                        emojiUnicodes={emojiUnicodes}
                                        setEmojis={setEmojis}
                                        emojis={emojis}
                                        setEmojiError={setEmojiError}
                                        existingEmoji={emoji}
                                    />

                                )}
                                <button onClick={handleAddEmojis}>Add another emoji</button>
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
                                            value={ingredient.quantity}
                                            onChange={(e) => { setIngredientsError(false); handleIngredientsChange(e) }}
                                        />
                                        <input
                                            className={ingredientsError ? "error" : null}
                                            type="text"
                                            data-id={index}
                                            name="ingredient"
                                            placeholder="ingredient"
                                            value={ingredient.ingredient}
                                            onChange={(e) => { setIngredientsError(false); handleIngredientsChange(e) }}
                                        />
                                        <span
                                            className="close"
                                            data-id={index}
                                            onClick={(e) => { handleRemoveIngredients(e); setIngredientsError(false); }}
                                        >
                                            &times;
                                        </span>
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
            <Footer />
            <FeedbackModal
                modalShows={modalShows}
                handleClose={() => { navigate("/"); setModalShows(false) }}
                submissionFailed={submissionFailed}
            />
        </>
    );
}

export default AddRecipe;
