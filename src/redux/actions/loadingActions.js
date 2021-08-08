
const setUsers = (users) => ({type: "SET_USERS", users});
const toggleFollow = (id) => ({type: "TOGGLE_FOLLOW", id});
const setTotalCount = (count) => ({type: "SET_TOTAL_COUNT", count});
const setCurrentPage = (currentPage) => ({type: "SET_CURRENT_PAGE", currentPage});
const changeLoadingStatus = (value) => ({type: "CHANGE_LOADING_STATUS", loading: value});

export {
    setUsers,
    toggleFollow,
    setTotalCount,
    setCurrentPage,
    changeLoadingStatus,
}