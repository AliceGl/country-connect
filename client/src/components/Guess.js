import './Guess.css'
import { ReactComponent as Checkmark } from './../svg/correct.svg'

function Guess({country, type}) {
    return (
        <div className='guess'>
            <div className={'guessType type' + type}>
                {type === 0 && <Checkmark className='correctCheckmark'/>}
            </div>
            <div className='guessText'>{country}</div>
        </div>
    )
}

export default Guess;