import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./style.css";
import Navbar from '../../components/Navbar/index';
import RecipeFavouriteCard from '../../components/RecipeFavouriteCard/index';
import Accordion from '../../components/Accordion/index';
import Footer from '../../components/Footer/index';
import RecipeModal from "../../components/Modals/RecipeModal";

function LandingPage() {
    const [latestMeals, setLatestMeals] = useState([]);
    const [latestSweets, setLatestSweets] = useState([]);
    const [modalShows, setModalShows] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState();

    const accordionData = [
        {
            question: 'How does it work?',
            answer: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
            laborum cupiditate possimus labore, hic temporibus velit dicta earum
            suscipit commodi eum enim atque at? Et perspiciatis dolore iure
            voluptatem.`
        },
        {
            question: 'Who can I add recipes to the collection?',
            answer: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia veniam
            reprehenderit nam assumenda voluptatem ut. Ipsum eius dicta, officiis
            quaerat iure quos dolorum accusantium ducimus in illum vero commodi
            pariatur? Impedit autem esse nostrum quasi, fugiat a aut error cumque
            quidem maiores doloremque est numquam praesentium eos voluptatem amet!
            Repudiandae, mollitia id reprehenderit a ab odit!`
        },
        {
            question: 'Who is behind recipe finder?',
            answer: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
            quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
            dolor ut sequi minus iste? Quas?`
        },
        {
            question: 'What kind of recipes can I find?',
            answer: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
            quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
            dolor ut sequi minus iste? Quas?`
        },
        {
            question: 'Where can I send feedback to?',
            answer: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
            quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
            dolor ut sequi minus iste? Quas?`
        }
    ];


    useEffect(() => {
        fetch('http://localhost:8000/latest')
            .then((res) => res.json())
            .then((data) => {
                setLatestMeals(data.meals);
                setLatestSweets(data.sweets);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <Navbar></Navbar>
            <div className="landing-page">
                <section className="hero">
                    <h1>Recipe Finder<span className="dot"></span></h1>
                    <h2>Not sure what to eat today? Let's find you the perfect match.</h2>
                    <div className="hero-container">
                        <div className="recipe-guy"></div>
                        <div className="options">
                            <div className="option">
                                <Link to="/meals">Meals</Link>
                                <div className="arrow-circle"></div>
                            </div>
                            <div className="option">
                                <Link to="/sweets">Sweets</Link>
                                <div className="arrow-circle"></div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="latest-recipes-wrapper">
                    {latestMeals && latestMeals.length > 0 || latestSweets && latestSweets.length > 0 ?
                        <h1>Latest</h1> :
                        null
                    }
                    <div className="latest-recipes">
                        {latestMeals && latestMeals.length > 0 ?
                            <>
                                {
                                    latestMeals.map((recipe, index) =>
                                        <RecipeFavouriteCard
                                            key={index}
                                            recipe={recipe}
                                            onFavouriteCardClick={() => {
                                                setSelectedRecipe(recipe);
                                                setModalShows(true);
                                            }}
                                        >
                                        </RecipeFavouriteCard>
                                    )
                                }
                            </>
                            : null
                        }
                    </div>
                    <div className="latest-recipes">
                        {latestSweets && latestSweets.length > 0 ?
                            <>
                                {
                                    latestSweets.map((recipe, index) =>
                                        <RecipeFavouriteCard
                                            key={index}
                                            recipe={recipe}
                                            onFavouriteCardClick={() => {
                                                setSelectedRecipe(recipe);
                                                setModalShows(true);
                                            }}
                                        >
                                        </RecipeFavouriteCard>
                                    )
                                }
                            </>
                            : null
                        }
                    </div>
                </section>
                <section className="faq">
                    <h1>FAQ</h1>
                    <p>Figuring out what to cook can be a hard process. We are here to help you.</p>
                    <div className="accordion">
                        {accordionData.map((elem, index) => (
                            <Accordion
                                key={index}
                                question={elem.question}
                                answer={elem.answer}
                            />
                        ))}

                    </div>
                </section>
            </div>
            <Footer />
            <RecipeModal
                recipe={selectedRecipe}
                modalShows={modalShows}
                handleClose={() => { setModalShows(false); }}
            />
        </div>
    );

}

export default LandingPage;
