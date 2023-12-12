import './Map.css'
import React, { useEffect } from 'react';
import { ReactComponent as World } from '../world-data/world.svg'
import { useContext } from 'react';
import { AppContext } from './App'

function Map() {
    const { countryStates } = useContext(AppContext);

    useEffect(() => {
        for (var country of countryStates.keys()) {
            const paths = document.getElementsByClassName("sm_state_" + country);
            for (var path of paths) {
                path.classList.remove('from');
                path.classList.remove('to');
                path.classList.remove('guessed');
                path.classList.remove('hidden');
                path.classList.remove('shown-gray');
                path.classList.add(countryStates.get(country));
            }
        }
    }, [countryStates]);

    return (
        //TODO: MapInteractionCSS
        <div className='map'>
            <World className='mapOutlines'/>
        </div>
    )
}

export default Map;