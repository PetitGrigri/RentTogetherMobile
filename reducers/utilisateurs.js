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
    USER_USER_HIDE_MESSAGES,
    USER_USER_HIDE_POPUP_MESSAGES,
    USER_UPDATE_USER_REQUEST,
    USER_UPDATE_USER_SUCCESS,
    USER_UPDATE_USER_ERROR,
} from '../actions/utilisateurs'


//le state initial
const initialConnectionState = {
    loadingAdd : false,
    loadingGet: false,
    loadingUpdateId: null,
    loadingDeleteId: null,
    message_success: "",
    message_error: "",
    message_popup_success: "",
    message_popup_error: "",
    users: []
}

const utilisateurs = (state = initialConnectionState, action) => {

    switch(action.type) {
        // Gestion d'une demande d'ajout d'un utilisateur
        case USER_ADD_USER_REQUEST: 
            return Object.assign({}, state, {
                loadingAdd : true
            });

        // Gestion de la réussite de l'ajout d'un administrateur
        case  USER_ADD_USER_SUCCESS: 
            return Object.assign({}, state, {
                loadingAdd : false,
                message_popup_success: action.message,
                message_popup_error: "",
                users: state.users.concat(action.user)
            });

        // Gestion d'une erreur lors de l'ajout d'un administrateur
        case  USER_ADD_USER_ERROR : 
            return Object.assign({}, state, {
                loadingAdd : false,
                message_popup_error: action.message,
                message_popup_success: ""
            });
        


        case USER_GET_USERS_REQUEST : 
            return Object.assign({}, state, {
                loadingGet: true,
                message_error: "",
                message_success: ""
            })


        case USER_GET_USERS_ERROR :
            return Object.assign({}, state, {
                loadingGet: false,
                message_error: "",
                message_success: ""
            })

        case USER_GET_USERS_SUCCESS :
            return Object.assign({}, state, {
                loadingGet: false,
                users: action.users,
                message_error: "",
                message_success: ""
            })
        
        case USER_DELETE_USER_REQUEST:
            return Object.assign({}, state, {
                loadingDeleteId: action.userId,
                message_error: "",
                message_success: ""
            })
            
        case USER_DELETE_USER_SUCCESS:
            return Object.assign({}, state, {
                users:  state.users.filter(user =>
                    user.userId !== action.userId
                ),
                message_success: "Utilisateur supprimé",
                message_error: "",
                loadingDeleteId: null
            })

        case USER_DELETE_USER_ERROR:
            return Object.assign({}, state, {
                message_success: "",
                message_error: action.message,
                loadingDeleteId: null
            })
        

        // Cacher le message d'erreur
        case  USER_USER_HIDE_MESSAGES : 
            return Object.assign({}, state, {
                message_error: "",
                message_success: ""
            });

        // Cacher le message de réussite
        case  USER_USER_HIDE_POPUP_MESSAGES : 
            return Object.assign({}, state, {
                message_popup_success: "",
                message_popup_error: "",
            });

        //TODO EDIT 
        case USER_UPDATE_USER_REQUEST:
            return Object.assign({}, state, {
                loadingUpdateId: action.userId
            });
            
        case USER_UPDATE_USER_SUCCESS: 
            return Object.assign({}, state, {
                loadingUpdateId: null,
                message_success: action.message,
                message_error: "",
                users: state.users.map((userState) => (userState.userId === action.user.userId) ? action.user : userState)
            });

        case USER_UPDATE_USER_ERROR:
            return Object.assign({}, state, {
                loadingUpdateId: null,
                message_error: action.message,
                message_success: ""
            });

        //autres 
        default : 
            return state;
    }
}

export default utilisateurs;