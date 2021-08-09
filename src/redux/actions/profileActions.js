import UserAPI from "../../services/serviceApi";
import {changeLoadingStatus} from "./loadingActions";

const updatePost = (body) => ({type: "UPDATE_POST", body});
const addPost = () => ({type: "ADD_POST"});
const loadedProfile = (profile) => ({type: "LOADED_PROFILE", profile});

const loadedProfileThunk = (id) => (dispatch) => {
    dispatch(changeLoadingStatus(true))
    UserAPI.getProfile(id)
        .then(res => {
            dispatch(loadedProfile(res.data))
            dispatch(changeLoadingStatus(false))
        })
}

export {
    updatePost,
    addPost,
    loadedProfile,
    loadedProfileThunk,
}