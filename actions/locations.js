import * as api from '../api/api.js';


export const 
    //Types d'actions destinées à la récupération des roomers
    CONNECTED_USER_LOCATION_GET_REQUEST   = 'CONNECTED_USER_LOCATION_GET_REQUEST', 
    CONNECTED_USER_LOCATION_GET_SUCCESS   = 'CONNECTED_USER_LOCATION_GET_SUCCESS', 
    CONNECTED_USER_LOCATION_GET_ERROR     = 'CONNECTED_USER_LOCATION_GET_ERROR'

    ;

/**
 * Méthode permettant de récupérer la liste des collocataires potentiels
 * @param {object} filter un object contenant les filtres à appliquer sur les collocataies que l'on recupèrera
 */
export const handleGetConnectedUserLocation = () => {
    return function (dispatch, getState) {
        //on dispatch l'état de la recherche des roomers
        dispatch({
            type: CONNECTED_USER_LOCATION_GET_REQUEST
        })
        
        //utilisations de l'api pour récupérer les roomers
        api.getConnectedUserLocation(
            getState().connection.user.token,
            getState().connection.user.userId,
            (dataLocations) => { dispatch(handleGetConnectedUserLocationSuccess(dataLocations)) },
            (error) => { dispatch(handleGetConnectedUserLocationError(error)) }
        )
    }
};

/**
 * Méthode permettant de transmettre les roomers reçues
 * @param {object} data 
 */
export const handleGetConnectedUserLocationSuccess = (dataLocations) => {
console.log('handleGetConnectedUserLocationSuccess', dataLocations);
    //retour de l'action
    return {
        type:           CONNECTED_USER_LOCATION_GET_SUCCESS,
        locations:      dataLocations
    } 
};

/**
 * Méthode permettant d'indiquer qu'il y a eu une erreur lors de la récupération des roomers
 * @param {string} error le message d'erreur
 */
export const handleGetConnectedUserLocationError = (error) => {
    return {
        type:       CONNECTED_USER_LOCATION_GET_ERROR,
        message:    error
    }
};




//TODO
/**
 * Méthode permettant d'indiquer qu'il y a eu une erreur lors de la récupération des roomers
 * @param {string} error le message d'erreur
 */
export const handleLogout = () => {
    return {
        type:       CONNECTED_USER_LOCATION_LOGOUT
    }
};
