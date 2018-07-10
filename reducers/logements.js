import { 
    //Types d'actions destinées à la récupération des appartements
    POTENTIAL_LOCATION_GET_REQUEST, 
    POTENTIAL_LOCATION_GET_SUCCESS, 
    POTENTIAL_LOCATION_GET_ERROR

 } from '../actions/logements';

//le state initial
const initialAppartementsState = {
    loadingGetAppartementsPotentiels :    false,
    appartementsPotentiels:               [],
    message_error:                        "",
}


const logements = (state = initialAppartementsState, action) => {

    switch(action.type) {
        // Demande de récupération des appartements
        case POTENTIAL_LOCATION_GET_REQUEST: 
            return Object.assign({}, state, {
                loadingGetAppartementsPotentiels :      true,
                appartementsPotentiels:                 []
            });

        // Prise en compte de la récupération des appartements
        case  POTENTIAL_LOCATION_GET_SUCCESS: 
            return Object.assign({}, state, {
                loadingGetAppartementsPotentiels :  false,
                appartementsPotentiels:             action.dataLocations,
            });

        // Erreur lors de la récupération dess appartements
        case  POTENTIAL_LOCATION_GET_ERROR : 
            return Object.assign({}, state, {
                loadingGetAppartementsPotentiels :  false,
                appartementsPotentiels:             [],
                message_error:                      action.message||"Erreur lors de la récupération de nouveaux logements",
            });

        //autres 
        default : 
            return state;
    }
}

export default logements;