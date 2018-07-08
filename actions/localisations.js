import * as api from '../api/api.js';


export const 
    //Types d'actions destinées à la récupération des souhaits de localisation  des roomers
    CONNECTED_USER_LOCALISATION_GET_REQUEST   = 'CONNECTED_USER_LOCALISATION_GET_REQUEST', 
    CONNECTED_USER_LOCALISATION_GET_SUCCESS   = 'CONNECTED_USER_LOCALISATION_GET_SUCCESS', 
    CONNECTED_USER_LOCALISATION_GET_ERROR     = 'CONNECTED_USER_LOCALISATION_GET_ERROR',

    //Types d'actions destinées à la récupération de la localisation des utilsiateurs
    SEARCH_LOCALISATION_REQUEST   = 'SEARCH_LOCALISATION_REQUEST', 
    SEARCH_LOCALISATION_SUCCESS   = 'SEARCH_LOCALISATION_SUCCESS', 
    SEARCH_LOCALISATION_ERROR     = 'SEARCH_LOCALISATION_ERROR',

    //Types d'actions destinées à l'ajout d'une localisation pour l'utilisateur connecté
    CONNECTED_USER_ADD_LOCALISATION_REQUEST   = 'CONNECTED_USER_ADD_LOCALISATION_REQUEST', 
    CONNECTED_USER_ADD_LOCALISATION_SUCCESS   = 'CONNECTED_USER_ADD_LOCALISATION_SUCCESS', 
    CONNECTED_USER_ADD_LOCALISATION_ERROR     = 'CONNECTED_USER_ADD_LOCALISATION_ERROR',

    //Types d'actions destinées à la suppression d'un souhait de localisation
    CONNECTED_USER_LOCALISATION_DELETE_REQUEST   = 'CONNECTED_USER_LOCALISATION_DELETE_REQUEST', 
    CONNECTED_USER_LOCALISATION_DELETE_SUCCESS   = 'CONNECTED_USER_LOCALISATION_DELETE_SUCCESS', 
    CONNECTED_USER_LOCALISATION_DELETE_ERROR     = 'CONNECTED_USER_LOCALISATION_DELETE_ERROR'
    ;

/**
 * Méthode permettant de récupérer la liste des localisations d'un utilisateur
 * @param {object} filter un object contenant les filtres à appliquer sur les collocataies que l'on recupèrera
 */
export const handleGetConnectedUserLocalisations = () => {
    return function (dispatch, getState) {
        //on dispatch l'état de la recherche des roomers
        dispatch({
            type: CONNECTED_USER_LOCALISATION_GET_REQUEST
        })
        
        //utilisations de l'api pour récupérer les roomers
        api.getConnectedUserLocation(
            getState().connection.user.token,
            getState().connection.user.userId,
            (dataLocalisations) => { dispatch(handleGetConnectedUserLocalisationsSuccess(dataLocalisations)) },
            (error) => { dispatch(handleGetConnectedUserLocalisationsError(error)) }
        )
    }
};

/**
 * Méthode permettant de transmettre les roomers reçues
 * @param {object} data 
 */
const handleGetConnectedUserLocalisationsSuccess = (dataLocalisations) => {
    //retour de l'action
    return {
        type:           CONNECTED_USER_LOCALISATION_GET_SUCCESS,
        localisations:  dataLocalisations
    } 
};

/**
 * Méthode permettant d'indiquer qu'il y a eu une erreur lors de la récupération des roomers
 * @param {string} error le message d'erreur
 */
const handleGetConnectedUserLocalisationsError = (error) => {
    return {
        type:       CONNECTED_USER_LOCALISATION_GET_ERROR,
        message:    error
    }
};










/**
 * Méthode permettant de récupérer une liste de localisations 
 * @param {object} filter un object contenant les filtres à appliquer sur les collocataies que l'on recupèrera
 */
