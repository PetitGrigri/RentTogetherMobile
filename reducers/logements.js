import { 
    //Types d'actions destinées à la récupération des appartements
    POTENTIAL_LOCATION_GET_REQUEST, 
    POTENTIAL_LOCATION_GET_SUCCESS, 
    POTENTIAL_LOCATION_GET_ERROR,

    // Actions destinées à la création d'un appartement
    BUILDING_POST_REQUEST,
    BUILDING_POST_SUCCESS,
    BUILDING_POST_ERROR,
    
    // Actions destiné à historiser un appartement (indiquer que l'on l'a déjà vu, mais qu'il ne nous interesse pas)
    BUILDING_POST_HISTORY_REQUEST,
    BUILDING_POST_HISTORY_SUCCESS,
    BUILDING_POST_HISTORY_ERROR,

    // Actions destiné à mettre un logement en favoris
    BUILDING_ADD_FAVORITE_REQUEST,
    BUILDING_ADD_FAVORITE_SUCCESS,
    BUILDING_ADD_FAVORITE_ERROR,

    // Actions destiné à récupérer les appartements favoris
    BUILDING_GET_FAVORITE_REQUEST,
    BUILDING_GET_FAVORITE_SUCCESS,
    BUILDING_GET_FAVORITE_ERROR,

    // Actions destinées à la mise à jour d'un appartement
    BUILDING_PUT_REQUEST,
    BUILDING_PUT_SUCCESS,
    BUILDING_PUT_ERROR,


    BUILDING_HIDE_ERROR

 } from '../actions/logements';

//le state initial
const initialAppartementsState = {
    loadingGetAppartementsPotentiels:   false,
    loadingGetAppartementsFavoris:      false,
    loadingPostBuilding:                false,
    loadingPutBuilding:                 false,
    loadingPostPostHistory:             false,
    loadingBuildingFavorite:            false,
    appartementsPotentiels:             [],
    appartementsFavoris:                [],
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


        // Demande de l'historisation d'un appartement
        case BUILDING_POST_HISTORY_REQUEST: 
            return Object.assign({}, state, {
                loadingPostPostHistory :      true,
            });

        // Prise en compte de l'historisation d'un appartement
        case  BUILDING_POST_HISTORY_SUCCESS: 
            return Object.assign({}, state, {
                loadingPostPostHistory :      false,
                // action.dataBuildingHistory non utilisé pour le moment
            });

        // Erreur lors de l'historisation d'un appartement
        case  BUILDING_POST_HISTORY_ERROR : 
            return Object.assign({}, state, {
                loadingPostPostHistory :    false,
                message_error:              action.message||"Erreur lors de la prise en compte de votre refus",
            });



            // Mise en favori d'un appartement
            case BUILDING_ADD_FAVORITE_REQUEST: 
                return Object.assign({}, state, {
                    loadingBuildingFavorite :      true,
                });

            // Mise en favori : OK
            case  BUILDING_ADD_FAVORITE_SUCCESS: 
                return Object.assign({}, state, {
                    loadingBuildingFavorite :      false,
                    // action.dataBuildingFavorite non utilisé pour le moment
                });

            // Mise en favori : KO
            case  BUILDING_ADD_FAVORITE_ERROR : 
                return Object.assign({}, state, {
                    loadingBuildingFavorite :    false,
                    message_error:              action.message||"Erreur lors de la prise en compte de votre refus",
                });








        // Cacher les message d'erreur
        case  BUILDING_HIDE_ERROR: 
            return Object.assign({}, state, {
                message_error: "",
            });
            




        // Demande de récupération des appartements
        case BUILDING_GET_FAVORITE_REQUEST: 
            return Object.assign({}, state, {
                loadingGetAppartementsFavoris :      true,
                appartementsFavoris:              []
            });

        // Prise en compte de la récupération des appartements
        case  BUILDING_GET_FAVORITE_SUCCESS: 
            return Object.assign({}, state, {
                loadingGetAppartementsFavoris :     false,
                appartementsFavoris:                action.dataLocations,
            });

        // Erreur lors de la récupération dess appartements
        case  BUILDING_GET_FAVORITE_ERROR : 
            return Object.assign({}, state, {
                loadingGetAppartementsFavoris :     false,
                appartementsFavoris:                [],
                message_error:                      action.message||"Erreur lors de la récupération de vos appartements favoris",
            });









        // Demande de création d'un nouvel appartement
        case BUILDING_PUT_REQUEST: 
            return Object.assign({}, state, {
                loadingPutBuilding :      true,
            });

        // Prise en compte de la création d'un nouvel appartement
        case  BUILDING_PUT_SUCCESS: 
            return Object.assign({}, state, {
                loadingPutBuilding :      false,
                appartementsPotentiels:   state.appartementsPotentiels.map(
                    buildingState => (buildingState.buildingId === action.dataBuilding.buildingId) ? action.dataBuilding : buildingState
                )
            });

        // Erreur lors de la création d'un nouvel appartement
        case  BUILDING_PUT_ERROR : 
            return Object.assign({}, state, {
                loadingPutBuilding :      false,
                message_error:             action.message||"Erreur lors de la création de votre logement",
            });



        //autres 
        default : 
            return state;
    }
}

export default logements;