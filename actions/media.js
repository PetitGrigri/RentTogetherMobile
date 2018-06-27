import * as api from '../api/api.js';
import {saveUserMedia } from '../utils/fileSystem';

//Types d'actions destinées à la connexion
export const 
    USER_GET_USER_IMAGE_REQUEST     = 'USER_GET_USER_IMAGE_REQUEST',  
    USER_GET_USER_IMAGE_SUCCESS     = 'USER_GET_USER_IMAGE_SUCCESS',  
    USER_GET_USER_IMAGE_ERROR       = 'USER_GET_USER_IMAGE_ERROR'
;

export const handleGetUserMedia =  (userId) => {
    return function (dispatch, getState) {

        // Si on est déjà en train de télécharger l'image de l'utilisateur, on ne dispatch rien
        if (getState().media.usersMediaLoading.indexOf(userId) > -1 ) {
            return;
        }
        // On dispatch l'état de connexion en cours (demande de récupération d'une image en cours)
        dispatch({
            type:   USER_GET_USER_IMAGE_REQUEST,
            userId: userId
        })

        // Récupération du contenu de l'image d'un utilisateur
        api.getUserMedia(
            getState().connection.user.token,
            userId,
            async (userId, image) => { 
                // Sauvegarde du contenu de l'image que l'on vient de récupérer, et récupération de son URI
                let userImageURI =  await saveUserMedia(userId, image)
                // Dispatch de l'URI
                dispatch(handleGetUserMediaSuccess(userId, userImageURI)) 
            },
            (userId, error) => { dispatch(handleGetUserMediaError(userId, error)) }
        )
    }
};

/**
 * Méthode permettant de 
 * @param {int} userId L'id de l'utilisateur dont on récupère l'image
 * @param {Blob} image Le contenu de l'image pour un utilisateur donné
 */
export const handleGetUserMediaSuccess = (userId, image) => {
    //retour de l'action
    return {
        type:   USER_GET_USER_IMAGE_SUCCESS,
        userId: userId,
        image:  image,
    } 
};

/**
 * Méthode permettant de 
 * @param {int} userId L'id de l'utilisateur dont on récupère l'image
 * @param {error} error Le message d'erreur
 */
export const handleGetUserMediaError = (userId, error) => {
    //retour de l'action
    return {
        type:   USER_GET_USER_IMAGE_SUCCESS,
        userId: userId,
        error:  error
    } 
};



