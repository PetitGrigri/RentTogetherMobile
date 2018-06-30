import { 
    MESSAGES_GET_REQUEST, 
    MESSAGES_GET_SUCCESS, 
    MESSAGES_GET_ERROR, 

    MESSAGES_POST_REQUEST,
    MESSAGES_POST_SUCCESS,
    MESSAGES_POST_ERROR,

    MESSAGES_CLEAN_REQUEST

 } from '../actions/messages';

import { isset } from '../utils/check';

//le state initial
const initialMessagesState = {
    loadingMessages :   false,
    loadingPostMessage: false,
    messages:           [],
    error:              "",
}

const messages = (state = initialMessagesState, action) => {

    switch(action.type) {
        // Demande de récupération des messages
        case MESSAGES_GET_REQUEST: 
            return Object.assign({}, state, {
                messages:           [],
                loadingMessages :   true
            });

        // Prise en compte de la récupération des messages
        case  MESSAGES_GET_SUCCESS: 
            
            return Object.assign({}, state, {
                messages:           action.messages,
                loadingMessages:    false
            });

        // Erreur lors de la récupération dess messages
        case  MESSAGES_GET_ERROR : 
            return Object.assign({}, state, {
                loadingMessages :  false,
                error:             action.message||"Erreur de connexion",
            });



        // Demande d'envoie d'un message
        case MESSAGES_POST_REQUEST: 
            return Object.assign({}, state, {
                loadingPostMessage : true
            });

        // Prise en compte d'un message bien envoyé
        case  MESSAGES_POST_SUCCESS: 

            return Object.assign({}, state, {
                messages:               [action.message, ...state.messages],
                loadingPostMessage:    false
            });

        // Erreur lors de l'envoie du message
        case  MESSAGES_POST_ERROR : 
            return Object.assign({}, state, {
                loadingPostMessage :  false,
                error:             action.message||"Erreur de connexion",
            });
                    
        case MESSAGES_CLEAN_REQUEST: 
            return Object.assign({}, state, {
                messages:           [],
            });


        //autres 
        default : 
            return state;
    }
}

export default messages;