export const handleSearchLocalisation = (city, postalCode) => {
    return function (dispatch, getState) {
        //on dispatch l'état de la recherche des roomers
        dispatch({
            type: SEARCH_LOCALISATION_REQUEST
        })
        
        //utilisations de l'api pour récupérer les roomers
        api.searchLocalisation(
            getState().connection.user.token,
            city, 
            postalCode,
            (dataLocalisations) => { dispatch(handleSearchLocalisationSuccess(dataLocalisations)) },
            (error) => { dispatch(handleSearchLocalisationError(error)) }
        )
    }
};

/**
 * Méthode permettant de transmettre les roomers reçues
 * @param {object} data 
 */
const handleSearchLocalisationSuccess = (dataLocalisations) => {
    //retour de l'action
    return {
        type:           SEARCH_LOCALISATION_SUCCESS,
        localisations:  dataLocalisations
    } 
};

/**
 * Méthode permettant d'indiquer qu'il y a eu une erreur lors de la récupération des roomers
 * @param {string} error le message d'erreur
 */
const handleSearchLocalisationError = (error) => {
    return {
        type:       SEARCH_LOCALISATION_ERROR,
        message:    error
    }
};







/**
 * Fonction permettant d'ajouter à l'utilisateur en cours une nouvelle target location
 * @param {object} filter l'objet localisation à ajouté
 */
export const handleAddConnectedUserTargetLocation = (localisationData) => {
    return function (dispatch, getState) {
        //on dispatch l'état de la recherche des roomers
        dispatch({
            type:           CONNECTED_USER_ADD_LOCALISATION_REQUEST, 
            localisation:   localisationData
        })
        
        //utilisations de l'api pour récupérer les roomers
        api.addConnectedUserTargetLocation(
            getState().connection.user.token,
            getState().connection.user.userId,
            localisationData, 
            (localisation) => { dispatch(handleAddConnectedUserLocalisationSuccess(localisation)) },
            (error) => { dispatch(handleAddConnectedUserLocalisationError(error, localisationData)) }
        )
    }
};

/**
 * @param {object} data 
 */
const handleAddConnectedUserLocalisationSuccess = (dataLocalisation) => {
    //retour de l'action
    return {
        type:           CONNECTED_USER_ADD_LOCALISATION_SUCCESS,
        localisation:   dataLocalisation
    } 
};

/**
 * @param {string} error le message d'erreur
 */
const handleAddConnectedUserLocalisationError = (error, loalisation) => {
    return {
        type:           CONNECTED_USER_ADD_LOCALISATION_ERROR,
        localisation:   localisation,
        message:        error
    }
};





/**
 * Fonction permettant d'ajouter à l'utilisateur en cours une nouvelle target location
 * @param {object} filter l'objet localisation à ajouté
 */
export const handleDeleteConnectedTargetLocation= (targetLocation) => {
    return function (dispatch, getState) {
        //on dispatch l'état de la recherche des roomers
        dispatch({
            type:               CONNECTED_USER_LOCALISATION_DELETE_REQUEST, 
            targetLocationId:   targetLocation.targetLocationId
        })
        
        //utilisations de l'api pour récupérer les roomers
        api.deleteConnectedUserTargetLocation(
            getState().connection.user.token,
            targetLocation,
            () => { dispatch(handleDeleteConnectedTargetLocationSuccess(targetLocation.targetLocationId)) },
            (error) => { dispatch(handleDeleteConnectedTargetLocationError(error, targetLocation.targetLocationId)) }
        )
    }
};

/**
 * @param {object} data 
 */
const handleDeleteConnectedTargetLocationSuccess = (targetLocationId) => {
    //retour de l'action
    return {
        type:               CONNECTED_USER_LOCALISATION_DELETE_SUCCESS,
        targetLocationId:   targetLocationId
    } 
};

/**
 * @param {string} error le message d'erreur
 */
const handleDeleteConnectedTargetLocationError = (error, targetLocationId) => {
    return {
        type:               CONNECTED_USER_LOCALISATION_DELETE_ERROR,
        targetLocationId:   targetLocationId,
        message:            error
    }
};








//TODO
/**
 * Méthode permettant d'indiquer qu'il y a eu une erreur lors de la récupération des roomers
 * @param {string} error le message d'erreur
 */
export const handleLogout = () => {
    return {
        type:       CONNECTED_USER_LOCALISATION_LOGOUT
    }
};


