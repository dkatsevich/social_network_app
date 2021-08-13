import React, {Component} from 'react';
import './profile.scss'
import {connect} from "react-redux";
import Spinner from "../spinner/spinner";
import {compose} from "redux";
import Profile from "./profileUser/profileUser";
import {Redirect} from "react-router-dom";
import withAuthRedirect from "../hoc/withAuthRedirect";
import {getUserStatus, loadedProfile, loadedProfileThunk, updateStatus} from "../../redux/reducers/profileReducer";
import {changeLoadingStatus} from "../../redux/reducers/loadingReducer";


class ProfileContainer extends Component {
    state = {
        redirect: false
    }

    componentDidMount() {
        let {userId, loadedProfileThunk, getUserStatus, loggedId} = this.props;
        if (!userId) {
            userId = loggedId;
            if (!userId) {
                this.setState({
                    redirect: true
                })
            }
        }
        loadedProfileThunk(userId)
        getUserStatus(userId)
    }

    render() {
        const {loading, profile, status, updateStatus} = this.props;
        const {redirect} = this.state;

        if (redirect) return <Redirect to='/login'/>

        if (loading) {
            return <Spinner/>
        }

        return (
            <Profile profile={profile} status={status} updateStatus={updateStatus}/>
        )
    }
}

const mapStateToProps = ({profileReducer: {profile, posts, newPost, status}, authReducer: {id}, loadingReducer: {loading}}) => ({
    profile,
    posts,
    newPost,
    loading,
    status,
    loggedId: id,
})

const actions = {
    loadedProfile,
    changeLoadingStatus,
    loadedProfileThunk,
    getUserStatus,
    updateStatus
}


export default compose(
    withAuthRedirect,
    connect(mapStateToProps, actions)
)(ProfileContainer);