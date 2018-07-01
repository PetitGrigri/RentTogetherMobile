import { 
    //Types d'actions destinées à la récupération des locataires
    POTENTIAL_ROOMER_GET_REQUEST, 
    POTENTIAL_ROOMER_GET_SUCCESS, 
    POTENTIAL_ROOMER_GET_ERROR, 

 } from '../actions/matches';

import { isset } from '../utils/check';

//le state initial
const initialLocatairesState = {
    loadingGetLocatairesPotentiels :    false,
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


        //autres 
        default : 
            return state;
    }
}

export default matches;