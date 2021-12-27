import React from 'react';
import "../style.css";

function FeedbackModal({ modalShows, handleClose, submissionFailed }) {

    console.log(submissionFailed);

    return (
        <div className={modalShows ? "modal-container" : "modal-container hide"} >
            <div className="feedback-modal-content">
                <span className="close" onClick={handleClose}>&times;</span>
                {!submissionFailed ?
                    <div>
                        <h1>Your recipe was added!</h1>
                        <button onClick={handleClose}>Ok</button>
                    </div>
                    : <div>
                        <h1>Sorry, something went wrong!</h1>
                        <button onClick={handleClose}>Ok</button>
                    </div>
                }
            </div>

        </div>
    );
}

export default FeedbackModal;
