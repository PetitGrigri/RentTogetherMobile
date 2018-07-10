import { empty } from '../utils/check.js';
import * as config from '../config.js';
import { urlWithParams } from '../utils/convert';
import { cleanUser, cleanUsersList } from '../utils/clean.js';
import base64 from 'base-64';

const url = config.REACT_APP_API_URL;

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
            'Authorization': 'Basic ' +  base64.encode(login+':'+password)
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
            if (!empty(dataUser.token) && !empty(dataUser.email)) {
                callBackOk(cleanUser(dataUser));
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
 * @param {object} filter Un objet représentant le filtre à utiliser
 * @param {function} callBackOk Le callback à utiliser quand on aura récupérer la liste des utilisateurs (la liste des utilisateurs sera transmise en paramètre)
 * @param {function} callBackError Le callback à utiliser quand la récupération de la liste des utilisateurs n'est pas possibles (L'erreur sera transmise en paramètre)
 */
export const getUtilisateurs = function(token, filter, callBackOk, callBackError) {
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

    console.log(urlWithParams(url+ "/Users", filter));

    fetch(urlWithParams(url+ "/Users", filter), options)
        .then(response => {
            if (response.ok === true) {
                return response.json().catch(error => {
                    throw Error("Erreur de l'API.");
                });
            } else {
                throw Error(response.statusText);
            }
        })
        .then(dataUsers => {
            callBackOk(cleanUsersList(dataUsers));
        })
        .catch(error => {
            callBackError(error.message);
        });
}


/**
 * Méthode destinée à récupérer un utilisateur
 * 
 * @param {string} token Le token de l'utilisateur connecté
 * @param {string||int} userId L'id de l'utilisateur
 * @param {function} callBackOk Le callback à utiliser quand on aura récupérer la liste des utilisateurs (la liste des utilisateurs sera transmise en paramètre)
 * @param {function} callBackError Le callback à utiliser quand la récupération de la liste des utilisateurs n'est pas possibles (L'erreur sera transmise en paramètre)
 */
