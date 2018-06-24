import * as api from '../api/api.js';

//Types d'actions destinées à la connexion
export const 
    SIGN_IN_REQUEST     = 'SIGN_IN_REQUEST', 
    SIGN_IN_SUCESS      = 'SIGN_IN_SUCESS',
    SIGN_IN_ERROR       = 'SIGN_IN_ERROR',
    SIGN_IN_HIDE_ERROR  = 'SIGN_IN_HIDE_ERROR',

    // Récupération d'un utilisateur avec son token 
    SIGN_IN_WITH_PREVIOUS_TOKEN_REQUEST    = 'SIGN_IN_WITH_PREVIOUS_TOKEN_REQUEST',
    SIGN_IN_WITH_PREVIOUS_TOKEN_SUCCESS    = 'SIGN_IN_WITH_PREVIOUS_TOKEN_SUCCESS',
    SIGN_IN_WITH_PREVIOUS_TOKEN_ERROR      = 'SIGN_IN_WITH_PREVIOUS_TOKEN_ERROR'
    ;

// Le nom des variables que l'on pourrait utiliser pour la connexion
 export const 
    TOKEN_NAME = 'token';
    
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

    // Enregistrement sécurisé du token pour ne pas demander à l'utilisateur de se reconnecté plus tard
    Expo.SecureStore.setItemAsync(TOKEN_NAME, dataUser.token);

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



/**
 * Méthode permettant de se connecter en utlisant un token enregistré lors d'une connexion précédente.
 * @param {string} token le token obtenu d'une connexion précédente
 */
export const handleConnectWithPreviousToken = (token ) => {

    return function (dispatch, getState) {
        //on dispatch le fait qu'on se connecte via  un token
        dispatch({
            type: SIGN_IN_WITH_PREVIOUS_TOKEN_REQUEST, 
        });

        // Récupération de l'utilisateur via un token
        api.getUtilisateurs(
            token,
            { $filter:    `token eq '${token}'` },
            (dataUser) => dispatch(handleGetUserWithTokenSuccess(dataUser)),
            (error) => dispatch(handleGetUserWithTokenError(error))
        )
    }
}

/**
 * Méthode permettant de prendre en compte la récupération d'un utilisateur via son Token
 * Ici on reçoit un array d'utilisateurs qui ne contiendra qu'un seul utilisateur
 * @param {Array} dataUser un tableau d'utilisateurs
 */
export const handleGetUserWithTokenSuccess = (dataUser) => {
    
    return {
        type:       SIGN_IN_WITH_PREVIOUS_TOKEN_SUCCESS,
        user:       dataUser[0],

    }
}


export const handleGetUserWithTokenError = (error) => {

    // Suppression du token
    Expo.SecureStore.deleteItemAsync(TOKEN_NAME);

    return {
        type:       SIGN_IN_WITH_PREVIOUS_TOKEN_ERROR,
        message:    error
    }
}