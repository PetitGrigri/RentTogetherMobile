import * as api from '../api/api.js';


export const 
    //Types d'actions destinées à la récupération des conversations
    CONVERSATIONS_GET_REQUEST   = 'CONVERSATIONS_GET_REQUEST', 
    CONVERSATIONS_GET_SUCCESS   = 'CONVERSATIONS_GET_SUCCESS', 
    CONVERSATIONS_GET_ERROR     = 'CONVERSATIONS_GET_ERROR',

    //Types d'actions destinées à la récupération des conversations
    CONVERSATIONS_POST_REQUEST   =                  'CONVERSATIONS_POST_REQUEST', 
    CONVERSATIONS_ADD_PARTICIPANTS_POST_REQUEST =   'CONVERSATIONS_ADD_PARTICIPANTS_POST_REQUEST',
    CONVERSATIONS_POST_SUCCESS   =                  'CONVERSATIONS_POST_SUCCESS', 
    CONVERSATIONS_POST_ERROR     =                  'CONVERSATIONS_POST_ERROR',

    // Action de nettoyage des conversations quand on se déconnecte
    CONVERSATIONS_LOGOUT =    'CONVERSATIONS_LOGOUT'
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

/**
 * Méthode permettant d'indiquer qu'il y a eu une erreur lors de la récupération des conversations
 * @param {string} error le message d'erreur
 */
export const handleLogout = () => {
    return {
        type:       CONVERSATIONS_LOGOUT
    }
};














/**
 * 
 * Méthode destinée à la création d'une nouvelle conversation
 * @param {array} participants Les participants d'une conversation (uniquement leur Id)
 * Cette méthode se passera en deux étapes :
 *  - La première consistera à créer une conversation
 *  - la seconde consistera à ajouter les utilisateur dans cette conversation
 */
export const handlePostConversation = (participants) => {
    return function (dispatch, getState) {

        // On dispatch le fait qu'on envoie un message
        dispatch({
            type: CONVERSATIONS_POST_REQUEST
        })

        // Utilisation de l'api pour envoyer un message
        api.postConversation(
            getState().connection.user.token,
            (conversation) => { dispatch(handlePostParticipantsConversation(getState().connection.user.token, conversation, participants)) },
            (error) => { dispatch(handlePostConversationError(error)) }
        )
    }
}

/**
 * Méthode permettant d'ajouter des utilisateurs à une conversation. Il s'agit de la seconde étape de la création d'une conversation
 * commencé avec la fonction handlePostConversation
 * 
 */
export const handlePostParticipantsConversation = (token, conversation, participants) => {

    return function (dispatch, getState) {

        dispatch({
            type: CONVERSATIONS_ADD_PARTICIPANTS_POST_REQUEST
        })

        // Utilisation de l'api pour envoyer un message
        api.postParticipantsConversation(
            token,
            conversation.conversationId,
            participants,
            (dataParticipants) => { dispatch(handlePostConversationSuccess(conversation, dataParticipants)) },
            (error) => { dispatch(handlePostConversationError(error)) }
        )
    };
};

/**
 * Méthode permettant d'indiquer qu'il y a eu une erreur lors de la récupération des messages
 * @param {string} error le message d'erreur
 */
const handlePostConversationSuccess = (conversation, dataParticipants) => {
    return function (dispatch, getState) {

        dispatch({
            type:           CONVERSATIONS_POST_SUCCESS,
            conversation:   conversation, 
            participants:   dataParticipants,
        });
    };
};

/**
 * Méthode permettant d'indiquer qu'il y a eu une erreur lors de la récupération des messages
 * @param {string} error le message d'erreur
 */
const handlePostConversationError = (error) => {
    return {
        type:   CONVERSATIONS_POST_ERROR,
        error:  error
    };
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




