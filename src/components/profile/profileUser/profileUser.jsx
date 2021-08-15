import React, {useEffect, useState} from "react";

import icon from "../../users/user/icon.jpg";
import Bg from "../content.jpg";
import MyPosts from "../MyPosts/MyPosts";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../formControls/formControls";

const Profile = ({status, updateStatus, isOwner, updatePhotos, postContacts, contactsError, profile, profile: {fullName, photos, contacts}, photoError}) => {
    const iconPhoto = photos ? photos.large : icon;


    return (
        <div className="profile">
            <div className="profile__img-wrapper"><img className="profile__img" src={Bg} alt=""/></div>
            <MyInfo fullName={fullName}
                    profile={profile}
                    iconPhoto={iconPhoto}
                    status={status}
                    updateStatus={updateStatus}
                    isOwner={isOwner}
                    updatePhotos={updatePhotos}
                    photoError={photoError}
                    postContacts={postContacts}
                    contactsError={contactsError}
            />
            <MyPosts photo={iconPhoto}/>
        </div>
    )
}

const MyInfo = ({iconPhoto, status, updateStatus, fullName, isOwner, updatePhotos, photoError, postContacts, profile}) => {
    const [editMode, setEditMode] = useState(false);
    const sendPhotos = (e) => {
        updatePhotos(e.target.files[0])
    }

    const updateContacts = (data) => {
        postContacts(data)
        .then(() => {
            setEditMode(false)
        })
    }


    return (
        <div className="profile__user">
            <div className="profile__user-img">
                <img src={iconPhoto} alt=""/>
                {isOwner && <input onChange={sendPhotos} type="file"/>}
                {!!photoError && photoError}
            </div>
            <div className="profile__user-info">
                <div className="profile__user-name">{fullName}</div>
                <StatusInfo status={status || 'Some Status'} updateStatus={updateStatus}/>
                {editMode
                    ? <ContactsReduxForm initialValues={profile} profile={profile} onSubmit={updateContacts}/>
                    : <ContactsInfo profile={profile}/>}
                {(isOwner && !editMode ) && <button className='profile__edit-change' onClick={() => setEditMode(true)}>Edit info</button>}
            </div>
        </div>
    )
}

const ContactsInfo = ({profile: {contacts}}) => {
    const contactArr = Object.keys(contacts).map((item) => {
        if (contacts[item]) {
            return <li key={item} className="profile__user-list-item">{item}: {contacts[item]}</li>
        }
    });

    return (
        <ul className="profile__user-list">
            {contactArr}
        </ul>
    )
}

const ContactsEditForm = ({handleSubmit, profile, profile: {contacts}, error}) => {
    const contactEditArr = Object.keys(contacts).map((item) => {
        return <div key={item}>
            <b>{item} :</b>
            <Field
                name={`contacts.${item}`}
                value={contacts[item]}
                placeholder='...'
                component={Input}
                type="text"
            />
        </div>
    });

    return (
        <form onSubmit={handleSubmit}>
            {
                error
                &&
                <div className="login__error"><span>{error}</span></div>
            }
            <div>
                <div>
                    <b>Full Name :</b>
                    <Field name="fullName"
                           placeholder='Your name...'
                           value={profile.fullName}
                           component={Input}
                           type="text"
                    />
                </div>
                <div>
                    <b>About me :</b>
                    <Field name="aboutMe"
                           value={profile.aboutMe}
                           placeholder='About you...'
                           component={Input}
                           type="text"
                    />
                </div>
                <div>
                    <b>Looking for a job :</b>
                    <label>
                        <Field name="lookingForAJob"
                               value={profile.lookingForAJob}
                               component={Input}
                               type="checkbox"
                        />
                    </label>
                </div>
                <div>
                    <b>Job description :</b>
                    <Field name="lookingForAJobDescription"
                           value={profile.lookingForAJobDescription}
                           placeholder='Write about your future job...'
                           component={Input}
                           type="text"
                    />
                </div>
                {contactEditArr}
            </div>
            <button className='profile__edit-change'>Save</button>
        </form>
    )
}

const ContactsReduxForm = reduxForm({
    form: 'contactsEdit',
    enableReinitialize : true
})(ContactsEditForm)


const StatusInfo = (props) => {
    const [status, setStatus] = useState(props.status);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status])

    const onChangeStatus = (e) => {
        setStatus(e.target.value)
    }

    const EnabledEdit = () => {
        setEditMode(true)
    }

    const DisableEdit = () => {
        setEditMode(false)
        props.updateStatus(status);
    }

    return (
        <div className='user-status'>
            {!editMode ?
                <div className='user-status__span'>
                    <span onDoubleClick={EnabledEdit}>{props.status}</span>
                </div>
                :
                <div className='user-status__input'>
                    <input onChange={onChangeStatus} onBlur={DisableEdit} autoFocus={true} value={status}/>
                </div>
            }
            {/*<button  className="user-status__edit">Click to edit</button>*/}
        </div>
    )
}

export default Profile;
