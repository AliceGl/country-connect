import './LogIn.css'
import Modal from './Modal'
import { useState } from 'react'
import Axios from 'axios'
import Cookies from 'universal-cookie'
import { serverAddress } from './App'

function LogIn() {
    const cookies = new Cookies()
    const userData = cookies.get('userData');

    const [visible, setVisible] = useState(userData === undefined);
    const [user, setUser] = useState(null)

    const save = () => { 
        Axios.post(`${serverAddress}/login`, {username: user}).then(res => {
            const {userId, username} = res.data;

            cookies.set("userData", {userId, username});
        })
        setVisible(false)
    }
    return (
        <Modal className="logIn" title="What is your name?" show={visible} onClose={() => {}} noClose={true} size='small'>
            <input className="inputField" placeholder="Type it here..." onChange={(e) => {
                setUser(e.target.value)
            }} />
            <div className="modalButton" onClick={save}>Save</div>
        </Modal>
    )
}

export default LogIn;