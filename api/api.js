import { empty } from '../utils/check.js';

const url = window.API_URL;

/**
 * Méthode permettant de se connecter à l'API
 * 
 * @param {string} login Le login de l'utilisateur
 * @param {string} password Le mot de passe de l'utilisateur
 * @param {function} callBackOk Le callback à utiliser quand la connexion sera validée
 * @param {function} callBackError Le callback à utiliser en cas d'erreur
 */
export const connectionAPI =  (login, password, callBackOk, callBackError) => {
    var options = {
        mode: 'cors',
        headers : {
            'Authorization': 'Basic ' +  btoa(login+':'+password)
        }
    }

    fetch(url+ "/Login", options)
        .then(response => {
            if (response.ok) {
                return response.json().catch(error => {
                    throw Error("Erreur de l'API.");
                });
            } else {
                throw Error(response.statusText);
            }
        })
        .then(dataUser => {
            //tentative de connexion d'un administrateur :
            if (!empty(dataUser.token) && !empty(dataUser.email) && !empty(dataUser.firstName) && !empty(dataUser.lastName) && !empty(dataUser.isAdmin)) {
                if (dataUser.isAdmin === 1) {
                    callBackOk(dataUser);
                } else {
                    throw Error("Vous n'êtes pas autorisez à accéder à l'application.");
                }
            } else {
                throw Error("Erreur de l'API");
            }
        })
        .catch(error => {
            callBackError(error.message);
        });
};

/**
 * Fonction permettant de créer un utilisateur
 * 
 * @param {object} user L'objet FormData correspondant à l'utilisateur
 * @param {function} callBackOk 
 * @param {function} callBackError 
 */
export const createUtilisateur= function(user,  callBackOk, callBackError) {
    // Le header contiendra le token d'authentification plus tard
    var myHeaders = new Headers({
        'Content-Type':'application/json'
    });

    // Conversion de notre FormData en objet 
    var jsonUserString = JSON.stringify(user);

    //les paramètres de la requête
    var options = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: jsonUserString
    };

    fetch(url+ "/Users", options)
        .then(response => {
            if (response.ok === true) {
                return response.json().catch(error => {
                    throw Error("Erreur de l'API.");
                });
                //TODO ici ajouter utilisateur
            } else {
                throw Error(response.statusText);
            }
        })
        .then(dataAdministrators => {
            callBackOk(dataAdministrators);
        })
        .catch(error => {
            callBackError(error.message);
        });
}


/**
 * Méthode destinée à récupérer la liste des utilisateurs
 * 
 * @param {string} token Le token de l'utilisateur connecté
 * @param {function} callBackOk Le callback à utiliser quand on aura récupérer la liste des utilisateurs (la liste des utilisateurs sera transmise en paramètre)
 * @param {function} callBackError Le callback à utiliser quand la récupération de la liste des utilisateurs n'est pas possibles (L'erreur sera transmise en paramètre)
 */
export const getUtilisateurs = function(token, callBackOk, callBackError) {
    // Le header contiendra le token d'authentification plus tard
    var myHeaders = new Headers({
        'Content-Type':'application/json',
        'Authorization':'Bearer '+token
    });
    
    //les paramêtres de la requête
    var options = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    fetch(url+ "/Users", options)
        .then(response => {
            if (response.ok === true) {
                return response.json().catch(error => {
                    throw Error("Erreur de l'API.");
                });
            } else {
                throw Error(response.statusText);
            }
        })
        .then(dataAdministrators => {
            callBackOk(dataAdministrators);
        })
        .catch(error => {
            callBackError(error.message);
        });
}


/**
 * Fonction destinée à la suppression d'un utilisateur
 * 
 * @param {int} id L'identifiant d'un utilisateur
 * @param {string} token Le token de l'utilisateur supprimé
 * @param {function} callBackOk Le callback à utiliser lorsque l'utilisateur a été supprimé (ce dernier recevra l'id de l'utilisateur supprimé en paramêtre)
 * @param {function} callBackError Le callback à utiliser lorsque l'utilisateur n'a pas été supprimé (ce dernier recevra un message d'erreur)
 */
export const deleteUser = function(id, token, callBackOk, callBackError) {
     // Le header contiendra le token d'authentification plus tard
    var myHeaders = new Headers({
        'Authorization':'Bearer '+ token
    });
    
    //les paramêtres de la requête
    var options = {
        method: 'DELETE',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    //réalisation de la requête
    fetch(url+ "/Users/"+id, options)
        .then(response => {
            if (response.ok  === true) {
                callBackOk(id);
            } else {
                throw Error(response.statusText);
            }
        })
        .catch(error => {
            callBackError(error.message);
        });
}

/**
 * Fonction destinée à la modification d'un utilisateur
 * Attention : Tout les éléments non remplis (à l'exception de la date de création token et expiration Token) seront mis à null
 * 
 * @param {user} user L'objet utilisateur à enregistrer
 * @param {string} token Le token de l'utilisateur supprimé
 * @param {function} callBackOk Le callback à utiliser lorsque l'utilisateur a été supprimé (ce dernier recevra l'id de l'utilisateur supprimé en paramêtre)
 * @param {function} callBackError Le callback à utiliser lorsque l'utilisateur n'a pas été supprimé (ce dernier recevra un message d'erreur)
 */
export const putUser = function(user, token, callBackOk, callBackError) {
     // Le header contiendra le token d'authentification plus tard
    var myHeaders = new Headers({
        'Content-Type':'application/json',
        'Authorization':'Bearer '+ token
    });

    console.log(user);

    // Conversion de notre FormData en objet 
    var jsonUserString = JSON.stringify(user);
    
    console.log(jsonUserString);

    //les paramêtres de la requête
    var options = {
        method: 'PUT',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: jsonUserString
    };

    //réalisation de la requête
    fetch(url+ "/Users/"+user.userId, options)
        .then(response => {
            if (response.ok === true) {
                return response.json().catch(error => {
                    throw Error("Erreur de l'API.");
                });
            } else {
                throw Error(response.statusText);
            }
        })
        .then(dataUser => {
            setTimeout(() =>
                callBackOk(dataUser),
            10000);
        })
        .catch(error => {
            setTimeout(() =>
                callBackError(error.message),
            10000);
        });
}
