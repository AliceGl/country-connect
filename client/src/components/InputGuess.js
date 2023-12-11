import "./InputGuess.css"
import {useState} from 'react'

function InputGuess() {
    const [country, setCountry] = useState("")

    const guess = () => {setCountry("")}
    return (
        <div className="inputGuess">
            <input placeholder="Enter a country, territory..." value={country} className="guessField"onChange={(e) => {
                setCountry(e.target.value)
            }}/>
            <div className="guessButton" onClick={guess}>Guess (7/10)</div>
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