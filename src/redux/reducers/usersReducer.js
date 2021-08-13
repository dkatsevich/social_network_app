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
                users: state.users.map((user,i) => {
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


export default usersReducer;