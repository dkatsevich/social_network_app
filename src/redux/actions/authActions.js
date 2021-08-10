import {AuthAPI} from "../../services/serviceApi";
import {bindActionCreators} from "react-redux";

const putUserData = (data) => ({type: "PUT_USER_DATA", data});
const authMeThunk = () => (dispatch) => {
    AuthAPI.authMe()
        .then(res => {
            const {id, email, login} = res.data.data;
            if (res.data.resultCode === 0) {
                dispatch(putUserData({id, email, login}))
            }
        })
}

const loginMeThunk = (data) => (dispatch) => {
    AuthAPI.login(data)
        .then(res => {
            if (res.resultCode === 0) {
                authMeThunk()(dispatch);
            }
        })
}

export {
    putUserData,
    loginMeThunk,
    authMeThunk,
}