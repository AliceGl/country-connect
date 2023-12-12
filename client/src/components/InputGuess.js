import "./InputGuess.css"
import {useState, useContext, useEffect} from 'react'
import { AppContext } from './App'
import { countryNames } from "../data"
import CountryOption from "./CountryOption"

function InputGuess() {
    const { submitGuess, currentGame, maxGuesses } = useContext(AppContext);

    const options = [...countryNames.values()].sort()

    const [country, setCountry] = useState("")
    const [results, setResults] = useState(options)

    const handleOnChange = (e) => {
        setCountry(e.target.value);
    }

    useEffect(() => {
        setResults(options
            .filter((option) =>
                option.toLowerCase().indexOf(country.toLowerCase()) > -1
            )
            .sort((option1, option2) => 
                option1.toLowerCase().indexOf(country.toLowerCase()) -
                option2.toLowerCase().indexOf(country.toLowerCase())
            ));
    }, [country])

    const guess = () => {
        if (submitGuess(country)) {
            setCountry("")
        }
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (country === results[0]) {
                guess();
            } else {
                setCountry(results[0]);
            }
        }
    }
    return (
        <div className="inputGuess">
            <input placeholder="Enter a country, territory..." value={country} className="guessField" onChange={handleOnChange} onKeyDown={handleKeyDown}/>
            <div className="guessButton" onClick={guess}>Guess ({currentGame.guesses.length}/{maxGuesses})</div>
            <div className="countryList">
                {results.map((result) =>
                    <CountryOption name={result} handleClick={() => setCountry(result)} key={result} />
                )}
            </div>
        </div>
    )
}

export default InputGuess;