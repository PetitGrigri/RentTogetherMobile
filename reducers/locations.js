import { 
    //Types d'actions destinées à la récupération des locataires
    CONNECTED_USER_LOCATION_GET_REQUEST, 
    CONNECTED_USER_LOCATION_GET_SUCCESS, 
    CONNECTED_USER_LOCATION_GET_ERROR, 

 } from '../actions/locations';

//le state initial
const initialLocationsState = {
    loadingGetLocations :    false,
    locations:               [],
    message_error:           "",
}


const locations = (state = initialLocationsState, action) => {

    switch(action.type) {
        // Demande de récupération des locataires
        case CONNECTED_USER_LOCATION_GET_REQUEST: 
            return Object.assign({}, state, {
                loadingGetLocations :    true
            });

        // Prise en compte de la récupération des locataires
        case  CONNECTED_USER_LOCATION_GET_SUCCESS: 
        console.log('CONNECTED_USER_LOCATION_GET_SUCCESS', action);
            return Object.assign({}, state, {
                loadingGetLocations :    false,
                locations:               action.locations,
            });

        // Erreur lors de la récupération dess locataires
        case  CONNECTED_USER_LOCATION_GET_ERROR : 
            return Object.assign({}, state, {
                loadingGetLocations :    false,
                locations:               [],
                message_error:           action.message||"Erreur lors de la récupération de vos recherches",
            });


        //autres 
        default : 
            return state;
    }
}

export default locations;