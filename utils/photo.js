import { Alert } from 'react-native';

/**
 * Fonction permettant à l'utilisateur de sélectionner une photo
 */
export const takeAPhoto = async () => {
    // Demande de la permission camera
    let cameraPermission = await Expo.Permissions.getAsync(Expo.Permissions.CAMERA)
    if (cameraPermission.status !== 'granted') {
        await Expo.Permissions.askAsync(Expo.Permissions.CAMERA)
    }

    // Demande de la permission camera (semble nécessaire pour iOS)
    let cameraRollPermission= await Expo.Permissions.getAsync(Expo.Permissions.CAMERA_ROLL)
    if (cameraRollPermission.status  !== 'granted') {
        await Expo.Permissions.askAsync(Expo.Permissions.CAMERA_ROLL)
    }
    
    console.log(cameraPermission, cameraRollPermission, (cameraPermission.status  !== "granted") || (cameraRollPermission.status  !== "granted"));

    // Si on n'a pas de permission, on arrête là
    if ((cameraPermission.status  !== "granted") || (cameraRollPermission.status  !== "granted")) {
            // Message d'erreur en cas de refus
            Alert.alert(
                'Erreur',
                "Autorisation refusée",
                [
                    {text: 'OK'},
                ],
                { cancelable: true }
            )
        return;
    }

    console.log('takeAPhoto');

    // Si on a les permissions, on peu continuer à prendre une photo 
    let result = await Expo.ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
    });

    console.log('takeAPhoto 2 ', result);

    // Si l'utilisateur a annulé, on quitte
    if (result.cancelled === true) {
        return;
    }

    console.log('takeAPhoto 3');

    // Redimentionnement et modification du type de la photo
    let resultResized = await Expo.ImageManipulator.manipulate( result.uri, [{ resize: { width: 1000 }}], { format: 'jpg', compress: 0.8} );

    console.log('takeAPhoto 4', resultResized);

    // Retour de la photo 
    return resultResized.uri
}