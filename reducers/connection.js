import { SIGN_IN_REQUEST, SIGN_IN_ERROR, SIGN_IN_SUCESS, SIGN_IN_HIDE_ERROR }from '../actions/connection.js'


//le state initial
const initialConnectionState = {
    loadingSignIn : false,
    isAuthenticated : false,
    user: {},
    message : "",
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
            return Object.assign({}, {
                loadingSignIn : false,
                isAuthenticated: false,
                message: action.message,
            });

        //erreur lors de la connexion
        case  SIGN_IN_HIDE_ERROR : 
            return Object.assign({}, {
                message: ""
            });

        //autres 
        default : 
            return state;
    }
}

export default connection;