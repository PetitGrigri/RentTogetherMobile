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
    usersConversations:     {},
    message:                "",
}


const connection = (state = initialConversationsState, action) => {

    switch(action.type) {
        // Demande de récupération des conversations
        case CONVERSATIONS_GET_REQUEST: 
            return Object.assign({}, state, {
                loadingConversations : true
            });

        // Prise en compte de la récupération des conversations
        case  CONVERSATIONS_GET_SUCCESS: 


            console.log('conversations', action.conversations);

            //récupération de tout les participants présents dans les conversations
            let participantsId = action.conversations.map((conversation) => {
                return conversation.participants.map(participant => {
                    return participant.userId
                })
            }).reduce((accumulator, usersId) => {
                //on ajoute que les utilisateurs que l'on n'a pas encore
                let notYetAddedUsersId = usersId.filter(value => (accumulator.indexOf(usersId) > -1) )

                return [...accumulator, ...notYetAddedUsersId];
            }) || [];

            //Création d'un nouvel objet de participants avec les nouveaux
            let participants = Object.assign({}, state.usersConversations);
            
            participantsId.forEach(function(item){
                //ici item devra être remplacé par l'id de l'utilisateur
                participants[item] = {
                    "userId": item,
                    "firstName": "Super",
                    "lastName": "Admin",
                    "email": "super.admin@renttogether.fr",
                    "password": "grigri",
                    "phoneNumber": 17314053,
                    "isOwner": 0,
                    "isRoomer": 0,
                    "isAdmin": 1,
                    "createDate": "2018-04-15T11:22:08.1901804",
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZ3Jpc2VsbGVzQGhvdG1haWwuZnIiLCJqdGkiOiIzMWEzNzIwZS0wNDI0LTRjZDgtYTkxOC1jNmJjMGFlMjcwYmEiLCJuYmYiOjE1MjM3OTEzMjgsImV4cCI6MTUyMzg3NzcyOH0.OutPg3j7B5z_FQOXio8V2dhDNDm5qAu6JK_lBTseq08",
                    "tokenExpirationDate": "2018-04-16T11:22:08.190109",
                    "image": null,
                };
            });

            console.log('participants : ', participants);

            return Object.assign({}, state, {
                loadingConversations : false,
                conversations:         action.conversations,
                usersConversations:    participants,
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

export default connection;