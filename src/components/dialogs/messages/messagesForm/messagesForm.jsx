import React from 'react';
import './messagesForm.scss';
import {Field, reduxForm} from "redux-form";


const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className="message-form">
            <Field type="text" component={'input'} name={'message'} className="message-form__input"
                   placeholder='Type here...'/>
            <button className="message-form__button">Send Message</button>
        </form>
    )
}


export default reduxForm({form: 'messageForm'})(AddMessageForm);