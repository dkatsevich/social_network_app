import {AuthAPI} from "../../services/serviceApi";
import {stopSubmit} from "redux-form";

const initialState = {
    login: null,
    id: null,
    email: null,
    isAuth: false
};

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PUT_USER_DATA':
            return {
                ...state,
                ...action.data,
            }

        default:
            return state;
    }
}

const putUserData = (data) => ({type: "PUT_USER_DATA", data});

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
        dispatch(stopSubmit('login', {_error: res.data.messages[0]}))
    }
}
const logOutMeThunk = () => async (dispatch) => {
    const res = await AuthAPI.logOut()
    if (res.data.resultCode === 0) {
        dispatch(putUserData({id: null, email: null, login: null, isAuth: false}))
    }
}

export {
    putUserData,
    loginMeThunk,
    authMeThunk,
    logOutMeThunk,
}

export default messageReducer;