import { combineReducers } from "redux";
import connection from "./connection";
import utilisateurs from "./utilisateurs";
import media from "./media";
import conversations from './conversations';

const mainReducer = combineReducers({
    connection,
    utilisateurs,
    media,
    conversations,
});

export default mainReducer;