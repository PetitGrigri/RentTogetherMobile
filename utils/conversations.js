/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */

/**
 * Méthode permettant de générer le tritre d'une conversation 
 */
 export const generateTitleConversation= (conversation, currentUser) => {

    let title =  conversation.participants
        .filter((participant) =>  currentUser.userId != participant.userApiDto.userId )
        .map(participant => participant.userApiDto)
        .reduce((accumulator, participant) => { 
            let virgule = accumulator.length > 0 ? ', ' : '';
            return accumulator + virgule + `${participant.firstName} ${participant.lastName}`;
        } , '');

    return title;
}