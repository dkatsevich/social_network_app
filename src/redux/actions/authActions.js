import UserAPI from "../../services/serviceApi";

const putUserData = (data) => ({type: "PUT_USER_DATA", data});
const authThunk = () => (dispatch) => {
    UserAPI.authMe()
        .then(res => {
            const {id, email, login} = res.data.data;
            if (res.data.resultCode === 0) {
                dispatch(putUserData({id, email, login}))
            }
        })
}

export {
    putUserData,
    authThunk,
}