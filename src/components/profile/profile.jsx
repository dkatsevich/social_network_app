import React, {Component} from 'react';
import './profile.scss'
import {connect} from "react-redux";
import Spinner from "../spinner/spinner";
import {compose} from "redux";
import Profile from "./profileUser/profileUser";
import {Redirect, withRouter} from "react-router-dom";
import withAuthRedirect from "../hoc/withAuthRedirect";
import {
    getUserStatus,
    loadedProfile,
    loadedProfileThunk, postContacts,
    updatePhotos,
    updateStatus
} from "../../redux/reducers/profileReducer";
import {changeLoadingStatus} from "../../redux/reducers/loadingReducer";


class ProfileContainer extends Component {
    state = {
        redirect: false
    }
    refreshProfile = () => {
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
    componentDidMount() {
        this.refreshProfile();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.userId !== this.props.userId) {
            this.refreshProfile();
        }
    }

    render() {
        const {loading, profile, status, updateStatus, updatePhotos, photoError, postContacts, contactsError} = this.props;
        const {redirect} = this.state;

        if (redirect) return <Redirect to='/login'/>

        if (loading) {
            return <Spinner/>
        }

        return (
            <Profile
                profile={profile}
                status={status}
                updateStatus={updateStatus}
                isOwner={!this.props.match.params.userId}
                updatePhotos={updatePhotos}
                photoError={photoError}
                postContacts={postContacts}
                contactsError={contactsError}
            />
        )
    }
}

const mapStateToProps = ({profileReducer: {profile, posts, newPost, status, photoError, contactsError}, authReducer: {id}, loadingReducer: {loading}}) => ({
    profile,
    posts,
    newPost,
    loading,
    status,
    photoError,
    contactsError,
    loggedId: id,
})

const actions = {
    loadedProfile,
    changeLoadingStatus,
    loadedProfileThunk,
    getUserStatus,
    updateStatus,
    updatePhotos,
    postContacts
}


export default compose(
    withAuthRedirect,
    withRouter,
    connect(mapStateToProps, actions)
)(ProfileContainer);