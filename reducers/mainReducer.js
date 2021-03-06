/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */
import { combineReducers } from "redux";
import connection from "./connection";
import utilisateurs from "./utilisateurs";
import media from "./media";
import conversations from './conversations';
import messages from './messages';
import referentielCaracteristiques from './referentielCaracteristiques';
import matches from './matches';
import localisations from './localisations';
import logements from './logements';
import messagesLogement from './messagesLogement';

const mainReducer = combineReducers({
    connection,
    utilisateurs,
    media,
    conversations,
    messages,
    referentielCaracteristiques,
    matches,
    localisations,
    logements,
    messagesLogement
});

export default mainReducer;