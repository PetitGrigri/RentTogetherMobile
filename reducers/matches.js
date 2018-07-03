import { 
    //Types d'actions destinées à la récupération des locataires
    POTENTIAL_ROOMER_GET_REQUEST, 
    POTENTIAL_ROOMER_GET_SUCCESS, 
    POTENTIAL_ROOMER_GET_ERROR, 
    // Actions destinées à la validation d'un match
    POTENTIAL_ROOMER_POST_REQUEST,
    POTENTIAL_ROOMER_POST_SUCCESS,
    POTENTIAL_ROOMER_POST_ERROR,
    //Types d'actions destinées à la récupération des locataires qui se sont validés
    VALIDATED_ROOMER_GET_REQUEST, 
    VALIDATED_ROOMER_GET_SUCCESS, 
    VALIDATED_ROOMER_GET_ERROR
 } from '../actions/matches';

import { isset } from '../utils/check';

//le state initial
const initialLocatairesState = {
    loadingGetLocatairesPotentiels :    false,
    loadingGetLocatairesValides:        false,
    loadingPostLocatairesPotentiels :   false,
    locatairesPotentiels:               [],
    locatairesValides:                  [],
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





            // Demande de récupération des locataires
        case VALIDATED_ROOMER_GET_REQUEST: 
            return Object.assign({}, state, {
                loadingGetLocatairesValides :    true
            });

        // Prise en compte de la récupération des locataires
        case  VALIDATED_ROOMER_GET_SUCCESS: 

            return Object.assign({}, state, {
                loadingGetLocatairesValides :       false,
                locatairesValides:                  action.validatedRoomers,
            });

        // Erreur lors de la récupération dess locataires
        case  VALIDATED_ROOMER_GET_ERROR : 
            return Object.assign({}, state, {
                loadingGetLocatairesValides :       false,
                locatairesValides:                  [],
                message_error:                      action.message||"Erreur de connexion",
            });
        //autres 
        default : 
            return state;
    }
}

export default matches;