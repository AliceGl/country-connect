import "./InputGuess.css"
import {useState, useContext} from 'react'
import { AppContext } from './App'

function InputGuess() {
    const { submitGuess, currentGame, maxGuesses } = useContext(AppContext);
    const [country, setCountry] = useState("")

    const guess = () => {
        if (submitGuess(country)) {
            setCountry("")
        }
    }
    return (
        <div className="inputGuess">
            <input placeholder="Enter a country, territory..." value={country} className="guessField"onChange={(e) => {
                setCountry(e.target.value)
            }}/>
            <div className="guessButton" onClick={guess}>Guess ({currentGame.guesses.length}/{maxGuesses})</div>
            <div className="countryList">
                Country<br/>
                Country<br/>
                Country<br/>
                Country<br/>
                Country<br/>
                Country<br/>
                Country<br/>
                Country<br/>
                Country<br/>
            </div>
        </div>
    )
}

export default InputGuess;