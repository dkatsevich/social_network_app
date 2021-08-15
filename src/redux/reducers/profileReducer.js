import {ProfileAPI} from "../../services/serviceApi";
import {changeLoadingStatus} from "./loadingReducer";
import {stopSubmit} from "redux-form";

const initialState = {
    posts: [
        {id: 1, body: 'Hey, why nobody love me 0?'},
        {id: 2, body: 'Hey, why nobody love me 1?'},
        {id: 3, body: 'Hey, why nobody love me 2?'},
        {id: 4, body: 'Hey, why nobody love me 3?'},
        {id: 5, body: 'Hey, why nobody love me 4?'},
    ],
    profile: {},
    status: '',
    photoError: null,
    contactsError: false
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_POST':
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {
                        id: 6,
                        body: action.data
                    }
                ],
            }
        case 'LOADED_PROFILE':
            return {
                ...state,
                profile: action.profile,
                photoError: null,
                contactsError: false
            }
        case 'GET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'UPDATE_PHOTOS_SUCCESS':
            return {
                ...state,
                profile: {...state.profile, photos: action.photosData},
                photoError: null
            }
        case 'UPDATE_PHOTOS_FAILURE':
            return {
                ...state,
                photoError: action.error
            }
        case 'POST_CONTACTS_FAILURE':
            return {
                ...state,
                contactsError: true
            }


        default:
            return state;
    }
}


const addPost = (data) => ({type: "ADD_POST", data});
const loadedProfile = (profile) => ({type: "LOADED_PROFILE", profile});
const setStatus = (status) => ({type: "SET_STATUS", status});
const updatePhotosSuccess = (photosData) => ({type: "UPDATE_PHOTOS_SUCCESS", photosData});
const updatePhotosFailure = (error) => ({type: "UPDATE_PHOTOS_FAILURE", error});
const postContactsFailure = () => ({type: "POST_CONTACTS_FAILURE"});

const loadedProfileThunk = (id) => async (dispatch) => {
    dispatch(changeLoadingStatus(true))
    const res = await ProfileAPI.getProfile(id)
    dispatch(loadedProfile(res.data))
    dispatch(changeLoadingStatus(false))
}

const getUserStatus = (id) => async (dispatch) => {
    const res = await ProfileAPI.getStatus(id)
    dispatch(setStatus(res.data))
}

const updateStatus = (status) => async (dispatch) => {
    const res = await ProfileAPI.updateStatus(status)
    if (res.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

const updatePhotos = (photo) => async (dispatch) => {
    const res = await ProfileAPI.updatePhotos(photo)

    if (res.data.resultCode === 0) {
        dispatch(updatePhotosSuccess(res.data.data.photos));
    } else {
        dispatch(updatePhotosFailure(res.data.messages[0]))
    }
}

const postContacts = (data) => async (dispatch, getState) => {
    const myId = getState().authReducer.id;
    const res = await ProfileAPI.postContacts(data)
    if (res.data.resultCode === 0) {
        dispatch(loadedProfileThunk(myId));
    } else {
        dispatch(stopSubmit('contactsEdit', {_error: res.data.messages[0]}))
        // dispatch(postContactsFailure())
        Promise.reject(res.data.messages[0])
    }
}


export {
    addPost,
    loadedProfile,
    loadedProfileThunk,
    getUserStatus,
    updateStatus,
    updatePhotos,
    postContacts
}

export default profileReducer;