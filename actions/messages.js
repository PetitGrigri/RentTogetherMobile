/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */
import * as api from '../api/api.js';


export const 
    //Types d'actions destinées à la récupération des messages
    MESSAGES_GET_REQUEST   = 'MESSAGES_GET_REQUEST', 
    MESSAGES_GET_SUCCESS   = 'MESSAGES_GET_SUCCESS', 
    MESSAGES_GET_ERROR     = 'MESSAGES_GET_ERROR',

    //Types d'actions destinées à l'envoi d'un message'
    MESSAGES_POST_REQUEST   = 'MESSAGES_POST_REQUEST', 
    MESSAGES_POST_SUCCESS   = 'MESSAGES_POST_SUCCESS', 
    MESSAGES_POST_ERROR     = 'MESSAGES_POST_ERROR',

    // Cleaning 
    MESSAGES_CLEAN_REQUEST = 'MESSAGES_CLEAN_REQUEST'
    ;

/**
 * Méthode permettant de se connecter et d'obtenir les messages de l'utilisateurs connecté
 * @param {object} filter un object contenant les filtres à appliquer sur les messages que l'on recupèrera
 */
export const handleGetMessages = (conversationId, filter = { $orderby: 'createdDate DESC'} ) => {
    return function (dispatch, getState) {
        //on dispatch l'état de la recherche des messages
        dispatch({
            type: MESSAGES_GET_REQUEST
        })
        
        //utilisations de l'api pour récupérer les messages
        api.getMessages(
            getState().connection.user.token,
            conversationId,
            filter,
            (user) => { dispatch(handleGetMessagesSuccess(user)) },
            (error) => { dispatch(handleGetMessagesError(error)) }
        )
    }
};

/**
 * Méthode permettant de transmettre les messages reçues
 * @param {object} data 
 */
export const handleGetMessagesSuccess = (dataMessages) => {
    //retour de l'action
    return {
        type:      MESSAGES_GET_SUCCESS,
        messages:  dataMessages
    } 
};

/**
 * Méthode permettant d'indiquer qu'il y a eu une erreur lors de la récupération des messages
 * @param {string} error le message d'erreur
 */
export const handleGetMessagesError = (error) => {
    return {
        type:   MESSAGES_GET_ERROR,
        error:  error
    }
};

/**
 * Méthode destinée à l'envoie d'un message
 * @param {int} conversationId la coonversation dans laquelle on envoie un message
 * @param {message} message le message que l'on souhaite envoyer
 */
export const handlePostMessage = (conversationId, message) => {
    return function (dispatch, getState) {

        // On dispatch le fait qu'on envoie un message
        dispatch({
            type: MESSAGES_POST_REQUEST
        })

        // Utilisation de l'api pour envoyer un message
        api.postMessage(
            getState().connection.user.token,
            getState().connection.user.userId,
            conversationId,
            message,
            (message) => { dispatch(handlePostMessageSuccess(message)) },
            (error) => { dispatch(handlePostMessageError(error)) }
        )
    }
}


/**
 * Méthode permettant d'informer que le message a bien été envoyé
 * @param {object} message 
 */
export const handlePostMessageSuccess = (message) => {

    //retour de l'action
    return {
        type:     MESSAGES_POST_SUCCESS,
        message:  message
    } 
};

/**
 * Méthode permettant d'indiquer qu'il y a eu une erreur lors de la récupération des messages
 * @param {string} error le message d'erreur
 */
export const handlePostMessageError = (error) => {
    return {
        type:   MESSAGES_POST_ERROR,
        error:  error
    }
};



/**
 * Méthode permettant de supprimer du state,
 * @param {string} error le message d'erreur
 */
export const handleCleanMessage = () => {
    return {
        type:   MESSAGES_CLEAN_REQUEST
    }
};

