import React from "react";
import icon from './icon.jpg'
import './user.scss'
import {NavLink} from "react-router-dom";
import UserAPI from "../../../services/serviceApi";

const User = ({id, toggleFollow, toggleDisabled, disabledUsers, userInfo: {name, status, photos, followed}, me}) => {
    const imgSmall = photos ? (photos.small ? photos.small : icon) : icon;

    return (
        <div className="user">
            <NavLink to={`/profile/${id}`}>
                <img src={imgSmall} alt={name} className="user__avatar"/>
            </NavLink>
            <div className="user__wrapper">
                <div className="user__info">
                    <div className="user__name">{name}</div>
                    <div className="user__status">{status ? status : 'It\'s some default status...'}</div>
                </div>
                <div className="user__location">
                    <span>Good country</span>
                    <span>Cool city</span>
                </div>
            </div>
            {me ? '<= It\'s your profile)' :
                <button disabled={disabledUsers.some(user => user === id)}
                        onClick={() => {
                            toggleDisabled(true, id)
                            if (followed) {
                                UserAPI.toggleFollow(id, false)
                                    .then(res => {
                                        if (res.data.resultCode === 0) {
                                            toggleFollow(id)
                                        }
                                        toggleDisabled(false, id)
                                    })
                            } else {
                                UserAPI.toggleFollow(id, true)
                                    .then(res => {
                                        if (res.data.resultCode === 0) {
                                            toggleFollow(id)
                                        }
                                        toggleDisabled(false, id)
                                    })
                            }
                        }}
                        className="user__follow-btn">
                    {disabledUsers.some(user => user === id) ? 'Wait a second' : (followed ? "UnFollow" : "Follow")}
                </button>}
        </div>
    )
}

export default User;