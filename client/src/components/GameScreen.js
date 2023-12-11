import './GameScreen.css'
import Map from './Map'
import InputGuess from './InputGuess';
import Guess from './Guess';

function GameScreen() {
    return (
        <div className='gameScreen'>
            <div className='mapPart'>
                <div>Let's connect Vietnam and Serbia</div>
                <Map></Map>
            </div>
            <div className='inputPart'>
                <InputGuess/>
            </div>
            <div className='guessesPart'>
                <Guess/>
                <Guess/>
                <Guess/>
                <Guess/>
                <Guess/>
                <Guess/>
                <Guess/>
                <Guess/>
                <Guess/>
            </div>
        </div>
    )
}

export default GameScreen;