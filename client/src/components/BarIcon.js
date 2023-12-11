import './BarIcon.css'
import {ReactComponent as Stats} from './../svg/stats.svg'
import {ReactComponent as Rules} from './../svg/rules.svg'
import {ReactComponent as Settings} from './../svg/settings.svg'
import { Tooltip } from 'react-tooltip'


function BarIcon({name, description, onClick, isFirst = false, isLast = false}) {

    return (
        <div 
        className={'barIcon' + ((isFirst) ? ' firstIcon' : '') + ((isLast) ? ' lastIcon' : '')} 
        id={name} 
        onClick={onClick}
        data-tooltip-id={"tooltip"}
        data-tooltip-content={description}
        data-tooltip-place='bottom'>
            {(name === 'stats' && <Stats/>) || 
            (name === 'rules' && <Rules/>) ||
            (name === 'settings' && <Settings/>)}

            <Tooltip id={"tooltip"} className='tooltip'/>
        </div>
    )
}

export default BarIcon;