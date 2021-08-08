import React from 'react';
import './dialogsItem.scss'

const DialogsItem = ({name, status}) => {
    return (
        <a href="#" className="dialog-item">
            <div className={`dialog-item__status ${status}`}></div>
            <div className="dialog-item__name">{name}</div>
        </a>
    )
}

export default DialogsItem;