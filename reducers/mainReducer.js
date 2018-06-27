import { combineReducers } from "redux";
import connection from "./connection";
import utilisateurs from "./utilisateurs";
import media from "./media";
import conversations from './conversations';
import messages from './messages';

const mainReducer = combineReducers({
    connection,
    utilisateurs,
    media,
    conversations,
    messages,
});

export default mainReducer;