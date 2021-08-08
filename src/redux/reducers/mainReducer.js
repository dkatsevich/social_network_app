import {combineReducers} from "redux";

import messageReducer from "./messageReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import loadingReducer from "./loadingReducer";
import authReducer from "./authReducer";

const reducer = combineReducers({
    messageReducer,
    profileReducer,
    usersReducer,
    loadingReducer,
    authReducer
})


export default reducer