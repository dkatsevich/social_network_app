import React from 'react';
import friend from './../friend1.png';
import me from './../myavatar.png';
import './messages.scss';
import {connect} from "react-redux";
import {updateMessage, postMessage} from "../../../redux/actions/messageActions";


const Messages = ({messages, newMessage, updateMessage, postMessage}) => {

    const items = messages.map(message => {
        const {id, body, address, img, name, who} = message;

        return (
            <div key={id} className={`message message-${address}`}>
                <div className="message__user">
                    <img src={me} alt=""/>
                    <div className="message__user-name">{name}</div>
                </div>
                <div className="message__content">{body}
                </div>
            </div>
        )
    })

    const changeInput = (e) => {
        console.log(e.target.value);
        updateMessage(e.target.value)
    }

    const addMessage = (e) => {
        e.preventDefault();
        postMessage();
    }

    return (
        <div className="messages">
            {items}
            


        </div>
    )
}

const MessageForm = ({addMessage, changeInput, newMessage}) => {
    return (
        <form onSubmit={addMessage} className="message-form">
            <input onChange={changeInput} type="text" className="message-form__input" value={newMessage} placeholder='Type here...'/>
            <button className="message-form__button">Send Message</button>
        </form>
    )
}

const AddMessageForm = connect()

const mapStateToProps = ({messageReducer: {messages}}) => ({messages});

const actions = {
    updateMessage,
    postMessage
}

export default connect(mapStateToProps)(Messages);