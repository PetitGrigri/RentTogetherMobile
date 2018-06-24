/**
 * Fonction permettant de convertir les données d'un FormData en objet (clé / valeur)
 * @param {object} formData L'objet form data correspondant à un formulaire
 * @returns {object} l'objet correspondant au formData
 */
export const formDataToObject= (formData) =>  {
    // Création du json de la requête transmise
    var object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    return object;
}

/**
 * Fonction permettant de convertir un objet clé/valeur en paramètres get d'une url
 * @param {object} objet Un objet de paramètres à convertir
 */
export const objectToUrlParam = (objet) => {
    return  ""+Object.keys(objet).map((keyName) => keyName+"="+encodeURIComponent(objet[keyName])).join('&');
}

/**
 * Cette méthode permet de concatener à une url les paramètres fournis sous forme d'un objet 
 * @param {string} url l'url
 * @param {object} objectParamas l'objet paramètres
 * @returns {string} l'url avec les paramètres
 */
export const urlWithParams = (url, objectParamas) => {
    //création de la string de paramètre
    var stringParams = objectToUrlParam(objectParamas);
    //retour de l'url avec les paramètrs (quand il y en a)
    return (stringParams.length > 0) ? url + "?" + stringParams : url;
}

export const convertStringToDateFR = (dateString) => {
    const optionsDateTimeFormat = {
        year: "numeric", 
        month: "numeric", 
        day: "numeric",
        hour: "numeric", 
        minute: "numeric", 
        //second: "numeric",
        hour12: false
    };

    //parsing de la date 
    let date = Date.parse(dateString);

    //retour de la date formatée
    return Intl.DateTimeFormat('fr-FR', optionsDateTimeFormat).format(date);
}