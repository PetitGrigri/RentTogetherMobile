import * as api from '../api/api.js';


export const 
    //Types d'actions destinées à la récupération des conversations
    CONVERSATIONS_GET_REQUEST   = 'CONVERSATIONS_GET_REQUEST', 
    CONVERSATIONS_GET_SUCCESS   = 'CONVERSATIONS_GET_SUCCESS', 
    CONVERSATIONS_GET_ERROR     = 'CONVERSATIONS_GET_ERROR'

    ;

/**
 * Méthode permettant de se connecter et d'obtenir les conversations de l'utilisateurs connecté
 * @param {object} filter un object contenant les filtres à appliquer sur les conversations que l'on recupèrera
 */
export const handleGetConversations = (filter = {}) => {
    return function (dispatch, getState) {
        //on dispatch l'état de la recherche des conversations
        dispatch({
            type: CONVERSATIONS_GET_REQUEST
        })
        
        //utilisations de l'api pour récupérer les conversations
        api.getConversations(
            getState().connection.user.token,
            getState().connection.user.userId,
            filter,
            (user) => { dispatch(handleGetConversationsSuccess(user)) },
            (error) => { dispatch(handleGetConversationsError(error)) }
        )
    }
};

/**
 * Méthode permettant de transmettre les conversations reçues
 * @param {object} data 
 */
export const handleGetConversationsSuccess = (dataConversations) => {

    //retour de l'action
    return {
        type:           CONVERSATIONS_GET_SUCCESS,
        conversations:  dataConversations
    } 
};

/**
 * Méthode permettant d'indiquer qu'il y a eu une erreur lors de la récupération des conversations
 * @param {string} error le message d'erreur
 */
export const handleGetConversationsError = (error) => {
    return {
        type:       CONVERSATIONS_GET_ERROR,
        message:    error
    }
};
