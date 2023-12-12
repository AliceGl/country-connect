import { useContext, useEffect, useState } from 'react';
import './Stats.css'
import Axios from 'axios';
import Cookies from 'universal-cookie';
import { AppContext, serverAddress } from './App';

function Stats() {
    const cookies = new Cookies();
    const userData = cookies.get('userData');
    const [stats, setStats] = useState({});
    const { currentGame } = useContext(AppContext);

    useEffect(() => {
        updateStats();
    }, [currentGame]);

    function sortedStats() {
        const items = []
        for (var id in stats) {
            items.push(stats[id]);
        }
        return items.sort((line1, line2) => {
            return line2.averageScore - line1.averageScore;
        })
    }

    function statsAsRows() {
        const items = []
        const lines = sortedStats();
        for (var num in lines) {
            const line = lines[num]
            items.push(
                <tr key={line.userId}>
                    <td>{parseInt(num) + 1}</td>
                    <td>{line.username}</td>
                    <td>{line.averageScore.toFixed(3)}</td>
                    <td>{line.gamesTotal}</td>
                </tr>
            )
        }
        return items;
    }

    function updateStats() {
        Axios.get(`${serverAddress}/getStats`)
        .then(val => {
            setStats(val.data)
        })
    }
    
    function getUserResult() {
        if (userData === undefined || stats[userData.userId] === undefined) return null;
        return (
            <div>
                <h4>Your result</h4>
                <i>Average score:</i> {stats[userData.userId].averageScore.toFixed(3)}<br/>
                <i>Games played:</i> {stats[userData.userId].gamesTotal}
            </div>
        )
    }

    return (
        <div className='stats'>
            <div className='modalButton' onClick={updateStats}>Update</div>
            { getUserResult() }
            <h4>Scoreboard</h4>
            <table className='scoreboard'>
                <thead>
                    <tr>
                        <th>Place</th>
                        <th>User</th>
                        <th>Average score</th>
                        <th>Games played</th>
                    </tr>
                </thead>
                <tbody>
                    {statsAsRows()}
                </tbody>
            </table>
        </div>
    )
}

export default Stats;