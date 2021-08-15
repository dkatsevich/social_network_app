import {AuthAPI, SecurityAPI} from "../../services/serviceApi";
import {stopSubmit} from "redux-form";

const initialState = {
    login: null,
    id: null,
    email: null,
    isAuth: false,
    captchaUrl: null
};

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PUT_USER_DATA':
        case 'PUT_CAPTCHA_URL':
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state;
    }
}

const putUserData = (payload) => ({type: "PUT_USER_DATA", payload});
const putCaptchaUrl = (payload) => ({type: "PUT_CAPTCHA_URL", payload});

const authMeThunk = () => async (dispatch) => {
    const res = await AuthAPI.authMe()
    const {id, email, login} = res.data.data;
    if (res.data.resultCode === 0) {
        dispatch(putUserData({id, email, login, isAuth: true}))
    }
}
const loginMeThunk = (data) => async (dispatch) => {
    const res = await AuthAPI.logIn(data)
    if (res.data.resultCode === 0) {
        dispatch(authMeThunk());
    } else {
        if (res.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        dispatch(stopSubmit('login', {_error: res.data.messages[0]}))
    }
}
const logOutMeThunk = () => async (dispatch) => {
    const res = await AuthAPI.logOut()
    if (res.data.resultCode === 0) {
        dispatch(putUserData({id: null, email: null, login: null, isAuth: false}))
    }
}

const getCaptchaUrl = () => async (dispatch) => {
    const res = await SecurityAPI.getCaptchaUrl()

    if (res.data.url) {
        dispatch(putCaptchaUrl({captchaUrl: res.data.url}));
    } else {
        dispatch(stopSubmit('login', {_error: 'Error with loading captcha'}))
    }
}

export {
    putUserData,
    loginMeThunk,
    authMeThunk,
    logOutMeThunk,
}

export default messageReducer;