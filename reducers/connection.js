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
    // Récupération de la personalité de l'utilisateur connecté
    GET_PERSONALITY_CONNECTED_USER_REQUEST,
    GET_PERSONALITY_CONNECTED_USER_SUCCESS,
    GET_PERSONALITY_CONNECTED_USER_ERROR,
    // Mise à jour de la personalité de l'utilisateur connecté
    PATCH_PERSONALITY_CONNECTED_USER_REQUEST,
    PATCH_PERSONALITY_CONNECTED_USER_SUCCESS,
    PATCH_PERSONALITY_CONNECTED_USER_ERROR,
    // Enregistrement de la personalité de l'utilisateur connecté
    POST_PERSONALITY_CONNECTED_USER_REQUEST,
    POST_PERSONALITY_CONNECTED_USER_SUCCESS,
    POST_PERSONALITY_CONNECTED_USER_ERROR,
    
     // Déconnexion
    LOGOUT,



 }from '../actions/connection'

//le state initial
const initialConnectionState = {
    loadingSignIn :         false,
    loadingSignInToken:     false,
    loadingPatchUser:       false,
    loadingGetPersonality:  false,
    loadingPatchPersonality:false,
    loadingPostPersonality: false,
    isAuthenticated:        false,
    user:                   {},
    personality:            [],
    message_error :         "",
    //TODO message_success:        "",
    
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

        // Erreur lors de la connexion
        case  SIGN_IN_ERROR : 
            return Object.assign({}, state, {
                loadingSignIn : false,
                isAuthenticated: false,
                message_error: action.message||"Erreur d'authentification",
            });

        // Erreur lors de la connexion
        case  CONNECTION_HIDE_ERROR : 
            return Object.assign({}, state, {
                message_error: ""
            });




        // Récupération de la personalité d'un utilisateur
        case GET_PERSONALITY_CONNECTED_USER_REQUEST: 
            return Object.assign({}, state, {
                loadingGetPersonality : true
            });

        // Réussite de la récupération de la personnalité de l'utilisateur connecté
        case GET_PERSONALITY_CONNECTED_USER_SUCCESS:
            return Object.assign({}, state, {
                loadingGetPersonality :     false,
                personality:                action.dataPersonality.personalityValueApiDtos
            });

        // Echec de la récupération de la personnalité de l'utilisateur connecté
        case GET_PERSONALITY_CONNECTED_USER_ERROR:
            return Object.assign({}, state, {
                loadingGetPersonality : false,
                message_error:          action.error||"Erreur lors de la récupération de vos caractéristiques"
            });




        // Connexion à partir du token précédent
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
        
        // Déconnexion de l'utilisateur
        case LOGOUT:
            return Object.assign({}, state, {
                loadingSignIn:      false,
                isAuthenticated:    false,
                user:               {},
                personality:        {},
            });

        // Mise à jour de la personalité d'un utilisateur
        case PATCH_CONNECTED_USER_REQUEST: 
            return Object.assign({}, state, {
                loadingPatchUser:    true,
            });

        case PATCH_CONNECTED_USER_SUCCESS:
            return Object.assign({}, state, {
                loadingPatchUser:   false,
                user:               action.user,
            });
        case PATCH_CONNECTED_USER_ERROR:
            return Object.assign({}, state, {
                loadingPatchUser:   false,
                message_error:      action.message||"Vos données n'ont pas pu être actualisées",   
            });

        // Mise à jour de l'utilisateur connecté
        case PATCH_PERSONALITY_CONNECTED_USER_REQUEST: 
            return Object.assign({}, state, {
                loadingPatchPersonality:    true,
            });

        case PATCH_PERSONALITY_CONNECTED_USER_SUCCESS:
            return Object.assign({}, state, {
                loadingPatchPersonality:   false,
                personality:               action.personality,
            });
        case PATCH_PERSONALITY_CONNECTED_USER_ERROR:
            return Object.assign({}, state, {
                loadingPatchPersonality:    false,
                message_error:              action.message||"Vos données n'ont pas pu être actualisées",   
            });

        // Enregistrement de la personnalité d'un utilisateur
        case POST_PERSONALITY_CONNECTED_USER_REQUEST: 
            return Object.assign({}, state, {
                loadingPostPersonality:    true,
            });

        case POST_PERSONALITY_CONNECTED_USER_SUCCESS:
            return Object.assign({}, state, {
                loadingPostPersonality:   false,
                personality:               action.personality
            });
        case POST_PERSONALITY_CONNECTED_USER_ERROR:
            return Object.assign({}, state, {
                loadingPostPersonality:    false,
                message_error:              action.message||"Vos caractéristiques n'ont pas pu être sauvegardées",   
            });






        //autres 
        default : 
            return state;
    }
}

export default connection;