import React, { useState, useEffect } from 'react';
import Picker from 'emoji-picker-react';
import "./style.css";

const EmoijInput = ({
    index,
    existingEmoji,
    emojiError,
    setEmojiUnicodes,
    setEmojis,
    emojis,
    emojiUnicodes,
    setEmojiError
}) => {

    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [showEmojis, setShowEmojis] = useState(false);
    const [emojiIndex, setEmojiIndex] = useState(0);

    useEffect(() => {
        if (existingEmoji) {
            setChosenEmoji(existingEmoji);
        }
    }, [existingEmoji]);

    const handleEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject.emoji);
        setEmojiUnicodes(Object.values({ ...emojiUnicodes, [emojiIndex]: emojiObject.unified }));
        setEmojis(Object.values({ ...emojis, [emojiIndex]: emojiObject.emoji }));
        setShowEmojis(false);
    };

    const handleRemoveEmoji = (e) => {
        e.preventDefault();
        const emojiResult = emojis.filter(emoji => emojis.indexOf(emoji) != emojiIndex);
        const emojiUnicodesResult = emojiUnicodes.filter(emoji => emojiUnicodes.indexOf(emoji) != emojiIndex);
        if (emojiResult.length > 0) {
            setEmojis(emojiResult);
            setEmojiUnicodes(emojiUnicodesResult);
        } else {
            setEmojis(['']);
            setEmojiUnicodes(['']);
            setChosenEmoji(null);
            setEmojiIndex(0);
        }
    }

    return (
        <div
            className={emojiError ? "emoji-error" : null}
            style={{ marginBottom: "15px" }}
        >
            {chosenEmoji ? (
                <>
                    <span onClick={() => { setShowEmojis(true); setEmojiIndex(index); setEmojiError(false) }}>
                        You chose: {chosenEmoji}
                    </span>
                    <span className="close" onClick={(e) => { setEmojiIndex(index); handleRemoveEmoji(e); setEmojiError(false) }}>&times;</span>
                </>
            ) : (
                    <>
                        <span onClick={() => { setShowEmojis(true); setEmojiIndex(index); setEmojiError(false) }}>
                            Choose an emoji
                                                    </span>
                        <span className="close" onClick={(e) => { setEmojiIndex(index); handleRemoveEmoji(e); setEmojiError(false) }}>&times;</span>
                    </>
                )}
            {showEmojis ?
                <Picker
                    onEmojiClick={handleEmojiClick}
                    disableAutoFocus={true}
                />
                : null
            }
        </div>
    );
};

export default EmoijInput;