import './Map.css'
import { ReactComponent as World } from '../world-data/world.svg'

function Map() {
    return (
        <div className='map'>
            <World className='mapOutlines'/>
        </div>
    )
}

export default Map;