import * as api from '../api/api.js';

//Types d'actions destinées à la connexion
export const 
    USER_GET_MEDIA              = 'USER_GET_MEDIA', 
    USER_GET_MEDIA_ERROR        = 'USER_GET_MEDIA_ERROR',
    USER_GET_MEDIA_SUCCESS      = 'USER_GET_MEDIA_SUCCESS', 
    USER_GET_MEDIA_HIDE_ERROR   = 'USER_GET_MEDIA_HIDE_ERROR'
;

/**
 * Méthode permettant de récupérer l'image d'un utilisateur
 * @param {string} token 
 * @param {object} password 
 */
export const hangleGetMedia = (token, userId) => {

    console.log(token, userId);
    return function (dispatch) {
        //on dispatch l'état de connexion en cours
        dispatch({
            type: USER_GET_MEDIA
        })
        // Utilisation de l'apu pour se connecter avec les bons crédentials
        // Quand l'appel à l'api sera terminé, on gèrerera la réussite ou l'echec
        api.getUserMedia(
            token,
            userId,
            (image) => { dispatch(hangleGetMediaSuccess(image)) },
            (error) => { dispatch(hangleGetMediaError(error)) }
        )
    }
};

/**
 * Méthode permettant de 
 * @param {Blob} image 
 */
export const hangleGetMediaSuccess = (image) => {
    //retour de l'action
    return {
        type: USER_GET_MEDIA_SUCCESS,
        image: image
    } 
};

/**
 * Méthode permettat de 
 * @param {string} error le message d'erreur
 */
export const hangleGetMediaError = (error) => {
    return {
        type:       USER_GET_MEDIA_ERROR,
        message:    error
    }
};

/**
 * Méthode permettant de 
 */
export const hangleGetMediaHideError = () => {
    return {
        type: USER_GET_MEDIA_HIDE_ERROR
    }
}