import './Modal.css'
import {ReactComponent as Close} from './../svg/close.svg'

function Modal({ title, show, onClose, noClose=false, children, className="", size='big'}) {
    return (
        <div className={"modalBackground" + (show ? " modal-show" : "")} onClick={onClose}>
            <div className={className + ' modal'} onClick={(e) => e.stopPropagation()}>
                <div className='modalHeader'>
                    <div className='modalTitle'>{title}</div>
                    {!noClose &&
                        <div className='modalClose' onClick={onClose}>
                            <Close />
                        </div>
                    }
                </div>
                <div className={'modalBody ' + size}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal;