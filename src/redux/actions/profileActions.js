import {ProfileAPI} from "../../services/serviceApi";
import {changeLoadingStatus} from "./loadingActions";

const addPost = (data) => ({type: "ADD_POST", data});
const loadedProfile = (profile) => ({type: "LOADED_PROFILE", profile});
const setStatus = (status) => ({type: "SET_STATUS", status});

const loadedProfileThunk = (id) => (dispatch) => {
    dispatch(changeLoadingStatus(true))
    ProfileAPI.getProfile(id)
        .then(res => {
            dispatch(loadedProfile(res.data))
            dispatch(changeLoadingStatus(false))
        })
}

const getUserStatus = (id) => (dispatch) => {
    ProfileAPI.getStatus(id)
        .then(res => {
            dispatch(setStatus(res.data))
        })
}

const updateStatus = (status) => (dispatch) => {
    debugger
    ProfileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        });

}

export {
    addPost,
    loadedProfile,
    loadedProfileThunk,
    getUserStatus,
    updateStatus
}