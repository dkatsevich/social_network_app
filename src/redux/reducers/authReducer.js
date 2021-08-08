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
                isAuth: true,
            }
        default:
            return state;
    }
}


export default messageReducer;