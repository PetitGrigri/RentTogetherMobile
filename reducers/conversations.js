import { 
    CONVERSATIONS_GET_REQUEST, 
    CONVERSATIONS_GET_SUCCESS, 
    CONVERSATIONS_GET_ERROR, 
 } from '../actions/conversations';

import { isset } from '../utils/check';

//le state initial
const initialConversationsState = {
    loadingConversations :  false,
    conversations:          [],
    participantsId:         [],     //servira à récupérer les images des utilisateurs
    message:                "",
}


const conversations = (state = initialConversationsState, action) => {

    switch(action.type) {
        // Demande de récupération des conversations
        case CONVERSATIONS_GET_REQUEST: 
            return Object.assign({}, state, {
                loadingConversations : true
            });

        // Prise en compte de la récupération des conversations
        case  CONVERSATIONS_GET_SUCCESS: 

            //récupération des Id de tout les participants
            let participantsId = action.conversations.map((conversation) => {
                return conversation.participants.map(participant => {
                    return participant.userApiDto.userId
                })
            }).reduce((accumulator, usersId) => {
                //on ajoute que les utilisateurs que l'on n'a pas encore
                let notYetAddedUsersId = usersId.filter(value => (accumulator.indexOf(usersId) > -1) )

                return [...accumulator, ...notYetAddedUsersId];
            }) || [];


            return Object.assign({}, state, {
                loadingConversations : false,
                conversations:         action.conversations,
                participantsId:        participantsId,
            });

        // Erreur lors de la récupération dess conversations
        case  CONVERSATIONS_GET_ERROR : 
            return Object.assign({}, state, {
                loadingConversations :  false,
                message:                action.message||"Erreur de connexion",
            });

        //autres 
        default : 
            return state;
    }
}

export default conversations;