import { combineReducers } from "redux";
import connection from "./connection";
import utilisateurs from "./utilisateurs";

const mainReducer = combineReducers({
    connection,
    utilisateurs
});

export default mainReducer;