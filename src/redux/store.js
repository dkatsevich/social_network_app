import {createStore} from "redux";
import reducer from './reducers/mainReducer';

const store = createStore(reducer);

export default store;