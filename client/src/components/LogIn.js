import './LogIn.css'
import Modal from './Modal'
import { useState } from 'react'
import Axios from 'axios'
import Cookies from 'universal-cookie'

function LogIn() {
    const cookies = new Cookies()
    const username = cookies.get('username');

    const [visible, setVisible] = useState(username === undefined);
    const [user, setUser] = useState(null)

    const save = () => { 
        Axios.post("http://localhost:3001/login", {username: user}).then(res => {
            const {userId, username} = res.data;

            cookies.set("username", username);
            cookies.set("userId", userId);
        })
        setVisible(false)
    }
    return (
        <Modal className="logIn" title="What is your name?" show={visible} onClose={() => {}} noClose={true}>
            <input className="inputField" placeholder="Type it here..." onChange={(e) => {
                setUser(e.target.value)
            }} />
            <div className="modalButton" onClick={save}>Save</div>
        </Modal>
    )
}

export default LogIn;