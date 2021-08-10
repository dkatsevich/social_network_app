import React from 'react';
import friend from './../friend1.png';
import me from './../myavatar.png';
import './messages.scss';
import {connect} from "react-redux";
import AddMessageForm from "./messagesForm/messagesForm";
import {postMessage} from "../../../redux/actions/messageActions";


const Messages = ({messages, postMessage}) => {

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

    const addMessage = (data) => {
        postMessage(data.message);
    }

    return (
        <div className="messages">
            {items}
            <AddMessageForm onSubmit={addMessage}/>
        </div>
    )
}

const mapStateToProps = ({messageReducer: {messages}}) => ({messages});
const actions = {
    postMessage
}


export default connect(mapStateToProps, actions)(Messages);