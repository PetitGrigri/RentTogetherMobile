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

    // Actions destiné à historiser un logement (indiquer que l'on l'a déjà vu, mais qu'il ne nous interesse pas)
    BUILDING_POST_HISTORY_REQUEST = 'BUILDING_POST_HISTORY_REQUEST',
    BUILDING_POST_HISTORY_SUCCESS = 'BUILDING_POST_HISTORY_SUCCESS',
    BUILDING_POST_HISTORY_ERROR =   'BUILDING_POST_HISTORY_ERROR',

    // Actions destiné à mettre un logement en favoris
    BUILDING_ADD_FAVORITE_REQUEST=  'BUILDING_ADD_FAVORITE_REQUEST',
    BUILDING_ADD_FAVORITE_SUCCESS=  'BUILDING_ADD_FAVORITE_SUCCESS',
    BUILDING_ADD_FAVORITE_ERROR =   'BUILDING_ADD_FAVORITE_ERROR',

    // Actions destiné à récupérer les appartements favoris
    BUILDING_GET_FAVORITE_REQUEST=  'BUILDING_GET_FAVORITE_REQUEST',
    BUILDING_GET_FAVORITE_SUCCESS=  'BUILDING_GET_FAVORITE_SUCCESS',
    BUILDING_GET_FAVORITE_ERROR =   'BUILDING_GET_FAVORITE_ERROR',

    // Actions destinées à la mise à jour d'un appartement
    BUILDING_PUT_REQUEST  = 'BUILDING_PUT_REQUEST', 
    BUILDING_PUT_SUCCESS  = 'BUILDING_PUT_SUCCESS', 
    BUILDING_PUT_ERROR    = 'BUILDING_PUT_ERROR',

    // Action destinée à cacher le message d'erreur
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
 * Fonction destiné à indiquer que l'on a vu un appartement
 * 
 * @param {int} buildingId Le logement que l'on a vu
 */
export const handleBuildingSeen = (buildingId) => {
    return function (dispatch, getState) {

        // On dispatch de l'action demandée
        dispatch({
            type: BUILDING_POST_HISTORY_REQUEST
        })

        // Utilisation indiqué que l'on a vu l'appartement
        api.postBuildingHistory(
            getState().connection.user.token,
            getState().connection.user.userId,
            buildingId,
            (message) => { dispatch(handleBuildingSucess(message)) },
            (error) => { dispatch(handleBuildingError(error)) }
        )
    }
}

/**
 * @param {object} message 
 */
const handleBuildingSucess = (dataBuildingHistory) => {

    //retour de l'action
    return {
        type:                   BUILDING_POST_HISTORY_SUCCESS,
        dataBuildingHistory:    dataBuildingHistory
    } 
};

/**
 * @param {string} error le message d'erreur
 */
const handleBuildingError = (error) => {
    return {
        type:   BUILDING_POST_HISTORY_ERROR,
        error:  error
    }
};








/**
 * Fonction destiné à indiquer que l'on ajoute cet appartement en favoris
 * 
 * @param {int} buildingId Le logement que l'on a vu
 */
export const handleBuildingFavorite = (buildingId) => {
    return function (dispatch, getState) {

        // On dispatch de l'action demandée
        dispatch({
            type: BUILDING_ADD_FAVORITE_REQUEST
        })

        // Utilisation indiqué que l'on a vu l'appartement
        api.postBuildingFavorite(
            getState().connection.user.token,
            getState().connection.user.userId,
            buildingId,
            (data) => { dispatch(handleBuildingFavoriteSuccess(data)) },
            (error) => { dispatch(handleBuildingFavoriteError(error)) }
        )
    }
}

/**
 * @param {object} data 
 */
const handleBuildingFavoriteSuccess = (dataBuildingFavorite) => {

    //retour de l'action
    return {
        type:                   BUILDING_ADD_FAVORITE_SUCCESS,
        dataBuildingFavorite:   dataBuildingFavorite
    } 
};

/**
 * @param {string} error le message d'erreur
 */
const handleBuildingFavoriteError = (error) => {
    return {
        type:   BUILDING_ADD_FAVORITE_ERROR,
        error:  error
    }
};







/**
 * Méthode permettant de récupérer la liste des appartements favoris d'un utilisateur
 */
export const handleGetFavoriteLocations = () => {
    return function (dispatch, getState) {
        //on dispatch l'état de la recherche des roomers
        dispatch({
            type: BUILDING_GET_FAVORITE_REQUEST
        })
        
        //utilisations de l'api pour récupérer les roomers
        api.getFavoriteLocations(
            getState().connection.user.token,
            getState().connection.user.userId,
            (dataLocations) => { dispatch(handleGetFavoriteLocationsSuccess(dataLocations)) },
            (error) => { dispatch(handleGetFavoriteLocationsError(error)) }
        )
    }
};

/**
 * Méthode permettant de transmettre les appartements favoris reçus
 * @param {object} data 
 */
const handleGetFavoriteLocationsSuccess = (dataLocations) => {
    //retour de l'action
    return {
        type:           BUILDING_GET_FAVORITE_SUCCESS,
        dataLocations:  dataLocations
    } 
};

/**
 * Méthode utilisée lorsque les appartements n'ont pas pu être récupérés
 * @param {string} error le message d'erreur
 */
const handleGetFavoriteLocationsError = (error) => {
    return {
        type:       BUILDING_GET_FAVORITE_ERROR,
        message:    error
    }
};




/**
 * Méthode permettant de récupérer la liste des appartements potentiels
 */
export const handlePutAppartement = (building) => {
    return function (dispatch, getState) {
        //on dispatch l'état de la recherche des roomers
        dispatch({
            type: BUILDING_PUT_REQUEST
        })

        //utilisations de l'api pour récupérer les roomers
        api.putBuilding(
            getState().connection.user.token,
            building,
            (dataBuilding) =>  { dispatch(handlePutAppartementSuccess(dataBuilding)) },
            (error) =>          { dispatch(handlePutAppartementError(error)) }
        )
    }
};

/**
 * Méthode permettant de créer un appartement
 * @param {object} data 
 */
const handlePutAppartementSuccess = (dataBuilding) => {

    //retour de l'action
    return {
        type:           BUILDING_PUT_SUCCESS,
        dataBuilding:   dataBuilding
    } 
};

/**
 * Méthode utilisée lorsque les appartements n'ont pas pu être récupérés
 * @param {string} error le message d'erreur
 */
const handlePutAppartementError = (error) => {
    return {
        type:       BUILDING_PUT_ERROR,
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