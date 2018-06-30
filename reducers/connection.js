import { 
    // Gestion de la connexion
    SIGN_IN_REQUEST, 
    SIGN_IN_ERROR, 
    SIGN_IN_SUCESS,
    CONNECTION_HIDE_ERROR,
    // Connexion d'un utilisateur avec son token 
    SIGN_IN_WITH_PREVIOUS_TOKEN_REQUEST,
    SIGN_IN_WITH_PREVIOUS_TOKEN_SUCCESS,
    SIGN_IN_WITH_PREVIOUS_TOKEN_ERROR,
    // Modification de l'utilisateur (PATCH)
    PATCH_CONNECTED_USER_REQUEST,
    PATCH_CONNECTED_USER_SUCCESS,
    PATCH_CONNECTED_USER_ERROR,
     // Déconnexion
    LOGOUT,



 }from '../actions/connection.js'

//le state initial
const initialConnectionState = {
    loadingSignIn :     false,
    loadingSignInToken: false,
    loadingPatchUser:   false,
    isAuthenticated :   false,
    user:               {},
    message_error :     "",
    
}


const connection = (state = initialConnectionState, action) => {

    switch(action.type) {
        //Connexion de l'utilisateur
        
        case SIGN_IN_REQUEST: 
            return Object.assign({}, state, {
                loadingSignIn : true
            });

        //validation de la connexion
        case  SIGN_IN_SUCESS: 

            var userState = {}

            Object.keys(action.user).forEach((key) => {
                if (key !== "password" ) {
                    userState[key] = action.user[key];
                }
            });

            return Object.assign({}, state, {
                loadingSignIn : false,
                isAuthenticated : true,
                user: userState
            });

        //erreur lors de la connexion
        case  SIGN_IN_ERROR : 
            return Object.assign({}, state, {
                loadingSignIn : false,
                isAuthenticated: false,
                message_error: action.message||"Erreur d'authentification",
            });

        //erreur lors de la connexion
        case  CONNECTION_HIDE_ERROR : 
            return Object.assign({}, state, {
                message_error: ""
            });




        case SIGN_IN_WITH_PREVIOUS_TOKEN_REQUEST:
            return Object.assign({}, state, {
                loadingSignInToken: true,
            });
        case SIGN_IN_WITH_PREVIOUS_TOKEN_SUCCESS:
            return Object.assign({}, state, {
                loadingSignInToken:     false,
                isAuthenticated:        true,
                user:                   action.user
            });
        case SIGN_IN_WITH_PREVIOUS_TOKEN_ERROR:
            return Object.assign({}, state, {
                loadingSignInToken:     false,
            });
        

        case LOGOUT:
            return Object.assign({}, state, {
                loadingSignIn:      false,
                isAuthenticated:    false,
                user:               {},
            });


        case PATCH_CONNECTED_USER_REQUEST: 
            return Object.assign({}, state, {
                loadingPatchUser:    true,
            });

        case PATCH_CONNECTED_USER_SUCCESS:
            return Object.assign({}, state, {
                loadingPatchUser:   false,
                user:               action.user
            });
        case PATCH_CONNECTED_USER_ERROR:
            return Object.assign({}, state, {
                loadingPatchUser:   false,
                message_error:      action.message||"Vos données n'ont pas pu être actualisées",   
            });



        //autres 
        default : 
            return state;
    }
}

export default connection;