import * as api from '../api/api.js';


export const 
    // Actions destinées à la récupération des roomers
    POTENTIAL_ROOMER_GET_REQUEST   = 'POTENTIAL_ROOMER_GET_REQUEST', 
    POTENTIAL_ROOMER_GET_SUCCESS   = 'POTENTIAL_ROOMER_GET_SUCCESS', 
    POTENTIAL_ROOMER_GET_ERROR     = 'POTENTIAL_ROOMER_GET_ERROR',
    // Actions destinées à la validation d'un match
    POTENTIAL_ROOMER_POST_REQUEST = 'POTENTIAL_ROOMER_POST_REQUEST',
    POTENTIAL_ROOMER_POST_SUCCESS = 'POTENTIAL_ROOMER_POST_SUCCESS',
    POTENTIAL_ROOMER_POST_ERROR =   'POTENTIAL_ROOMER_POST_ERROR'

    ;

/**
 * Méthode permettant de récupérer la liste des collocataires potentiels
 * @param {object} filter un object contenant les filtres à appliquer sur les collocataies que l'on recupèrera
 */
export const handleGetLocatairesPotentiels = (filter = {}) => {
    return function (dispatch, getState) {
        //on dispatch l'état de la recherche des roomers
        dispatch({
            type: POTENTIAL_ROOMER_GET_REQUEST
        })
        
        //utilisations de l'api pour récupérer les roomers
        api.getLocatairesPotentiels(
            getState().connection.user.token,
            getState().connection.user.userId,
            filter,
            (dataPotentialRoomers) => { dispatch(handleGetLocatairesPotentielsSuccess(dataPotentialRoomers)) },
            (error) => { dispatch(handleGetLocatairesPotentielsError(error)) }
        )
    }
};

/**
 * Méthode permettant de transmettre les roomers reçues
 * @param {object} data 
 */
export const handleGetLocatairesPotentielsSuccess = (dataLocataires) => {

    //retour de l'action
    return {
        type:           POTENTIAL_ROOMER_GET_SUCCESS,
        roomers:        dataLocataires
    } 
};

/**
 * Méthode permettant d'indiquer qu'il y a eu une erreur lors de la récupération des roomers
 * @param {string} error le message d'erreur
 */
export const handleGetLocatairesPotentielsError = (error) => {
    return {
        type:       POTENTIAL_ROOMER_GET_ERROR,
        message:    error
    }
};

/**
 * Méthode permettant d'indiquer qu'il y a eu une erreur lors de la récupération des roomers
 * @param {string} error le message d'erreur
 */
export const handleLogout = () => {
    return {
        type:       POTENTIAL_ROOMER_LOGOUT
    }
};














/**
 * Fonction destinée à la validation ou le refus d'un matche
 * @param {int} conversationId la coonversation dans laquelle on envoie un message
 * @param {message} message le message que l'on souhaite envoyer
 */
export const handlePostMatchValidation = (matchId, targetUserId, statusValidation) => {
    return function (dispatch, getState) {

        // On dispatch le fait qu'on envoie un message
        dispatch({
            type: POTENTIAL_ROOMER_POST_REQUEST
        })


        // Utilisation de l'api pour envoyer un message
        api.postMatchValidation(
            getState().connection.user.token,
            getState().connection.user.userId,
            targetUserId,
            matchId,
            statusValidation,
            (message) => { dispatch(handlePostMatchValidationSuccess(message)) },
            (error) => { dispatch(handlePostMatchValidationError(error)) }
        )
    }
}


/**
 * Méthode permettant d'informer que le message a bien été envoyé
 * @param {object} message 
 */
export const handlePostMatchValidationSuccess = (dataMatch) => {

    //retour de l'action
    return {
        type:   POTENTIAL_ROOMER_POST_SUCCESS,
        match:  dataMatch
    } 
};

/**
 * Méthode permettant d'indiquer qu'il y a eu une erreur lors de la récupération des messages
 * @param {string} error le message d'erreur
 */
export const handlePostMatchValidationError = (error) => {
    return {
        type:   POTENTIAL_ROOMER_POST_ERROR,
        error:  error
    }
};