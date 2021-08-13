const initialState = {
    loading: true,
};

const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE_LOADING_STATUS":
            return {
                ...state,
                loading: action.loading
            }
        default:
            return state;
    }
}


const changeLoadingStatus = (value) => ({type: "CHANGE_LOADING_STATUS", loading: value});

export {
    changeLoadingStatus,
}

export default loadingReducer;