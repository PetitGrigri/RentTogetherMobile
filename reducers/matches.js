import { 
    //Types d'actions destinées à la récupération des locataires
    POTENTIAL_ROOMER_GET_REQUEST, 
    POTENTIAL_ROOMER_GET_SUCCESS, 
    POTENTIAL_ROOMER_GET_ERROR, 
    // Actions destinées à la validation d'un match
    POTENTIAL_ROOMER_POST_REQUEST,
    POTENTIAL_ROOMER_POST_SUCCESS,
    POTENTIAL_ROOMER_POST_ERROR

 } from '../actions/matches';

import { isset } from '../utils/check';

//le state initial
const initialLocatairesState = {
    loadingGetLocatairesPotentiels :    false,
    loadingPostLocatairesPotentiels :   false,
    locatairesPotentiels:               [],
    message_error:                      "",
}


const matches = (state = initialLocatairesState, action) => {

    switch(action.type) {
        // Demande de récupération des locataires
        case POTENTIAL_ROOMER_GET_REQUEST: 
            return Object.assign({}, state, {
                loadingGetLocatairesPotentiels :    true
            });

        // Prise en compte de la récupération des locataires
        case  POTENTIAL_ROOMER_GET_SUCCESS: 

            return Object.assign({}, state, {
                loadingGetLocatairesPotentiels :    false,
                locatairesPotentiels:               action.roomers,
            });

        // Erreur lors de la récupération dess locataires
        case  POTENTIAL_ROOMER_GET_ERROR : 
            return Object.assign({}, state, {
                loadingGetLocatairesPotentiels :    false,
                locatairesPotentiels:               [],
                message_error:                      action.message||"Erreur de connexion",
            });




        case POTENTIAL_ROOMER_POST_REQUEST:
            return Object.assign({}, state, {
                loadingPostLocatairesPotentiels :    true
            });
        
        case POTENTIAL_ROOMER_POST_SUCCESS:
            return Object.assign({}, state, {
                loadingPostLocatairesPotentiels :    false
                //TODO Update locatairesPotentiels ? ac action.dataMatch
            });

        case POTENTIAL_ROOMER_POST_ERROR:
            return Object.assign({}, state, {
                loadingPostLocatairesPotentiels :   false,
                message_error:                      action.message||"Erreur lors de la validation de votre match",
            });

        //autres 
        default : 
            return state;
    }
}

export default matches;