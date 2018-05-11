import * as api from '../api/api.js';

//Types d'actions destinées à la connexion
export const 
    SIGN_IN_REQUEST = 'SIGN_IN_REQUEST', 
    SIGN_IN_SUCESS = 'SIGN_IN_SUCESS',
    SIGN_IN_ERROR = 'SIGN_IN_ERROR',
    SIGN_IN_HIDE_ERROR = 'SIGN_IN_HIDE_ERROR';

/**
 * Méthode permettant de se connecter et d'obtenir des informations sur l'utilisateur
 * @param {string} login 
 * @param {string} password 
 */
export const handleSignIn = (login, password) => {
    return function (dispatch) {
        //on dispatch l'état de connexion en cours
        dispatch({
            type: SIGN_IN_REQUEST
        })
        // Utilisation de l'apu pour se connecter avec les bons crédentials
        // Quand l'appel à l'api sera terminé, on gèrerera la réussite ou l'echec
        api.connectionAPI(
            login,
            password,
            (user) => { dispatch(handleSignInSuccess(user)) },
            (error) => { dispatch(handleSignInError(error)) }
        )
    }
};

/**
 * Méthode permettant de retourner l'action nécessaire à redux pour connaitre l'utilisateur connecté
 * @param {object} data 
 */
export const handleSignInSuccess = (data) => {
    //création d'un objet user sans son mot de passe
    var dataUser = Object.assign({}, data);
    delete dataUser.password;
    //retour de l'action
    return {
        type: SIGN_IN_SUCESS,
        user: dataUser
    } 
};

/**
 * Méthode permettat de retourner l'action nécessaire à redux pour gérer une erreur d'authentification
 * @param {string} error le message d'erreur
 */
export const handleSignInError = (error) => {
    return {
        type: SIGN_IN_ERROR,
        message: error
    }
};

/**
 * Méthode permettant de retourner l'action nécessaire à redux pour informer qu'il n'y a plus de chargement en cours
 * @param {string} error le message d'erreur
 */
export const handleHideError = () => {
    return {
        type: SIGN_IN_HIDE_ERROR
    }
}