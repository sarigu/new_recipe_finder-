import React, { useState } from 'react';
import "./style.css";

const Accordion = ({ question, answer }) => {
    const [isActive, setIsActive] = useState(false);


    return (
        <div className="question-wrapper" onClick={() => setIsActive(!isActive)}>
            <div className={isActive ? "status opened" : "status"}></div>
            <div className="container">
                <h3>
                    {question}
                </h3>
                <div className={isActive ? "info opened" : "info"}>
                    <p>
                        {answer}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Accordion;