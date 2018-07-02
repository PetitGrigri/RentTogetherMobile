import { 
    //Types d'actions destinées à la récupération des conversations
    CONVERSATIONS_GET_REQUEST, 
    CONVERSATIONS_GET_SUCCESS, 
    CONVERSATIONS_GET_ERROR, 

    //Types d'actions destinées à la récupération des conversations
    CONVERSATIONS_POST_REQUEST,
    CONVERSATIONS_ADD_PARTICIPANTS_POST_REQUEST,
    CONVERSATIONS_POST_SUCCESS,
    CONVERSATIONS_POST_ERROR,

    // Action de nettoyage des conversations quand on se déconnecte
    CONVERSATIONS_LOGOUT
 } from '../actions/conversations';

import { isset } from '../utils/check';

//le state initial
const initialConversationsState = {
    loadingConversations :      false,
    loadingPostConversations :  false,
    conversations:              [],
    participantsId:             [],     //servira à récupérer les images des utilisateurs
    message:                    "",
    createdConversation:        null
}


const conversations = (state = initialConversationsState, action) => {

    switch(action.type) {
        // Demande de récupération des conversations
        case CONVERSATIONS_GET_REQUEST: 
            return Object.assign({}, state, {
                loadingConversations :  true,
                conversations:          []
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

        // Quand un utilisateur se déconnecte, on nettoie toutes les conversations présente pour que le prochain n'y ai plus accès
        case CONVERSATIONS_LOGOUT: 
            return Object.assign({}, state, {
                loadingConversations :  false,
                conversations:          [],
                participantsId:         [],
                message:                "",
            });



        case CONVERSATIONS_POST_REQUEST:
            return Object.assign({}, state, {
                loadingPostConversations :  true
            });

        case CONVERSATIONS_ADD_PARTICIPANTS_POST_REQUEST:
            return Object.assign({}, state, {
                loadingPostConversations :  true
            });

        case CONVERSATIONS_POST_SUCCESS:

            let createdConversation = Object.assign({}, action.conversation);

            createdConversation.participants = action.participants;

            console.log('CONVERSATIONS_POST_SUCCESS REDUCER', createdConversation)
            
            return Object.assign({}, state, {
                loadingPostConversations :  false,
                createdConversation:        createdConversation
            });

        case CONVERSATIONS_POST_ERROR:
            return Object.assign({}, state, {
                loadingPostConversations :  false,
                message:                    action.error
            });


            

        //autres 
        default : 
            return state;
    }
}

export default conversations;