export const getUsers = (state) => {
    return state.usersReducer.users;
}
export const getPageSize = (state) => {
    return state.usersReducer.pageSize;
}
export const getTotalCount = (state) => {
    return state.usersReducer.totalCount;
}
export const getCurrentPage = (state) => {
    return state.usersReducer.currentPage;
}
export const getIsFetching = (state) => {
    return state.usersReducer.isFetching;
}
export const getDisabledUsers = (state) => {
    return state.usersReducer.disabledUsers;
}
export const getLoading = (state) => {
    return state.loadingReducer.loading;
}
export const getId = (state) => {
    return state.authReducer.id;
}
