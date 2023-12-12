import './Rules.css'
import './Guess.css'
import { ReactComponent as Checkmark } from './../svg/correct.svg'

function Rules() {
    return (
        <div className='rules'>
            Name countries to connect the <span className='textFrom'>StartCountry</span> and the <span className='textTo'>EndCountry</span>. Try to get there in the fewest guesses!
            <h4>Scoring</h4>
            After each guess you get an emoji. Scoring is based on all countries you've already guessed, and whether your last guess gets you closer to a solution.
            <ul className='guessesList'>
                <li>
                    <div className='guessType type0'><Checkmark className='correctCheckmark'/></div>
                    <p>Guess is <i>optimal</i>! You're one step closer.</p>
                </li>
                <li>
                    <div className='guessType type1'></div>
                    <p>Guess is <i>pretty good</i>. This country is close, <br/> but doesn't get you closer.</p>
                </li>
                <li>
                    <div className='guessType type2'></div>
                    <p>Guess is <i>not great</i>. This country is <br/> a significant detour.</p>
                </li>
                <li>
                    <div className='guessType type3'></div>
                    <p>Your guess is on a different continent or <br/> landmass 🤦.</p>
                </li>
            </ul>
            <h4>What counts as a country?</h4>
            Map includes some countries that are disputed, splits some countries up e.g. French Guiana is seperate to France, and does not include some small countries e.g. Vatican. When in doubt look at the countries list under the guess field!
            <h4>What if I can't connect the countries?</h4>
            You have a limited amount of guesses - just waste them all to give up, and you will be able to start a new game.
        </div>
    )
}

export default Rules;