export const getSingleUtilisateur = function(token, userId, callBackOk, callBackError) {

    // Le header contiendra le token d'authentification plus tard
    var myHeaders = new Headers({
        'Content-Type':'application/json',
        'Authorization':'Bearer '+token
    });


    //les paramêtres de la requête
    var options = {
        method:     'GET',
        headers:    myHeaders,
        mode:       'cors',
        cache:      'default'
    };

    //l'url à utiliser pour récupérer l'utilisateur
    let urlUsers = `${url}/Users/${userId}`;

    fetch(urlUsers, options)
        .then(response => {
            if (response.ok === true) {
                return response.json().catch(error => {
                    throw Error("Erreur de l'API.");
                });
            } else {
                throw Error(response.statusText);
            }
        })
        .then(dataUsers => {
            callBackOk(dataUsers);
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




/**
 * Fonction destinée à la modification d'un utilisateur
 * 
 * @param {user} user L'objet utilisateur à enregistrer
 * @param {string} token Le token de l'utilisateur supprimé
 * @param {function} callBackOk Le callback à utiliser lorsque l'utilisateur a été supprimé (ce dernier recevra l'id de l'utilisateur supprimé en paramêtre)
 * @param {function} callBackError Le callback à utiliser lorsque l'utilisateur n'a pas été supprimé (ce dernier recevra un message d'erreur)
 */
export const patchUser = function(token, user, callBackOk, callBackError) {

    console.log(token, user, callBackOk, callBackError);

    // Le header contiendra le token d'authentification plus tard
   var myHeaders = new Headers({
       'Content-Type':'application/json',
       'Authorization':'Bearer '+ token
   });

   // Conversion de notre FormData en objet 
   var jsonUserString = JSON.stringify(user);
   
   console.log(jsonUserString);

   //les paramêtres de la requête
   var options = {
       method:      'PATCH',
       headers:     myHeaders,
       mode:        'cors',
       cache:       'default',
       body:        jsonUserString
   };

   //réalisation de la requête
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
       .then(dataUser => callBackOk(dataUser))
       .catch(error => callBackError(error.message));
}




export const getUserMedia = function(token, userId, callBackOk, callBackError) {
    // Le header contiendra le token d'authentification plus tard
   var myHeaders = new Headers({
       'Authorization':'Bearer '+ token
   });

   //les paramêtres de la requête
   var options = {
       method: 'GET',
       headers: myHeaders,
       mode: 'cors',
       cache: 'default',
   };

   //réalisation de la requête
   fetch(url+ "/media/"+userId, options)
        .then(response => {
            if (response.ok === true) {
                return response.blob();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(blob => {
            var reader = new FileReader();

            reader.addEventListener("load", function () {
                callBackOk(userId, reader.result)
            }, false);

            reader.readAsDataURL(blob);
            //reader.readAsText(blob);
        })
        .catch(error => {
            console.log("Image inexistante");
            callBackError(userId, error.message);
        });
}




/**
 * Fonction permettant de récupérer les conversation d'un utilisateur
 * @param {string} token 
 * @param {int} userId 
 * @param {object} filter 
 * @param {function} callBackOk 
 * @param {function} callBackError 
 */
export const getConversations = function(token, userId, filter, callBackOk, callBackError) {
    // Le header contiendra le token d'authentification plus tard
    let myHeaders = new Headers({
        'Content-Type':     'application/json',
        'Authorization':    'Bearer '+token
    });

    //les paramètres de la requête
    let options = {
        method:     'GET',
        headers:    myHeaders,
        mode:       'cors',
        cache:      'default'
    };

    let gestConversationsURL = urlWithParams(`${url}/Conversations/${userId}`,filter);

    console.log(gestConversationsURL);
    console.log(options);

    fetch(gestConversationsURL, options)
        .then(response => {
            if (response.ok === true) {
                return response.json().catch(error => {
                    throw Error("Erreur de l'API.");
                });
            } else {
                throw Error(response.statusText);
            }
        })
        .then(dataConversations => {
            callBackOk(dataConversations);
        })
        .catch(error => {
            callBackError(error.message);
        });
}



/**
 * Fonction permettant de récupérer la liste des messages d'une conversation
 * @param {string} token 
 * @param {int} conversationId 
 * @param {object} filter 
 * @param {function} callBackOk 
 * @param {function} callBackError 
 */
export const getMessages = function(token, conversationId, filter, callBackOk, callBackError) {
    // Le header contiendra le token d'authentification plus tard
    let myHeaders = new Headers({
        'Content-Type':     'application/json',
        'Authorization':    'Bearer '+token
    });

    //les paramètres de la requête
    let options = {
        method:     'GET',
        headers:    myHeaders,
        mode:       'cors',
        cache:      'default'
    };

    let getMessagesURL = urlWithParams(`${url}/Conversations/${conversationId}/Messages`,filter);

    console.log(getMessagesURL);
    console.log(options);

    fetch(getMessagesURL, options)
        .then(response => {
            if (response.ok === true) {
                return response.json().catch(error => {
                    throw Error("Erreur de l'API.");
                });
            } else {
                throw Error(response.statusText);
            }
        })
        .then(dataMessages => {
            callBackOk(dataMessages);
        })
        .catch(error => {
            callBackError(error.message);
        });
    
}


/**
 * Fonction permettant d'ajouter un nouveau message dans une conversation
 * @param {string} token 
 * @param {int} userId 
 * @param {int} conversationId 
 * @param {string} message 
 * @param {function} callBackOk 
 * @param {function} callBackError 
 */
export const postMessage = function(token, userId, conversationId, message,  callBackOk, callBackError) {

    // Le header contiendra le token d'authentification plus tard
    var myHeaders = new Headers({
        'Content-Type':     'application/json',
        'Authorization':    'Bearer '+token
    });

    // Conversion de notre FormData en objet 
    var jsonMessageString = JSON.stringify({
        "userId":           userId,
        "conversationId":   conversationId,
        "messageText":      message
    });

    //les paramètres de la requête
    var options = {
        method:     'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: jsonMessageString
    };

    fetch(url+ "/messages", options)
        .then(response => {
            if (response.ok === true) {
                return response.json().catch(error => {
                    throw Error("Erreur de l'API.");
                });
            } else {
                throw Error(response.statusText);
            }
        })
        .then(message => {
            callBackOk(message);
        })
        .catch(error => {
            callBackError(error.message);
        });
}


/**
 * Fonction permettant d'uploader une Image d'utilisateur
 * @param {string} token 
 * @param {int} userId 
 * @param {string} imageURI 
 * @param {function} callBackOk 
 * @param {function} callBackError 
 */
export const postUploadUserImage = function(token, userId, imageURI, callBackOk, callBackError) {

    var formData = new FormData();
    formData.append('userId', userId);
    formData.append('file', {uri: imageURI , name: 'user.jpg', type: 'image/jpg'});


    // Le header contiendra le token d'authentification plus tard
    var myHeaders = new Headers({
        'Content-Type':     'multipart/form-data',
        'Authorization':    'Bearer '+token
    });

    //les paramètres de la requête
    var options = {
        method:  'POST',
        headers: myHeaders,
        mode:   'cors',
        body:   formData
    };

    fetch(url+ "/media", options)
        .then(response => {
            console.log('API 1', response);
            if (response.ok === true) {
                return response.blob();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(blob => {
            console.log('API 2');
            var reader = new FileReader();

            reader.addEventListener("load", function () {
                callBackOk(reader.result)
            }, false);

            reader.readAsDataURL(blob);
        })
        .catch(error => {
            callBackError(error.message);
        });
}




/**
 * Cette fonction permet de récupérer la liste des référentiels des charactéristiques. 
 * @param {string} token 
 * @param {function} callBackOk 
 * @param {function} callBackError 
 */
export const getCharacteristicsReferential = function(token, callBackOk, callBackError) {
    // Le header contiendra le token d'authentification plus tard
    let myHeaders = new Headers({
        'Content-Type':     'application/json',
        'Authorization':    'Bearer '+token
    });

    //les paramètres de la requête
    let options = {
        method:     'GET',
        headers:    myHeaders,
        mode:       'cors',
        cache:      'default'
    };

    let urlCharacteristicsReferential = `${url}/PersonalitiesDetails`;

    fetch(urlCharacteristicsReferential, options)
        .then(response => {
            if (response.ok === true) {
                return response.json().catch(error => {
                    throw Error("Erreur de l'API.");
                });
            } else {
                throw Error(response.statusText);
            }
        })
        .then(dataCharacteristicsReferential => {
            callBackOk(dataCharacteristicsReferential);
        })
        .catch(error => {
            callBackError(error.message);
        });
}



/**
 * Cette fonction permet de récupérer la personalité d'un utilisateur
 * @param {string} token 
 * @param {int} userId 
 * @param {function} callBackOk 
 * @param {function} callBackError 
 */
export const getPersonnalityUser = function(token, userId, callBackOk, callBackError) {
    // Le header contiendra le token d'authentification plus tard
    let myHeaders = new Headers({
        'Content-Type':     'application/json',
        'Authorization':    'Bearer '+token
    });

    //les paramètres de la requête
    let options = {
        method:     'GET',
        headers:    myHeaders,
        mode:       'cors',
        cache:      'default'
    };

    let urlPersonalities = `${url}/Personalities/${userId}`;

    fetch(urlPersonalities, options)
        .then(response => {
            // Réponse normale ou tout s'est bien passé
            if (response.ok === true) {
                return response.json().catch(error => {
                    throw Error("Erreur de l'API.");
                });
            // Réponse 404 ou l'utilisateur n'a pas encore de personalité
            } else if (response.status === 404) {
                return {
                    personalityValueApiDtos:[]
                };
            // Erreur
            } else {
                throw Error(response.statusText);
            }
        })
        .then(dataPersonality => {
            callBackOk(dataPersonality);
        })
        .catch(error => {
            callBackError(error.message);
        });
}






/**
 * Fonction destinée à la modification des caractéristiques d'un utilisateur
 * 
 * @param {string} token Le token de l'utilisateur connecté
 * @param {array} personality la ou les personalités d'un utlisateur à modifier
 * @param {int} userId l'id de l'utilisateur à mettre à jour
 * @param {function} callBackOk Le callback à utiliser lorsque la personalité de l'utilisateur a été mis à jour
 * @param {function} callBackError Le callback à utiliser lorsque la personalité de l'utilisateur n'a pas pu être mis à jour
 */
export const patchPersonalityUser = function(token, personality, userId, callBackOk, callBackError) {

    console.log(token, personality, callBackOk, callBackError);

    // Le header contiendra le token d'authentification plus tard
   var myHeaders = new Headers({
       'Content-Type':'application/json',
       'Authorization':'Bearer '+ token
   });

   // Conversion de notre FormData en objet 
   var jsonPersonalityString = JSON.stringify(personality);
   
   console.log(jsonPersonalityString);

   //les paramêtres de la requête
   var options = {
       method:      'PATCH',
       headers:     myHeaders,
       mode:        'cors',
       cache:       'default',
       body:        jsonPersonalityString
   };

   let urlPersonality = `${url}/Personalities/${userId}`;

   //réalisation de la requête
   fetch(urlPersonality, options)
       .then(response => {
           if (response.ok === true) {
               return response.json().catch(error => {
                   throw Error("Erreur de l'API.");
               });
           } else {
               throw Error(response.statusText);
           }
       })
       .then(dataPersonality => callBackOk(dataPersonality))
       .catch(error => callBackError(error.message));
}



/**
 * Fonction permettant de créer un utilisateur
 * 
 * @param {object} user L'objet FormData correspondant à l'utilisateur
 * @param {function} callBackOk 
 * @param {function} callBackError 
 */
export const postPersonalityUser= function(token, personality, userId,  callBackOk, callBackError) {
    console.log(1, token, personality, userId,  callBackOk, callBackError);
    // Le header contiendra le token d'authentification plus tard
    var myHeaders = new Headers({
        'Content-Type':'application/json',
        'Authorization':'Bearer '+ token
    });

    // Conversion de notre FormData en objet 
    var jsonPersonalityString = JSON.stringify(personality);

    //les paramètres de la requête
    var options = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: jsonPersonalityString
    };

    let urlPersonality = `${url}/Personalities/${userId}`;

    fetch(urlPersonality, options)
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
        .then(dataPersonality => {
            callBackOk(dataPersonality);
        })
        .catch(error => {
            callBackError(error.message);
        });
}

/**
 * Méthode destinée à récupérer la liste des collocataires potentiels
 * 
 * @param {string} token Le token de l'utilisateur connecté
 * @param {int} userId L'id de l'utilisateur connecté
 * @param {object} filter Un objet représentant le filtre à utiliser
 * @param {function} callBackOk Le callback à utiliser quand on aura récupérer la liste des utilisateurs (la liste des utilisateurs sera transmise en paramètre)
 * @param {function} callBackError Le callback à utiliser quand la récupération de la liste des utilisateurs n'est pas possibles (L'erreur sera transmise en paramètre)
 */
export const getLocatairesPotentiels = function(token, userId, filter, callBackOk, callBackError) {
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

    let urlLocatairesPotentiels = urlWithParams(`${url}/Matches/${userId}`, filter)

    console.log(urlLocatairesPotentiels);

    fetch(urlLocatairesPotentiels, options)
        .then(response => {
            if (response.ok === true) {
                return response.json().catch(error => {
                    throw Error("Erreur de l'API.");
                });
            } else {
                throw Error(response.statusText);
            }
        })
        .then(dataPotentialRoomers => {
            callBackOk(dataPotentialRoomers);
        })
        .catch(error => {
            callBackError(error.message);
        });
}





/**
 * Méthode destinée à récupérer la liste des localisations souhaités par l'utilisateur
 * 
 * @param {string} token Le token de l'utilisateur connecté
 * @param {int} userId L'id de l'utilisateur connecté
 * @param {function} callBackOk Le callback à utiliser quand on aura récupérer la liste des utilisateurs (la liste des utilisateurs sera transmise en paramètre)
 * @param {function} callBackError Le callback à utiliser quand la récupération de la liste des utilisateurs n'est pas possibles (L'erreur sera transmise en paramètre)
 */
export const getConnectedUserLocation = function(token, userId, callBackOk, callBackError) {
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

    let urlTargetLocations = `${url}/TargetLocations/${userId}`;

    fetch(urlTargetLocations, options)
        .then(response => {
            if (response.ok === true) {
                return response.json().catch(error => {
                    throw Error("Erreur de l'API.");
                });
            } else {
                throw Error(response.statusText);
            }
        })
        .then(dataLocations => {
            callBackOk(dataLocations);
        })
        .catch(error => {
            callBackError(error.message);
        });
}



/**
 * Fonction permettant de créer une conversation
 * 
 * @param {string} token le token de l'utilisateur connecté
 * @param {function} callBackOk 
 * @param {function} callBackError 
 */
export const postConversation= function(token, callBackOk, callBackError) {

    // Le header contiendra le token d'authentification plus tard
    var myHeaders = new Headers({
        'Content-Type':'application/json',
        'Authorization':'Bearer '+ token
    });

    // l'objet pour créer une conversation par défaut (plus tard on aura peut être d'autres types de conversations)
    var jsonPersonalityString = JSON.stringify({"type": 0});

    //les paramètres de la requête
    var options = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: jsonPersonalityString
    };

    let urlConversation = `${url}/Conversations`;

    fetch(urlConversation, options)
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
        .then(dataConversation => {
            callBackOk(dataConversation);
        })
        .catch(error => {
            callBackError(error.message);
        });
}


/**
 * Fonction permettant d'ajouter des participants à une conversation'
 * @param {*} token 
 * @param {*} conversationId 
 * @param {*} participantsId 
 * @param {*} callBackOk 
 * @param {*} callBackError 
 */
export const postParticipantsConversation= function(token, conversationId, participantsId, callBackOk, callBackError) {

    // Le header contiendra le token d'authentification plus tard
    var myHeaders = new Headers({
        'Content-Type':'application/json',
        'Authorization':'Bearer '+ token
    });

    var objectParticipants = participantsId.map(participantId => {
        return { 
            userId:           participantId,
            conversationId:   conversationId
        }
    });

    // l'objet pour créer une conversation par défaut (plus tard on aura peut être d'autres types de conversations)
    var jsonParticipants = JSON.stringify(objectParticipants);

    //les paramètres de la requête
    var options = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: jsonParticipants
    };

    let urlParticipant = `${url}/participants`;

    fetch(urlParticipant, options)
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
        .then( dataParticipants => {
            callBackOk(dataParticipants);
        })
        .catch(error => {
            callBackError(error.message);
        });
}








export const postMatchValidation= function(token, userId, targetUserId, matchId, statusValidation, callBackOk, callBackError) {

    // Le header contiendra le token d'authentification plus tard
    var myHeaders = new Headers({
        'Content-Type':'application/json',
        'Authorization':'Bearer '+ token
    });

    // l'objet pour créer une conversation par défaut (plus tard on aura peut être d'autres types de conversations)
    var jsonMatchValidationString = JSON.stringify({
        "matchId": matchId,
        "userId": userId,
        "targetUserId": targetUserId,
        "statusUser": statusValidation
    });

    //les paramètres de la requête
    var options = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: jsonMatchValidationString
    };

    let urlMatchValidation = `${url}/Matches`;

    console.log(urlMatchValidation, jsonMatchValidationString);

    fetch(urlMatchValidation, options)
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
        .then(dataMatch => {
            callBackOk(dataMatch);
        })
        .catch(error => {
            callBackError(error.message);
        });
}







/**
 * Méthode destinée à récupérer la liste des collocataires validés
 * 
 * @param {string} token Le token de l'utilisateur connecté
 * @param {int} userId L'id de l'utilisateur connecté
 * @param {object} filter Un objet représentant le filtre à utiliser
 * @param {function} callBackOk Le callback à utiliser quand on aura récupérer la liste des utilisateurs (la liste des utilisateurs sera transmise en paramètre)
 * @param {function} callBackError Le callback à utiliser quand la récupération de la liste des utilisateurs n'est pas possibles (L'erreur sera transmise en paramètre)
 */
export const getLocatairesValides = function(token, userId, filter, callBackOk, callBackError) {
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

    let urlLocatairesValides = urlWithParams(`${url}/Matches/${userId}/GetValidateMatches`, filter)

    console.log(urlLocatairesValides);

    fetch(urlLocatairesValides, options)
        .then(response => {
            if (response.ok === true) {
                return response.json().catch(error => {
                    throw Error("Erreur de l'API.");
                });
            } else {
                throw Error(response.statusText);
            }
        })
        .then(dataPotentialRoomers => {
            callBackOk(dataPotentialRoomers);
        })
        .catch(error => {
            callBackError(error.message);
        });
}







/**
 *  * Fonction permettant de rechercher une localisation
 * @param {*} token  Token de l'utilisateur
 * @param {*} city Le nom de la ville recherchée
 * @param {*} codePostal le code postal de la ville recherchée
 * @param {*} callBackOk Le callback en cas de réussite
 * @param {*} callBackError Le callback en cas d'erreur
 */
export const searchLocalisation = function(token, city, codePostal, callBackOk, callBackError) {
    // Le header contiendra le token d'authentification plus tard
    var myHeaders = new Headers({
        'Content-Type':'application/json',
        'Authorization':'Bearer '+token
    });

    // Création de notre bjet de recherche
    var jsonSearchString = JSON.stringify({
        "PostalCodeId": codePostal,
        "Libelle" :     city
    });

    //les paramètres de la requête
    var options = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: jsonSearchString
    };

    let urlSearch = `${url}/SearchLocations`;
    
    fetch(urlSearch, options)
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
        .then(dataSearch => {
            callBackOk(dataSearch);
        })
        .catch(error => {
            callBackError(error.message);
        });
}






/**
 *  * Fonction permettant d'ajouter une target location à un utilisateur
 * @param {*} token  Token de l'utilisateur
 * @param {*} city Le nom de la ville recherchée
 * @param {*} codePostal le code postal de la ville recherchée
 * @param {*} callBackOk Le callback en cas de réussite
 * @param {*} callBackError Le callback en cas d'erreur
 */
export const addConnectedUserTargetLocation = function(token, userId, localisationData, callBackOk, callBackError) {

    // Le header contiendra le token d'authentification plus tard
    var myHeaders = new Headers({
        'Content-Type':'application/json',
        'Authorization':'Bearer '+token
    });

    // Création de notre bjet de recherche
    let jsonAddString = JSON.stringify([{
        "postalCode": localisationData.postalCodeId,
        "city": localisationData.libelle,
        "city2": localisationData.libelle2
    }]);

    //les paramètres de la requête
    var options = {
        method: 'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: jsonAddString
    };

    let urlAdd = `${url}/TargetLocations/${userId}`;

    fetch(urlAdd, options)
        .then(response => {
            if (response.ok === true) {
                console.log(response);
                return response.json().catch(error => {
                    throw Error("Erreur de l'API.");
                });
            } else {
                throw Error(response.statusText);
            }
        })
        .then(dataLocalisation => {
            callBackOk(dataLocalisation[0]);
        })
        .catch(error => {
            callBackError(error.message);
        });
}






/**
 * Fonction destinée à l'a suppression d'une target location d'un utilisateur
 * 
 * @param {string} token Le token de l'utilisateur dont on va supprimer une targetLocation
 * @param {object} targetLocation La target location que l'on souhaite supprimé
 * @param {function} callBackOk Le callback à utiliser lorsque la suppression est réalisée
 * @param {function} callBackError Le callback à utiliser lorsque la suppression a rencontré une erreur
 */
export const deleteConnectedUserTargetLocation = function(token, targetLocation, callBackOk, callBackError) {

    console.log (token, targetLocation, callBackOk, callBackError);

    // Le header contiendra le token d'authentification plus tard
   var myHeaders = new Headers({
       'Authorization':'Bearer '+ token
   });
   

   var jsonDelete = JSON.stringify(targetLocation);

   //les paramêtres de la requête
   var options = {
       method: 'DELETE',
       headers: myHeaders,
       mode: 'cors',
       cache: 'default',
       body: jsonDelete
   };


   let targetDelete = `${url}/TargetLocations/${targetLocation.targetLocationId}`;
    

   //réalisation de la requête
   fetch(targetDelete, options)
       .then(response => {
           if (response.ok  === true) {
               callBackOk();
           } else {
               throw Error(response.statusText);
           }
       })
       .catch(error => {
           callBackError(error.message);
       });
}





export const handleGetAppartementsPotentiels = function(token, userId, callBackOk, callBackError) {
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

    let urlAppartementsPotentiels = `${url}/Building/${userId}`;

    console.log(urlAppartementsPotentiels);

    fetch(urlAppartementsPotentiels, options)
        .then(response => {
            if (response.ok === true) {
                return response.json().catch(error => {
                    throw Error("Erreur de l'API.");
                });
            } else {
                throw Error(response.statusText);
            }
        })
        .then(dataPotentialRoomers => {
            callBackOk(dataPotentialRoomers);
        })
        .catch(error => {
            callBackError(error.message);
        });
}





export const getLogementMedia = function(token, pictureId, callBackOk, callBackError) {
    // Le header contiendra le token d'authentification plus tard
   var myHeaders = new Headers({
       'Authorization':'Bearer '+ token
   });

   //les paramêtres de la requête
   var options = {
       method: 'GET',
       headers: myHeaders,
       mode: 'cors',
       cache: 'default',
   };

   let urlLogementMedia = `${url}/BuildingPictures/${pictureId}`;

   //réalisation de la requête
   fetch(urlLogementMedia, options)
        .then(response => {
            if (response.ok === true) {
                return response.blob();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(blob => {
            var reader = new FileReader();

            reader.addEventListener("load", function () {
                callBackOk(pictureId, reader.result)
            }, false);

            reader.readAsDataURL(blob);
            //reader.readAsText(blob);
        })
        .catch(error => {
            console.log("Image inexistante");
            callBackError(pictureId, error.message);
        });
}





/**
 * Fonction permettant de récupérer la liste des messages d'un logement
 * @param {string} token 
 * @param {int} buildingId 
 * @param {object} filter 
 * @param {function} callBackOk 
 * @param {function} callBackError 
 */
export const getMessagesLogement = function(token, buildingId, filter, callBackOk, callBackError) {
    // Le header contiendra le token d'authentification plus tard
    let myHeaders = new Headers({
        'Content-Type':     'application/json',
        'Authorization':    'Bearer '+token
    });

    //les paramètres de la requête
    let options = {
        method:     'GET',
        headers:    myHeaders,
        mode:       'cors',
        cache:      'default'
    };

    let getMessagesLogementURL = urlWithParams(`${url}/BuildingMessages/${buildingId}`,filter);


    fetch(getMessagesLogementURL, options)
        .then(response => {
            if (response.ok === true) {
                return response.json().catch(error => {
                    throw Error("Erreur de l'API.");
                });
            } else {
                throw Error(response.statusText);
            }
        })
        .then(dataMessages => {
            callBackOk(dataMessages);
        })
        .catch(error => {
            callBackError(error.message);
        });
    
}




/**
 * Fonction permettant d'ajouter un nouveau message dans une conversation
 * @param {string} token 
 * @param {int} userId 
 * @param {int} buildingId 
 * @param {string} message 
 * @param {function} callBackOk 
 * @param {function} callBackError 
 */
export const postMessageLogement = function(token, userId, buildingId, message,  callBackOk, callBackError) {

    // Le header contiendra le token d'authentification plus tard
    var myHeaders = new Headers({
        'Content-Type':     'application/json',
        'Authorization':    'Bearer '+token
    });

    // Conversion de notre FormData en objet 
    var jsonMessageString = JSON.stringify({
        "messageText": message,
        "userId": userId,
        "buildingId": buildingId,
        "isReport": 0
    });

    //les paramètres de la requête
    var options = {
        method:     'POST',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
        body: jsonMessageString
    };

    fetch(url+ "/BuildingMessages", options)
        .then(response => {
            if (response.ok === true) {
                return response.json().catch(error => {
                    throw Error("Erreur de l'API.");
                });
            } else {
                throw Error(response.statusText);
            }
        })
        .then(message => {
            callBackOk(message);
        })
        .catch(error => {
            callBackError(error.message);
        });
}
