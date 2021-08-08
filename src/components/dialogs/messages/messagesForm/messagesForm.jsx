import React from 'react';
import './messagesForm.scss';
import {connect} from "react-redux";
import {updateMessage, postMessage} from "../../../../redux/actions/messageActions";


const AddMessageForm = ({updateMessage, postMessage, newMessage}) => {

    const changeInput = (e) => {
        console.log(e.target.value);
        updateMessage(e.target.value)
    }

    const addMessage = (e) => {
        e.preventDefault();
        if (newMessage) {
            postMessage();
        }
    }

    return (
        <form onSubmit={addMessage} className="message-form">
            <input onChange={changeInput} type="text" className="message-form__input" value={newMessage}
                   placeholder='Type here...'/>
            <button className="message-form__button">Send Message</button>
        </form>
    )
}

const mapStateToProps = ({messageReducer: {newMessage}}) => ({newMessage});

const actions = {
    updateMessage,
    postMessage
}

export default connect(mapStateToProps, actions)(AddMessageForm);