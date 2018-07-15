import { 
    //Types d'actions destinées à la récupération des locataires
    CONNECTED_USER_LOCALISATION_GET_REQUEST, 
    CONNECTED_USER_LOCALISATION_GET_SUCCESS, 
    CONNECTED_USER_LOCALISATION_GET_ERROR, 

    //Types d'actions destinées à la récupération de la localisation des utilsiateurs
    SEARCH_LOCALISATION_REQUEST,
    SEARCH_LOCALISATION_SUCCESS,
    SEARCH_LOCALISATION_ERROR,

    //Types d'actions destinées à l'ajout d'une localisation pour l'utilisateur connecté
    CONNECTED_USER_ADD_LOCALISATION_REQUEST,
    CONNECTED_USER_ADD_LOCALISATION_SUCCESS,
    CONNECTED_USER_ADD_LOCALISATION_ERROR,

    //Types d'actions destinées à la suppression d'un souhait de localisation
    CONNECTED_USER_LOCALISATION_DELETE_REQUEST,
    CONNECTED_USER_LOCALISATION_DELETE_SUCCESS,
    CONNECTED_USER_LOCALISATION_DELETE_ERROR,
    
 } from '../actions/localisations';

//le state initial
const initialLocalisationsState = {
    loadingGetLocalisations :    false,
    loadingSearchLocalisation:   false,
    loadingDeleteTargetLocation: [],
    loadingAddLocalisation:      [],

    localisations:               [],
    searchLocalisations:         [],

    message_error:               "",
}


const localisations = (state = initialLocalisationsState, action) => {

    switch(action.type) {
        // Demande de récupération des locataires
        case CONNECTED_USER_LOCALISATION_GET_REQUEST: 
            return Object.assign({}, state, {
                loadingGetLocalisations :    true
            });

        // Prise en compte de la récupération des locataires
        case  CONNECTED_USER_LOCALISATION_GET_SUCCESS: 
            return Object.assign({}, state, {
                loadingGetLocalisations :    false,
                localisations:               action.localisations,
            });

        // Erreur lors de la récupération dess locataires
        case  CONNECTED_USER_LOCALISATION_GET_ERROR : 
            return Object.assign({}, state, {
                loadingGetLocalisations :    false,
                localisations:           [],
                message_error:           action.message||"Erreur lors de la récupération de vos recherches",
            });



        // Demande de récupération des localisations
        case SEARCH_LOCALISATION_REQUEST: 
            return Object.assign({}, state, {
                loadingSearchLocalisation :    true
            });

        // Prise en compte de la récupération des localisations recherchées
        case  SEARCH_LOCALISATION_SUCCESS: 
            return Object.assign({}, state, {
                loadingSearchLocalisation :    false,
                searchLocalisations:            action.localisations,
            });

        // Erreur lors de la récupération dess localisations
        case  SEARCH_LOCALISATION_ERROR : 
            return Object.assign({}, state, {
                loadingSearchLocalisation :     false,
                searchLocalisations:             [],
                message_error:                  action.message||"Erreur lors de la récupération de votre recherches",
            });



        // Demande de récupération des locataires
        case CONNECTED_USER_ADD_LOCALISATION_REQUEST: 
            return Object.assign({}, state, {
                loadingAddLocalisation :    state.localisations.concat(action.localisation)
            });


        // Prise en compte de la récupération des locataires
        case  CONNECTED_USER_ADD_LOCALISATION_SUCCESS: 
            return Object.assign({}, state, {
                
                localisations:              state.localisations.concat(action.localisation),
                loadingAddLocalisation :    state.loadingAddLocalisation.filter(value => {
                    return !((value.postalCodeId == action.localisation.postalCode) && (value.libelle == action.localisation.city) && (value.libelle2 == action.localisation.city2));
                }), 
            });

        // Erreur lors de la récupération dess locataires
        case  CONNECTED_USER_ADD_LOCALISATION_ERROR : 
            return Object.assign({}, state, {
                loadingAddLocalisation :    state.loadingAddLocalisation.filter(value => {
                    return !((value.postalCodeId == action.localisation.postalCode) && (value.libelle == action.localisation.city) && (value.libelle2 == action.localisation.city2));
                }), 
                message_error:              action.message||"Erreur lors de la récupération de vos recherches",
            });



            
        // Demande de récupération des locataires
        case CONNECTED_USER_LOCALISATION_DELETE_REQUEST: 
            return Object.assign({}, state, {
                loadingDeleteTargetLocation :    [...state.loadingDeleteTargetLocation, action.targetLocationId]
            });

        // Prise en compte de la récupération des locataires
        case  CONNECTED_USER_LOCALISATION_DELETE_SUCCESS: 
            return Object.assign({}, state, {
                loadingDeleteTargetLocation :    state.loadingDeleteTargetLocation.filter( value => action.targetLocationId !== value),
                localisations:                   state.localisations.filter( value => action.targetLocationId !== value.targetLocationId)
            });

        // Erreur lors de la récupération dess locataires
        case  CONNECTED_USER_LOCALISATION_DELETE_ERROR : 
            return Object.assign({}, state, {
                loadingDeleteTargetLocation :    state.loadingDeleteTargetLocation.filter( value => action.targetLocationId !== value),
                message_error:              action.message||"Erreur lors de la récupération de vos recherches",
            });




        //autres 
        default : 
            return state;
    }
}

export default localisations;