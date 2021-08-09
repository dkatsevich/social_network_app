import {changeLoadingStatus} from "./loadingActions";
import UserAPI from "../../services/serviceApi";

const setUsers = (users) => ({type: "SET_USERS", users});
const toggleFollowConfirm = (id) => ({type: "TOGGLE_FOLLOW", id});
const setTotalCount = (count) => ({type: "SET_TOTAL_COUNT", count});
const setCurrentPage = (currentPage) => ({type: "SET_CURRENT_PAGE", currentPage});
const toggleDisable = (value, id) => ({type: "TOGGLE_DISABLED", loading: value, id});

const getUsersThunk = (pageNumber, pageSize) => (dispatch) => {
    dispatch(changeLoadingStatus(true))

    UserAPI.getUsers(pageNumber, pageSize)
        .then(res => {
            dispatch(setUsers(res.data.items))
            dispatch(setTotalCount(res.data.totalCount))
            dispatch(changeLoadingStatus(false))
        })


}

const toggleFollowThunk = (followed, id) => (dispatch) => {
    dispatch(toggleDisable(true, id))
    if (followed) {
        UserAPI.toggleFollow(id, false)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(toggleFollowConfirm(id))
                }
                dispatch(toggleDisable(false, id))
            })
    } else {
        UserAPI.toggleFollow(id, true)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(toggleFollowConfirm(id))
                }
                dispatch(toggleDisable(false, id))
            })
    }
}

export {
    getUsersThunk,
    toggleFollowThunk,
    setUsers,
    toggleFollowConfirm,
    setTotalCount,
    setCurrentPage,
    toggleDisable,
}