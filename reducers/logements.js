import { 
    //Types d'actions destinées à la récupération des appartements
    POTENTIAL_LOCATION_GET_REQUEST, 
    POTENTIAL_LOCATION_GET_SUCCESS, 
    POTENTIAL_LOCATION_GET_ERROR,

    // Actions destinées à la création d'un appartement
    BUILDING_POST_REQUEST,
    BUILDING_POST_SUCCESS,
    BUILDING_POST_ERROR,
    
    BUILDING_HIDE_ERROR

 } from '../actions/logements';

//le state initial
const initialAppartementsState = {
    loadingGetAppartementsPotentiels :  false,
    loadingPostBuilding:                false,
    appartementsPotentiels:             [],
    message_error:                      "",
    
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


        // Demande de création d'un nouvel appartement
        case BUILDING_POST_REQUEST: 
            return Object.assign({}, state, {
                loadingPostBuilding :      true,
            });

        // Prise en compte de la création d'un nouvel appartement
        case  BUILDING_POST_SUCCESS: 
            return Object.assign({}, state, {
                loadingPostBuilding :      false,
                appartementsPotentiels:     state.appartementsPotentiels.concat(action.dataBuilding)
            });

        // Erreur lors de la création d'un nouvel appartement
        case  BUILDING_POST_ERROR : 
            return Object.assign({}, state, {
                loadingPostBuilding :      false,
                message_error:             action.message||"Erreur lors de la création de votre logement",
            });



        // Cacher les message d'erreur
        case  BUILDING_HIDE_ERROR: 
            return Object.assign({}, state, {
                message_error: "",
            });
            






        //autres 
        default : 
            return state;
    }
}

export default logements;