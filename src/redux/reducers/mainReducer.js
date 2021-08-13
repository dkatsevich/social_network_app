import {combineReducers} from "redux";
import { reducer as formReducer } from 'redux-form'

import messageReducer from "./messageReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import loadingReducer from "./loadingReducer";
import authReducer from "./authReducer";
import appReducer from "./appReducer";


const reducer = combineReducers({
    appReducer,
    messageReducer,
    profileReducer,
    usersReducer,
    loadingReducer,
    authReducer,
    form: formReducer
})


export default reducer