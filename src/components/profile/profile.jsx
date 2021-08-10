import React, {Component} from 'react';
import './profile.scss'
import Bg from './content.jpg'
import icon from './../users/user/icon.jpg'
import MyPosts from "./MyPosts/MyPosts";
import {connect} from "react-redux";
import {getUserStatus, loadedProfile, loadedProfileThunk, updateStatus} from "../../redux/actions/profileActions";
import {changeLoadingStatus} from "../../redux/actions/loadingActions";
import Spinner from "../spinner/spinner";
import {compose} from "redux";
import Profile from "./profileUser/profileUser";


class ProfileContainer extends Component {
    componentDidMount() {
        const {id, loadedProfileThunk, getUserStatus} = this.props;
        loadedProfileThunk(id)
        getUserStatus(id)
    }

    render() {
        const {loading, profile, status, updateStatus} = this.props;

        if (loading) {
            return <Spinner/>
        }

        return (
            <Profile profile={profile} status={status} updateStatus={updateStatus}/>
        )
    }
}





const mapStateToProps = ({profileReducer: {profile, posts, newPost, status}, loadingReducer: {loading}}) => ({
    profile,
    posts,
    newPost,
    loading,
    status
})

const actions = {
    loadedProfile,
    changeLoadingStatus,
    loadedProfileThunk,
    getUserStatus,
    updateStatus
}


export default compose(
    // withAuthRedirect,
    connect(mapStateToProps, actions)
)(ProfileContainer);