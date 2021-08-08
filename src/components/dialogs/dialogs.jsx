import React from 'react';
import DialogsItem from "./dialogsItem/dialogsItem";
import './dialogs.scss'
import Messages from "./messages/messages";

const Dialogs = () => {
    return (
        <div className="dialogs">
            <div className="dialogs__title">DIALOGS</div>
            <div className="dialogs__wrapper">
                <div className="dialogs-items">
                    <DialogsItem status='online' name="Andrew"/>
                    <DialogsItem status='offline' name='Viktor'/>
                    <DialogsItem status='online' name="Andrew"/>
                    <DialogsItem status='offline' name='Viktor'/>
                    <DialogsItem status='online' name="Andrew"/>
                    <DialogsItem status='offline' name='Viktor'/>
                </div>
                <Messages/>
            </div>
        </div>
    )
}

export default Dialogs;