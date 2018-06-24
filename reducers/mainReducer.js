import { combineReducers } from "redux";
import connection from "./connection";
import utilisateurs from "./utilisateurs";
import media from "./media";

const mainReducer = combineReducers({
    connection,
    utilisateurs,
    media
});

export default mainReducer;