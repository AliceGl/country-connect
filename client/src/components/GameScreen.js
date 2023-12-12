import './GameScreen.css'
import Map from './Map'
import InputGuess from './InputGuess';
import Guess from './Guess';
import { useContext } from 'react';
import { AppContext } from './App';
import { countryNames } from '../data';
import { ReactComponent as ReloadIcon } from './../svg/reload.svg';

function GameScreen() {
    const { currentGame, gameState, newGame } = useContext(AppContext);

    const guesses = [];
    for (var i in currentGame.guesses) {
        guesses.push(<Guess country={countryNames.get(currentGame.guesses[i].country)} type={currentGame.guesses[i].type} key={i}/>);
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
                {guesses}
            </div>
        </div>
    )
}

export default GameScreen;