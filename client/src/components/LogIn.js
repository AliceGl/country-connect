import './LogIn.css'
import Modal from './Modal'
import { useState } from 'react'

function LogIn() {
    const [visible, setVisible] = useState(true)
    const [user, setUser] = useState(null)

    const save = () => { setVisible(false) }
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