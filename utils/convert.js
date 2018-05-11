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


