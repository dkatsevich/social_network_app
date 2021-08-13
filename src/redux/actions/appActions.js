import {authMeThunk} from "./authActions";

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