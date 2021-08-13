import UserAPI from "../../services/serviceApi";
import {changeLoadingStatus} from "./loadingReducer";

const initialState = {
    users: [],
    totalCount: 10,
    pageSize: 4,
    currentPage: 1,
    isFetching: false,
    disabledUsers: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USERS":
            return {
                ...state,
                users: action.users
            }
        case "SET_TOTAL_COUNT":
            return {
                ...state,
                totalCount: action.count
            }
        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            }
        case "TOGGLE_DISABLED":
            let copyDisabled;
            if (action.loading) {
                copyDisabled = [
                    ...state.disabledUsers,
                    action.id
                ]
            } else {
                copyDisabled = state.disabledUsers.filter(user => user !== action.id)
            }

            return {
                ...state,
                disabledUsers: copyDisabled
            }
        case "TOGGLE_FOLLOW":
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.id) {
                        return {...user, followed: !user.followed}
                    }
                    return user;
                })
            }
        case "LIKE_USER":
            return {
                ...state,
                users: state.users.map((user, i) => {
                    if (i === action.id) {
                        return {...user, liked: !user.followed}
                    }
                    return user;
                })
            }
        default:
            return state;
    }
}

const setUsers = (users) => ({type: "SET_USERS", users});
const toggleFollowConfirm = (id) => ({type: "TOGGLE_FOLLOW", id});
const likeUser = (id) => ({type: "LIKE_USER", id});
const setTotalCount = (count) => ({type: "SET_TOTAL_COUNT", count});
const setCurrentPage = (currentPage) => ({type: "SET_CURRENT_PAGE", currentPage});
const toggleDisable = (value, id) => ({type: "TOGGLE_DISABLED", loading: value, id});

const getUsersThunk = (pageNumber, pageSize) => async (dispatch) => {
    dispatch(changeLoadingStatus(true))

    const res = await UserAPI.getUsers(pageNumber, pageSize)

    dispatch(setUsers(res.data.items))
    dispatch(setTotalCount(res.data.totalCount))
    dispatch(changeLoadingStatus(false))
}

const toggleFollowFlow = async (follow, dispatch, id) => {
    const res = await UserAPI.toggleFollow(id, follow)
    if (res.data.resultCode === 0) {
        dispatch(toggleFollowConfirm(id))
    }
    dispatch(toggleDisable(false, id))
}

const toggleFollowThunk = (followed, id) => (dispatch) => {
    dispatch(toggleDisable(true, id))
    if (followed) {
        toggleFollowFlow(false, dispatch, id)
    } else {
        toggleFollowFlow(true, dispatch, id)

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
    likeUser
}

export default usersReducer;