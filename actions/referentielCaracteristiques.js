/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */
import * as api from '../api/api.js';


export const 
    //Types d'actions destinées à la récupération des messages
    REFERENTIAL_GET_CHARACTERISTICS_REQUEST  = 'REFERENTIAL_GET_CHARACTERISTICS_REQUEST', 
    REFERENTIAL_GET_CHARACTERISTICS_SUCCESS  = 'REFERENTIAL_GET_CHARACTERISTICS_SUCCESS', 
    REFERENTIAL_GET_CHARACTERISTICS_ERROR    = 'REFERENTIAL_GET_CHARACTERISTICS_ERROR'

    ;

/**
 * Méthode permettant de se connecter et d'obtenir les messages de l'utilisateurs connecté
 * @param {object} filter un object contenant les filtres à appliquer sur les messages que l'on recupèrera
 */
export const handleGetReferentialCharacteristics= () => {
    return function (dispatch, getState) {
        //on dispatch l'état de la recherche des messages
        dispatch({
            type: REFERENTIAL_GET_CHARACTERISTICS_REQUEST
        })
        
        //utilisations de l'api pour récupérer les messages
        api.getCharacteristicsReferential(
            getState().connection.user.token,
            (data) => { dispatch(handleGetReferentialCharacteristicsSuccess(data)) },
            (error) => { dispatch(handleGetReferentialCharacteristicsError(error)) }
        )
    }
};

/**
 * Méthode permettant de transmettre les référentiels de caractéristiques reçus
 * @param {object} dataReferentials 
 */
export const handleGetReferentialCharacteristicsSuccess = (characteristicsReferencial) => {
    //retour de l'action
    return {
        type:                       REFERENTIAL_GET_CHARACTERISTICS_SUCCESS,
        characteristicsReferencial: characteristicsReferencial
    } 
};

/**
 * Méthode permettant d'indiquer qu'il y a eu une erreur lors de la récupération des messages
 * @param {string} error le message d'erreur
 */
export const handleGetReferentialCharacteristicsError = (error) => {
    return {
        type:   REFERENTIAL_GET_CHARACTERISTICS_ERROR,
        error:  error
    }
};
