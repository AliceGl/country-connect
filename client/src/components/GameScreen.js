import './GameScreen.css'
import Map from './Map'
import InputGuess from './InputGuess';
import Guess from './Guess';
import { useContext } from 'react';
import { AppContext } from './App';
import { countryNames } from '../data';
import { ReactComponent as ReloadIcon } from './../svg/reload.svg';
import { countriesDist } from '../data';

function GameScreen() {
    const { currentGame, gameState, newGame } = useContext(AppContext);

    const guesses = [];
    for (var i in currentGame.guesses) {
        guesses.push(<Guess country={countryNames.get(currentGame.guesses[i].country)} type={currentGame.guesses[i].type} key={i}/>);
    }

    function Answer() {
        const answer = countriesDist.get(currentGame.from).get(currentGame.to);
        var solution = countryNames.get(currentGame.from)
        var lastCountry = currentGame.from
        for (var i = 0; i < answer; i += 1) {
            for (var country of countryNames.keys()) {
                if (countriesDist.get(currentGame.to).get(country) === answer - i - 1 && countriesDist.get(lastCountry).get(country) === 0) {
                    solution += " > " + countryNames.get(country);
                    lastCountry = country;
                    break;
                }
            }
        }
        solution += " > " + countryNames.get(currentGame.to);
        return (
            <div>
                The shortest soultion was {answer} guesses. <br/><br/>
                { solution }
            </div>
        )
    }

    function WonScreen() {
        return (
            <div className='wonBlock'>
                You won in {currentGame.guesses.length} guesses!
                <Answer />
            </div>
        )
    }

    function LostScreen() {
        return (
            <div className='lostBlock'>
                You ran out of guesses :(
                <Answer />
            </div>
        )
    }

    return (
        <div className='gameScreen'>
            <div className='mapPart'>
                <div className='textWrapper'>
                    <div className='taskText'>
                        Let's connect <span className='textFrom'>{countryNames.get(currentGame.from)}</span> and <span className='textTo'>{countryNames.get(currentGame.to)}</span>
                    </div>

                    {(gameState !== 0) && 
                        <div className='newGame' onClick={newGame}>
                            <ReloadIcon className='reloadIcon'/>
                        </div>
                    }
                </div>
                <Map></Map>
            </div>
            <div className='inputPart'>
                <InputGuess/>
            </div>
            <div className='guessesPart'>
                {gameState === 1 && <WonScreen /> }
                {gameState === -1 && <LostScreen /> }
                {guesses}
            </div>
        </div>
    )
}

export default GameScreen;