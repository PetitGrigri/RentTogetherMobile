import * as api from '../api/api.js';


export const 
    //Types d'actions destinées à la récupération des roomers
    POTENTIAL_ROOMER_GET_REQUEST   = 'POTENTIAL_ROOMER_GET_REQUEST', 
    POTENTIAL_ROOMER_GET_SUCCESS   = 'POTENTIAL_ROOMER_GET_SUCCESS', 
    POTENTIAL_ROOMER_GET_ERROR     = 'POTENTIAL_ROOMER_GET_ERROR'

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
