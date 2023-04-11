import './App.css';
import {IMAGES} from "./constants";
import {useCallback, useState} from "react";

function App() {
    const [cardNames, setCardNames] = useState([]);
    const [nextIndex, setNextIndex] = useState(0);
    const [message, setMessage] = useState("");

    const handleShuffle = useCallback(() => {
        const shuffledNames = Object.values(IMAGES.cards);
        for (let i = shuffledNames.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledNames[i], shuffledNames[j]] = [shuffledNames[j], shuffledNames[i]];
        }
        setCardNames(shuffledNames)
        setNextIndex(0);
        setMessage("Click for next card");
    }, [])

    const handleNext = () => {
        console.error("handleNext")
        if (!cardNames.length) {
            return setMessage("Please shuffle first");
        }
        setNextIndex((prevState) => {
            let value = prevState
            if (cardNames[value + 1]) {
                setMessage(`${value + 2} / 52`)
                return value + 1
            }
            else setMessage("Cards Over, Please shuffle again or reset");

            return value
        })
    }

    const handleReset = () => {
        setNextIndex(0);
        setCardNames([]);
        setMessage("")
    }


    return (
        <div className="App">
            <header className="App-header">
                {!!message && <p className="message">{message}</p>}
                <img src={cardNames[nextIndex] || IMAGES.backCard} className="App-logo" alt="logo"
                    onClick={handleNext} />
                <div className="mt-30">
                    <button className="btn" onClick={handleShuffle}>Shuffle</button>
                    <button className="btn ml-10" onClick={handleReset}>Reset</button>
                </div>
            </header>
        </div>
    );
}

export default App;
