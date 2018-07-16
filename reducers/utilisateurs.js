/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */
import { 
    USER_ADD_USER_REQUEST, 
    USER_ADD_USER_SUCCESS, 
    USER_ADD_USER_ERROR, 

    USER_GET_USERS_REQUEST,
    USER_GET_USERS_ERROR,
    USER_GET_USERS_SUCCESS, 

    USER_DELETE_USER_REQUEST,
    USER_DELETE_USER_SUCCESS,
    USER_DELETE_USER_ERROR,

    USER_USER_HIDE_ERROR,

    USER_PUT_USER_REQUEST,
    USER_PUT_USER_SUCCESS,
    USER_PUT_USER_ERROR,

} from '../actions/utilisateurs'


//le state initial
const initialConnectionState = {
    loadingAdd :            false,
    loadingGet:             false,
    loadingPatch:           false,
    loadingPut:             false,

    message_error:          "",

    users: []
}

const utilisateurs = (state = initialConnectionState, action) => {

    switch(action.type) {

        /**
         * Gestion de l'ajout d'un utilisateur
         */
        case USER_ADD_USER_REQUEST: 
            return Object.assign({}, state, {
                loadingAdd : true
            });

        case  USER_ADD_USER_SUCCESS: 
            return Object.assign({}, state, {
                loadingAdd : false,
                users: state.users.concat(action.user)
            });

        case  USER_ADD_USER_ERROR : 
            return Object.assign({}, state, {
                loadingAdd : false,
                message_error:  action.message||"Impossible de créer votre compte utilisateur, merci de vérifier votre saisie",
            });
        


        /**
         * Gestion de la récupération des utilisateurs
         */
        case USER_GET_USERS_REQUEST : 
            return Object.assign({}, state, {
                loadingGet: true,
                message_error: "",
            })


        case USER_GET_USERS_ERROR :
            return Object.assign({}, state, {
                loadingGet: false,
                message_error: "",
            })

        case USER_GET_USERS_SUCCESS :
            return Object.assign({}, state, {
                loadingGet: false,
                users: action.users,
                message_error: "",
            })



        /**
         * Gestion de la suppression d'un utilisateur
         */
        case USER_DELETE_USER_REQUEST:
            return Object.assign({}, state, {
                loadingDeleteId: action.userId,
                message_error: "",
            })
            
        case USER_DELETE_USER_SUCCESS:
            return Object.assign({}, state, {
                users:  state.users.filter(user =>
                    user.userId !== action.userId
                ),
                message_error:      "",
                loadingDeleteId:    null
            })

        case USER_DELETE_USER_ERROR:
            return Object.assign({}, state, {
                message_error:      action.message,
                loadingDeleteId:    null
            })

        // Cacher les message d'erreur
        case  USER_USER_HIDE_ERROR: 
            return Object.assign({}, state, {
                message_error: "",
            });

        //TODO EDIT 
        case USER_PUT_USER_REQUEST:
            return Object.assign({}, state, {
                loadingPutId: action.userId
            });
            
        case USER_PUT_USER_SUCCESS: 
            return Object.assign({}, state, {
                loadingPutId: null,
                message_success:    action.message,
                message_error:      "",
                users:              state.users.map((user) => (user.userId === action.user.userId) ? action.user : user)
            });

        case USER_PUT_USER_ERROR:
            return Object.assign({}, state, {
                loadingPutId:       null,
                message_error:      action.message,
            });

        //autres 
        default : 
            return state;
    }
}

export default utilisateurs;