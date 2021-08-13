import {AuthAPI} from "../../services/serviceApi";
import {stopSubmit} from "redux-form";

const putUserData = (data) => ({type: "PUT_USER_DATA", data});
const authMeThunk = () => (dispatch) => {
    return AuthAPI.authMe()
        .then(res => {
            const {id, email, login} = res.data.data;
            if (res.data.resultCode === 0) {
                dispatch(putUserData({id, email, login, isAuth: true}))
            }
        })
}

const loginMeThunk = (data) => (dispatch) => {
    AuthAPI.logIn(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(authMeThunk());
            } else {
                dispatch(stopSubmit('login', {_error: res.data.messages[0]}))
            }
        })
}

const logOutMeThunk = () => (dispatch) => {
    AuthAPI.logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(putUserData({id: null, email: null, login: null, isAuth: false}))
            }
        })
}

export {
    putUserData,
    loginMeThunk,
    authMeThunk,
    logOutMeThunk,
}