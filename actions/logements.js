import * as api from '../api/api.js';


export const 
    // Actions destinées à la récupération locataires potentiels
    POTENTIAL_LOCATION_GET_REQUEST   = 'POTENTIAL_LOCATION_GET_REQUEST', 
    POTENTIAL_LOCATION_GET_SUCCESS   = 'POTENTIAL_LOCATION_GET_SUCCESS', 
    POTENTIAL_LOCATION_GET_ERROR     = 'POTENTIAL_LOCATION_GET_ERROR',

    // Actions destinées à la création d'un appartement
    BUILDING_POST_REQUEST  = 'BUILDING_POST_REQUEST', 
    BUILDING_POST_SUCCESS  = 'BUILDING_POST_SUCCESS', 
    BUILDING_POST_ERROR    = 'BUILDING_POST_ERROR',

    BUILDING_HIDE_ERROR = 'BUILDING_HIDE_ERROR'
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
const handleGetAppartementsPotentielsSuccess = (dataLocations) => {
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
const handleGetAppartementsPotentielsError = (error) => {
    return {
        type:       POTENTIAL_LOCATION_GET_ERROR,
        message:    error
    }
};











/**
 * Méthode permettant de récupérer la liste des appartements potentiels
 */
export const handlePostAppartement = (building) => {
    return function (dispatch, getState) {
        //on dispatch l'état de la recherche des roomers
        dispatch({
            type: BUILDING_POST_REQUEST
        })
        
        //utilisations de l'api pour récupérer les roomers
        api.postBuilding(
            getState().connection.user.token,
            getState().connection.user.userId,
            building,
            (dataLocations) =>  { dispatch(handlePostAppartementSuccess(dataLocations)) },
            (error) =>          { dispatch(handlePostAppartementError(error)) }
        )
    }
};

/**
 * Méthode permettant de créer un appartement
 * @param {object} data 
 */
const handlePostAppartementSuccess = (dataBuilding) => {

    //retour de l'action
    return {
        type:           BUILDING_POST_SUCCESS,
        dataBuilding:   dataBuilding
    } 
};

/**
 * Méthode utilisée lorsque les appartements n'ont pas pu être récupérés
 * @param {string} error le message d'erreur
 */
const handlePostAppartementError = (error) => {
    return {
        type:       BUILDING_POST_ERROR,
        message:    error
    }
};




/**
 * Fonction permettant de retourner l'action nécessaire pour vider les messages
 */
export const handleHideError = () => {
    return {
        type: BUILDING_HIDE_ERROR
    } 
};
