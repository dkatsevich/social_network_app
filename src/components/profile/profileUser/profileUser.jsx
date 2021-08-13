import React, {useEffect, useState} from "react";

import icon from "../../users/user/icon.jpg";
import Bg from "../content.jpg";
import MyPosts from "../MyPosts/MyPosts";

const Profile = ({status, updateStatus, profile: {fullName, photos, contacts}}) => {
    console.log('profile');
    const imgSmall = photos ? (photos.small ? photos.small : icon) : icon;
    const contactsList = contacts ? Object.entries(contacts).map((item, i) => {
        if (item[1]) {
            return <li key={i} className="profile__user-list-item">{item[0]}: {item[1]}</li>
        }
    }) : null;

    return (
        <div className="profile">
            <div className="profile__img-wrapper"><img className="profile__img" src={Bg} alt=""/></div>
            <MyInfo fullName={fullName} contactsList={contactsList} imgSmall={imgSmall} status={status}
                    updateStatus={updateStatus}/>
            <MyPosts photo={imgSmall}/>
        </div>
    )
}

const MyInfo = ({imgSmall, status, updateStatus, fullName, contactsList}) => {
    return (
        <div className="profile__user">
            <div className="profile__user-img"><img src={imgSmall} alt=""/></div>
            <div className="profile__user-info">
                <div className="profile__user-name">{fullName}</div>
                <StatusInfo status={status || 'Some Status'} updateStatus={updateStatus}/>
                <ul className="profile__user-list">
                    {contactsList}
                </ul>
            </div>
        </div>
    )
}

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
        // props.updateStatus(status);
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