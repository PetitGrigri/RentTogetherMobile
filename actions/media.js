import * as api from '../api/api.js';
import {saveUserMedia } from '../utils/fileSystem';

//Types d'actions destinées à la connexion
export const 
    USER_GET_USER_IMAGE_REQUEST     = 'USER_GET_USER_IMAGE_REQUEST',  
    USER_GET_USER_IMAGE_SUCCESS     = 'USER_GET_USER_IMAGE_SUCCESS',  
    USER_GET_USER_IMAGE_ERROR       = 'USER_GET_USER_IMAGE_ERROR',

    USER_POST_USER_IMAGE_REQUEST    = 'USER_POST_USER_IMAGE_REQUEST',  
    USER_POST_USER_IMAGE_SUCCESS    = 'USER_POST_USER_IMAGE_SUCCESS',  
    USER_POST_USER_IMAGE_ERROR      = 'USER_POST_USER_IMAGE_ERROR'

    
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


















/**
 * Méthode destinée à l'envoie d'un message
 * @param {int} conversationId la coonversation dans laquelle on envoie un message
 * @param {message} message le message que l'on souhaite envoyer
 */
export const handleUploadUserMedia = (imageURI) => {
    return function (dispatch, getState) {

        console.log('action 1', imageURI);
    

        // On dispatch le fait qu'on envoie un message
        dispatch({
            type: USER_POST_USER_IMAGE_REQUEST
        })

        // Utilisation de l'api pour envoyer un message
        api.postUploadUserImage(
            getState().connection.user.token,
            getState().connection.user.userId,
            imageURI,
            (message) => { dispatch(handleUploadUserMediaSucess(message)) },
            (error) => { dispatch(handleUploadUserMediaError(error)) }
        )
        

        console.log('action 3');
    }
}


/**
 * Méthode permettant d'informer que l'image a bien été uploadé
 * @param {object} message 
 */
export const handleUploadUserMediaSucess = (message) => {

    //retour de l'action
    return {
        type:       USER_POST_USER_IMAGE_SUCCESS,
    } 
};

/**
 * Méthode permettant d'indiquer que l'image n'a pas pu être uploadé
 * @param {string} error le message d'erreur
 */
export const handleUploadUserMediaError = (error) => {
    return {
        type:   USER_POST_USER_IMAGE_ERROR,
        error:  error
    }
};