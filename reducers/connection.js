import { 
    SIGN_IN_REQUEST, 
    SIGN_IN_ERROR, 
    SIGN_IN_SUCESS,

    SIGN_IN_HIDE_ERROR,

    SIGN_IN_WITH_PREVIOUS_TOKEN_REQUEST,
    SIGN_IN_WITH_PREVIOUS_TOKEN_SUCCESS,
    SIGN_IN_WITH_PREVIOUS_TOKEN_ERROR,

    LOGOUT,
 }from '../actions/connection.js'


//le state initial
const initialConnectionState = {
    loadingSignIn :     false,
    loadingSignInToken: false,
    isAuthenticated :   false,
    user:               {},
    message :           "",
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
                message: action.message||"Erreur de connexion",
            });

        //erreur lors de la connexion
        case  SIGN_IN_HIDE_ERROR : 
            return Object.assign({}, state, {
                message: ""
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
                loadingSignIn :     false,
                isAuthenticated :   false,
                user:               {},
            });
            
        //autres 
        default : 
            return state;
    }
}

export default connection;