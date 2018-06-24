// Les données sensibles d'un utilisateur
const sensibleUserParameter = [
    "password", 
];

/**
 * Cette méthode à pour but de supprimer les paramètres sensibles d'un utilisateur
 * Les paramètres sensibles sont contenus dans la variable : sensibleUserParameter
 * @param {object} user 
 */
export const cleanUser = (user) =>  {
    var cleanedUser = {}

    Object.keys(user)
        .filter( parameter =>  sensibleUserParameter.indexOf(parameter) < 0 )
        .forEach( filteredParameter =>  cleanedUser[filteredParameter] = user[filteredParameter] );

    return cleanedUser;
}


/**
 * Cette méthode à pour but de supprimer les paramètres sensibles d'une liste d'utilisateur
 * Les paramètres sensibles sont contenus dans la variable : sensibleUserParameter
 * @param {object} users
 */
export const cleanUsersList = (users) =>  {
   
   return users.map( user => cleanUser(user))
}