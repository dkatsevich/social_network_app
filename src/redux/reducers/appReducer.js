import {authMeThunk} from "./authReducer";

const initialState = {
    initialized: false,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true,
            }

        default:
            return state;
    }
}


const initializedSuccess = () => ({type: "INITIALIZED_SUCCESS"});

const processInitialize = () => (dispatch) => {
    const authPromise = dispatch(authMeThunk())

    Promise.all([authPromise]).then(() => {
        dispatch(initializedSuccess())
    })
}

export {
    processInitialize
}

export default appReducer;