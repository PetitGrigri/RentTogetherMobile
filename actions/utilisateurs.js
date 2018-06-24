import * as api from '../api/api.js';

//Types d'actions destinées à la gestion d'un utilisateur
export const
    // Récupération de la liste des utilisateurs
    USER_GET_USERS_REQUEST  = 'USER_GET_USERS',
    USER_GET_USERS_SUCCESS  = 'USER_GET_USERS_SUCCESS',
    USER_GET_USERS_ERROR    = 'USER_GET_USERS_ERROR',
    // Ajout d'un utilisateur
    USER_ADD_USER_REQUEST = 'USER_ADD_USER',
    USER_ADD_USER_SUCCESS= 'USER_ADD_USER_SUCCESS',
    USER_ADD_USER_ERROR= 'USER_ADD_USER_ERROR',
    // Suppression d'un utilisateur
    USER_DELETE_USER_REQUEST = 'USER_DELETE_USER_REQUEST',
    USER_DELETE_USER_SUCCESS= 'USER_DELETE_USER_SUCCESS',
    USER_DELETE_USER_ERROR= 'USER_DELETE_USER_ERROR',
    // Modification d'un utilisateur
    USER_UPDATE_USER_REQUEST = 'USER_UPDATE_USER_REQUEST',
    USER_UPDATE_USER_SUCCESS= 'USER_UPDATE_USER_SUCCESS',
    USER_UPDATE_USER_ERROR= 'USER_UPDATE_USER_ERROR',
    // Suppression des messages d'erreurs ou de réussite
    USER_USER_HIDE_MESSAGES= 'USER_USER_HIDE_MESSAGES',
    USER_USER_HIDE_POPUP_MESSAGES = 'USER_USER_HIDE_POPUP_MESSAGES'

    ;

/**
 * Fonction destinée à la création d'un utilisateur en utilisant l'objet user passé en paramètre 
 * Plusieurs actions seront emises pour informer redux de l'état en cours
 * 
 * @param {object} user  
 */
export const handleCreateUser= (user) => {
    return function (dispatch) {

        dispatch({
            type: USER_ADD_USER_REQUEST, 
        });

        api.createUtilisateur(
            user,
            (dataUser) => { dispatch(handleCreateUserSuccess(dataUser)) },
            (error) => { dispatch(handleCreateUserError(error)) }
        )
    }
}

/**
 * Fonction permettant de retourner l'action nécessaire à la prise en compte du succés de la création d'un utilisateur
 */
export const handleCreateUserSuccess = (dataUser) => {
    return {
        type: USER_ADD_USER_SUCCESS,
        message: "L'utilisateur a été crée",
        user: dataUser
    }
};

/**
 * Fonction permettant de retourner l'action nécessaire à la prise en compte l'échec de la création d'un utilisateur
 * 
 * @param {string} error le message d'erreur
 */
export const handleCreateUserError = (error) => {
    return {
        type: USER_ADD_USER_ERROR,
        message: error
    }
}

/**
 * Fonction destinée à la récupération de la liste des utilisateurs
 * Plusieurs actions seront emises pour informer redux de l'état en cours ou pour transmettre les utilisateurs récupérés
 * 
 * @param {object} data 
 */
export const handleGetUsers = () => {

    console.log('handleGetUsers');

    return function (dispatch, getState) {
        dispatch({
            type: USER_GET_USERS_REQUEST, 
        });

        //TODO check la vérification du token de l'utilisateur connecté

        api.getUtilisateurs(
            getState().connection.user.token,
            (data) => { dispatch(handleGetUserSuccess(data)) },
            (error) => { dispatch(handleGetUserError(error)) }
        )
    }
}

/**
 * Fonction permettant de retourner l'action nécessaire à la prise en compte du succés de la récupération des utilisateurs
 * 
 * @param {object} data La liste des utilisateurs
 */
export const handleGetUserSuccess = (data) => {
    return {
        type: USER_GET_USERS_SUCCESS,
        users: data
    } 
};

/**
 * Fonction permettant de retourner l'action nécessaire à la prise en compte de l'échec de la récupération des utilisateurs
 * 
 * @param {string} error l'erreur remontée
 */
export const handleGetUserError = (error) => {
    return {
        type: USER_GET_USERS_ERROR,
        message: error
    } 
};

/**
 * Fonction destinée à la suppression d'un utilisateur en utilisant l'objet passé en paramètre
 * Plusieurs actions seront emises pour informer redux de l'état en cours
 * 
 * @param {int} id l'identifiant de l'utilisateur à supprimer 
 */
export const handleDeleteUser= (id) => {

    console.log('handleDeleteUser');

    return function (dispatch, getState) {
        dispatch({
            type: USER_DELETE_USER_REQUEST, 
            administratorId: id,
        });

        api.deleteUser(
            id,
            getState().connection.user.token,
            (id) => { dispatch(handleRemoveUserSuccess(id)) },
            (error) => { dispatch(handleRemoveUserError(error)) }
        )
    }
}

/**
 * Fonction permettant de retourner l'action nécessaire à la prise en compte du succés de la suppression d'un utilisateur
 * 
 * @param {int} id l'identifiant de l'utilisateur à supprimer 
 */
export const handleRemoveUserSuccess = (id) => {
    return {
        type: USER_DELETE_USER_SUCCESS,
        administratorId: id,
        message: "Utilisateur Supprimé"
    }
}

/**
 * Fonction permettant de retourner l'action nécessaire à la prise en compte de l'échec de la suppression d'un utilisateur
 * 
 * @param {string} error l'erreur remontée
 */
export const handleRemoveUserError = (error) => {
    return {
        type: USER_DELETE_USER_ERROR,
        message: error
    }
}


/**
 * Fonction permettant de retourner l'action nécessaire pour vider les messages
 */
export const handleHideMessages = () => {
    return {
        type: USER_USER_HIDE_MESSAGES
    } 
};

/**
 * Fonction permettant de retourner l'action nécessaire pour vider les messages contenus dans la popup
 */
export const handleHideMessagesPopup = () => {
    return {
        type: USER_USER_HIDE_POPUP_MESSAGES
    } 
};

/**
 * Fonction destinée à la création d'un utilisateur en utilisant l'objet user passé en paramètre 
 * Plusieurs actions seront emises pour informer redux de l'état en cours
 * 
 * @param {object} user  
 */
export const handleUpdateUser= (user) => {
    return function (dispatch, getState) {

        dispatch({
            type: USER_UPDATE_USER_REQUEST, 
            userId: user.userId
        });

        api.putUser(
            user,
            getState().connection.user.token,
            (dataUser) => { dispatch(handleUpdateUserSuccess(dataUser)) },
            (error) => { dispatch(handleUpdateUserError(error)) }
        )
    }
}

/**
 * Fonction permettant de retourner l'action nécessaire à la prise en compte du succés de la création d'un utilisateur
 */
export const handleUpdateUserSuccess = (user) => {
    return {
        type: USER_UPDATE_USER_SUCCESS,
        message: "L'utilisateur a été modifié",
        user: user
    }
};

/**
 * Fonction permettant de retourner l'action nécessaire à la prise en compte l'échec de la création d'un utilisateur
 * 
 * @param {string} error le message d'erreur
 */
export const handleUpdateUserError = (error) => {
    return {
        type: USER_UPDATE_USER_ERROR,
        message: error
    }
}
