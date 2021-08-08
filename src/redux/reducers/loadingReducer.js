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


export default loadingReducer;