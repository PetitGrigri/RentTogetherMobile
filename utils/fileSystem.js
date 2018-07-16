

/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */

 const folderUserMedia = `${Expo.FileSystem.documentDirectory}users-media`;
const folderLocationMedia = `${Expo.FileSystem.documentDirectory}locations-media`;

/**
 * @param {id} userId 
 * @param {blob} image 
 */
export const saveUserMedia = async (userId, image) =>  {
    //création du dossier des images des utilisateurs s'il n'existe pas
    await createUserMediaFolderIfNotExist();
    
    // Création de l'URI de l'image
    let imageURI = `${folderUserMedia}/user_${userId}.png`;

    //suppression de l'image précédente de l'utilisateur si elle existe
    await deleteMediaIfExist(imageURI);

    //écriture du contenu de l'image
    await Expo.FileSystem.writeAsStringAsync(imageURI, image);

    return imageURI
};

/**
 * @param {id} userId 
 * @param {blob} image 
 */
export const saveUserUpdatedMedia = async (userId, image) =>  {
    //création du dossier des images des utilisateurs s'il n'existe pas
    await createUserMediaFolderIfNotExist();
    
    var now = Date.now();

    // Création de l'URI de l'image
    //TODO Récupérer l'ancienne image vi REDUX
    let imageURINew = `${folderUserMedia}/user_${userId}-${now}.png`;

    //suppression de l'image précédente de l'utilisateur si elle existe


    //écriture du contenu de l'image
    await Expo.FileSystem.writeAsStringAsync(imageURINew, image);

    return imageURINew
};

/**
 * Fonction permettant la crétion du dossier de média quand ce dernier n'existe pas
 */
export const createUserMediaFolderIfNotExist = async () => {
    //récupération des informations sur le dossier
    let folderInfo = await Expo.FileSystem.getInfoAsync(folderUserMedia)

    // Création du fichier quand il n'existe pas ou retour
    if (folderInfo.exists) {
        return folderInfo.exists;
    } else {
        let createdFolderInfo = await Expo.FileSystem.makeDirectoryAsync(folderUserMedia);
        return createdFolderInfo.exists;
    }
}

/**
 * Fonction permettant de supprimer l'image d'un utilisateur si elle existe déjà
 */
export const deleteMediaIfExist = async (imageURI) => {

    // Récupération des informations sur l'existence potentielle d'une image préalablement enregistré
    let imageURIInfo = await Expo.FileSystem.getInfoAsync(imageURI);

    // Suppression de l'image précédente (s)
    if (imageURIInfo.exists) {
        await Expo.FileSystem.deleteAsync(imageURI);
    }
}


/**
 * Fonction permettant de récupérer le contenu indiqué par fileUri et de le retourner au callback
 * @param {*} fileUri 
 * @param {*} callback 
 */
export const getCachedMedia = (fileUri, callback) => {
    Expo.FileSystem.readAsStringAsync(fileUri).then(content => {
        callback(content);
    }).catch(error => {
        console.log(`Erreur lors de la récupération de ${fileUri}`, error);
    });
}








/**
 * @param {id} pictureId 
 * @param {blob} image 
 */
export const saveLocationMedia = async (pictureId, image) =>  {
    //création du dossier des images des utilisateurs s'il n'existe pas
    await createLocationMediaFolderIfNotExist();
    
    // Création de l'URI de l'image
    let imageURI = `${folderLocationMedia}/location_${pictureId}.png`;

    //suppression de l'image précédente de l'utilisateur si elle existe
    await deleteMediaIfExist(imageURI);

    //écriture du contenu de l'image
    await Expo.FileSystem.writeAsStringAsync(imageURI, image);

    return imageURI
};


/**
 * Fonction permettant la crétion du dossier des médias destinée aux logements
 */
export const createLocationMediaFolderIfNotExist = async () => {
    //récupération des informations sur le dossier
    let folderInfo = await Expo.FileSystem.getInfoAsync(folderLocationMedia)

    // Création du fichier quand il n'existe pas ou retour
    if (folderInfo.exists) {
        return folderInfo.exists;
    } else {
        let createdFolderInfo = await Expo.FileSystem.makeDirectoryAsync(folderLocationMedia);
        return createdFolderInfo.exists;
    }
}
