import * as api from '../api/api.js';


export const 
    // Actions destinées à la récupération des roomers
    POTENTIAL_LOCATION_GET_REQUEST   = 'POTENTIAL_LOCATION_GET_REQUEST', 
    POTENTIAL_LOCATION_GET_SUCCESS   = 'POTENTIAL_LOCATION_GET_SUCCESS', 
    POTENTIAL_LOCATION_GET_ERROR     = 'POTENTIAL_LOCATION_GET_ERROR'

    ;

/**
 * Méthode permettant de récupérer la liste des appartements potentiels
 */
export const handleGetAppartementsPotentiels = () => {
    return function (dispatch, getState) {
        //on dispatch l'état de la recherche des roomers
        dispatch({
            type: POTENTIAL_LOCATION_GET_REQUEST
        })
        
        //utilisations de l'api pour récupérer les roomers
        api.handleGetAppartementsPotentiels(
            getState().connection.user.token,
            getState().connection.user.userId,
            (dataLocations) => { dispatch(handleGetAppartementsPotentielsSuccess(dataLocations)) },
            (error) => { dispatch(handleGetAppartementsPotentielsError(error)) }
        )
    }
};

/**
 * Méthode permettant de transmettre les appartements potentiels reçus
 * @param {object} data 
 */
export const handleGetAppartementsPotentielsSuccess = (dataLocations) => {
    console.log('handleGetAppartementsPotentielsSuccess', dataLocations);
    //retour de l'action
    return {
        type:           POTENTIAL_LOCATION_GET_SUCCESS,
        dataLocations:  dataLocations
    } 
};

/**
 * Méthode utilisée lorsque les appartements n'ont pas pu être récupérés
 * @param {string} error le message d'erreur
 */
export const handleGetAppartementsPotentielsError = (error) => {
    return {
        type:       POTENTIAL_LOCATION_GET_ERROR,
        message:    error
    }
};
