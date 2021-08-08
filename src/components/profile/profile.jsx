import React, {Component} from 'react';
import './profile.scss'
import Bg from './content.jpg'
import icon from './../users/user/icon.jpg'
import MyPosts from "./MyPosts/MyPosts";
import {connect} from "react-redux";
import {loadedProfile} from "../../redux/actions/profileActions";
import {changeLoadingStatus} from "../../redux/actions/loadingActions";
import Spinner from "../spinner/spinner";
import * as axios from "axios";


class ProfileContainer extends Component {
    componentDidMount() {
        const {loadedProfile, changeLoadingStatus, id} = this.props;

        changeLoadingStatus(true)

        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`)
            .then(res => {
                loadedProfile(res.data)
                changeLoadingStatus(false)
            })
    }

    render() {
        const {loading, profile} = this.props;
        if (loading) {
            return <Spinner/>
        }

        return (
            <Profile profile={profile}/>
        )
    }
}

const Profile = ({profile: {fullName, photos, contacts}}) => {
    const imgSmall = photos ? (photos.small ? photos.small : icon) : icon;

    return (
        <div className="profile">
            <div className="profile__img-wrapper"><img className="profile__img" src={Bg} alt=""/></div>
            <div className="profile__user">
                <div className="profile__user-img"><img src={imgSmall} alt=""/></div>
                <div className="profile__user-info">
                    <div className="profile__user-name">{fullName}</div>
                    <ul className="profile__user-list">
                        {contacts.facebook ? <li className="profile__user-list-item">facebook: {contacts.facebook}</li> : null}
                        {contacts.website ? <li className="profile__user-list-item">website: {contacts.website}</li> : null}
                        {contacts.vk ? <li className="profile__user-list-item">vk: {contacts.vk}</li> : null}
                        {contacts.twitter ? <li className="profile__user-list-item">twitter: {contacts.twitter}</li> : null}
                        {contacts.instagram ? <li className="profile__user-list-item">instagram: {contacts.instagram}</li> : null}
                        {contacts.youtube ? <li className="profile__user-list-item">youtube: {contacts.youtube}</li> : null}
                        {contacts.github ? <li className="profile__user-list-item">github: {contacts.github}</li> : null}
                        {contacts.mainLink ? <li className="profile__user-list-item">mainLink: {contacts.mainLink}</li> : null}
                    </ul>
                </div>
            </div>
            <MyPosts photos={photos.small ? photos : {small: icon}}/>
        </div>
    )
}


const mapStateToProps = ({profileReducer: {profile, posts, newPost}, loadingReducer: {loading}}) => ({
    profile,
    posts,
    newPost,
    loading,
})

const actions = {
    loadedProfile,
    changeLoadingStatus
}

export default connect(mapStateToProps, actions)(ProfileContainer);