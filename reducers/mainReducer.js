import { combineReducers } from "redux";
import connection from "./connection";

const mainReducer = combineReducers({
    connection
    //TODO ajouter les autres reducers
});

export default mainReducer;