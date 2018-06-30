import * as api from '../api/api.js';

//Types d'actions destinées à la connexion et à la modification de l'utilsateur connecté
export const 
    // Gestion de la connexion
    SIGN_IN_REQUEST     = 'SIGN_IN_REQUEST', 
    SIGN_IN_SUCESS      = 'SIGN_IN_SUCESS',
    SIGN_IN_ERROR       = 'SIGN_IN_ERROR',
    CONNECTION_HIDE_ERROR  =    'CONNECTION_HIDE_ERROR',
    CONNECTION_HIDE_SUCCESS  =  'CONNECTION_HIDE_ERROR',

    // Récupération d'un utilisateur avec son token 
    SIGN_IN_WITH_PREVIOUS_TOKEN_REQUEST    = 'SIGN_IN_WITH_PREVIOUS_TOKEN_REQUEST',
    SIGN_IN_WITH_PREVIOUS_TOKEN_SUCCESS    = 'SIGN_IN_WITH_PREVIOUS_TOKEN_SUCCESS',
    SIGN_IN_WITH_PREVIOUS_TOKEN_ERROR      = 'SIGN_IN_WITH_PREVIOUS_TOKEN_ERROR',
    // Modification de l'utilisateur (PATCH)
    PATCH_CONNECTED_USER_REQUEST =   'PATCH_CONNECTED_USER_REQUEST',
    PATCH_CONNECTED_USER_SUCCESS=    'PATCH_CONNECTED_USER_SUCCESS',
    PATCH_CONNECTED_USER_ERROR=      'PATCH_CONNECTED_USER_ERROR',
    // Déconnexion
    LOGOUT  = 'LOGOUT'
    ;

// Le nom des variables que l'on pourrait utiliser pour la connexion
 export const 
    TOKEN_NAME =    'TOKEN_NAME',
    USER_ID=        'USER_ID';
    
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

    // Enregistrement sécurisé du token et de l'id de l'utilsiateur pour ne pas demander à l'utilisateur de se reconnecté plus tard
    Expo.SecureStore.setItemAsync(TOKEN_NAME, dataUser.token);
    Expo.SecureStore.setItemAsync(USER_ID, `${dataUser.userId}`);

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
        type: CONNECTION_HIDE_ERROR
    }
}



/**
 * Méthode permettant de se connecter en utlisant un token enregistré lors d'une connexion précédente.
 * @param {string} token le token obtenu d'une connexion précédente
 * @param {string} token le userId obtenu lors d'une connexion précédente
 */
export const handleConnectWithPreviousToken = (token, userId) => {

    return function (dispatch, getState) {
        //on dispatch le fait qu'on se connecte via  un token
        dispatch({
            type: SIGN_IN_WITH_PREVIOUS_TOKEN_REQUEST, 
        });

        // Récupération de l'utilisateur via un token
        api.getSingleUtilisateur(
            token,
            userId,
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
    
    if (!dataUser.result)
        console.log('ATTENTION result SUPPRIME ! !  !! ! !! !!!! handleGetUserWithTokenSuccess');

    return {
        type:       SIGN_IN_WITH_PREVIOUS_TOKEN_SUCCESS,
        user:       dataUser.result,
    }
}

export const handleGetUserWithTokenError = (error) => {

    // Suppression de token et de l'id de l'ancien utilisateur connecté
    Expo.SecureStore.deleteItemAsync(TOKEN_NAME);
    Expo.SecureStore.deleteItemAsync(USER_ID);
    // Dispatch
    return {
        type:       SIGN_IN_WITH_PREVIOUS_TOKEN_ERROR,
        message:    error
    }
}

/**
 * Méthode destinée à permettre à l'utilisateur de se déconnecter
 */
export const handleLogout = () => {
    // Suppression de token et de l'id de l'ancien utilisateur connecté
    Expo.SecureStore.deleteItemAsync(TOKEN_NAME);
    Expo.SecureStore.deleteItemAsync(USER_ID);
    // Dispatch
    return {
        type:       LOGOUT,
    }
}





export const handlePatchConnectedUser = (userData) => {
    return function (dispatch, getState) {
        //on dispatch le fait qu'on se connecte via  un token
        dispatch({
            type: PATCH_CONNECTED_USER_REQUEST, 
        });
 
        let userDataPatch = {
            "userId":       getState().connection.user.userId,
            "firstName":    userData.firstName ? userData.firstName : null,
            "lastName":     userData.firstName ? userData.lastName : null,
            "email":        userData.firstName ? userData.email : null,
            "phoneNumber":  userData.phoneNumber ? userData.phoneNumber : null,
           };

        
        // Récupération de l'utilisateur via un token
        api.patchUser(
            getState().connection.user.token,
            userDataPatch,
            (dataUser) => dispatch(handlePatchConectedUserSuccess(dataUser)),
            (error) => dispatch(handlePatchConectedUserError(error))
        )
    }
}


export const handlePatchConectedUserSuccess = (user) => {
    return {
        type:       PATCH_CONNECTED_USER_SUCCESS,
        user:       user
    }
}

export const handlePatchConectedUserError = (error) => {
    return {
        type:       PATCH_CONNECTED_USER_ERROR,
        message:    error
    }
}
