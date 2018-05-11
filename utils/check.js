/**
 * Fonction permettant de savoir si la variable passée en paramètre existe
 * @param {*} item 
 */
export const isset = (variable) =>  (!(typeof variable === 'undefined'));

/**
 * Fonction mermettant de savoir si la variable passée en paramètre est vide
 * @param {*} item 
 */
export const empty = (variable) =>  {
    switch (typeof variable) {

        //cas d'un objet qui n'est pas définis
        case 'undefined':
            return true;

        //cas d'un objet quelconque (array, object...) 
        case 'object':
            //on recherche une valeur non vide dans toute les valeurs du tableau
            for (var value of Object.values(variable)) {
                if (!empty(value)) {
                    return false;
                }
            }
            //on n'a trouvé aucune variable vide on retourne true
            return true;
        
        //cas plus classiques (string, int, etc);
        default:
            return variable.length<=0;
    }

}
