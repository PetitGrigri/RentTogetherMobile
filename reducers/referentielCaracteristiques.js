import { 
    REFERENTIAL_GET_CHARACTERISTICS_REQUEST, 
    REFERENTIAL_GET_CHARACTERISTICS_SUCCESS, 
    REFERENTIAL_GET_CHARACTERISTICS_ERROR


 } from '../actions/referentielCaracteristiques';

import { isset } from '../utils/check';

//le state initial
const initialMessagesState = {
    loadingGetReferential:      false,
    characteristicsReferencial: {},
    message_error:              "",
}

const referentielCaracteristiques = (state = initialMessagesState, action) => {

    switch(action.type) {
        // Demande de récupération des messages
        case REFERENTIAL_GET_CHARACTERISTICS_REQUEST: 
            return Object.assign({}, state, {
                loadingGetReferential:  true,
            });

        // Prise en compte de la récupération des messages
        case  REFERENTIAL_GET_CHARACTERISTICS_SUCCESS: 
            
            // Conversion de l'array de caractéristiques en objet en se basant sur son id (personalityReferencialId)
            let characteristicsReferencialObject = {};
            action.characteristicsReferencial.forEach(characteristic => {
                characteristicsReferencialObject[characteristic.personalityReferencialId] = characteristic
            })

            return Object.assign({}, state, {
                loadingGetReferential:      false,
                characteristicsReferencial: characteristicsReferencialObject
            });

        // Erreur lors de la récupération dess messages
        case  REFERENTIAL_GET_CHARACTERISTICS_ERROR : 
            return Object.assign({}, state, {
                loadingGetReferential:  false,
                error:                  action.message||"Erreur dans la récupération des caractéristiques",
            });

        //autres 
        default : 
            return state;
    }
}

export default referentielCaracteristiques;