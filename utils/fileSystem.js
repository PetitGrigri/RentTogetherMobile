

const folderUserMedia = `${Expo.FileSystem.documentDirectory}users-media`;


/**
 * @param {id} userId 
 * @param {blob} image 
 */
export const saveUserMedia = async (userId, image) =>  {
    //création du dossier des images des utilisateurs s'il n'existe pas
    let etatDossier = await createUserMediaFolderIfNotExist();
    console.log (`Etat du dossier user-media : ${etatDossier?'OK':'KO'}`);

    // Création de l'URI de l'image
    let imageURI = `${folderUserMedia}/user_${userId}.png`;

    //suppression de l'image précédente de l'utilisateur si elle existe
    await deleteUserMediaIfExist(imageURI);

    //écriture du contenu de l'image
    await Expo.FileSystem.writeAsStringAsync(imageURI, image);

    return imageURI
};


/**
 * Fonction permettant la crétion du dossier de média quand ce dernier n'existe pas
 */
const createUserMediaFolderIfNotExist = async () => {
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
const deleteUserMediaIfExist = async (imageURI) => {
    // Récupération des informations sur l'existence potentielle d'une image préalablement enregistré
    let imageURIInfo = await Expo.FileSystem.getInfoAsync(imageURI);

    // Suppression de l'image précédente (s)
    if (imageURIInfo.exists) {
        await Expo.FileSystem.deleteAsync(imageURI);
    }
}


/**
 * Fonction permettant de récupérer l'image d'un utilisateur
 */
export const getUserMedia = (fileUri, callback) => {
    Expo.FileSystem.readAsStringAsync(fileUri).then(content => {
        callback(content);
    })
}