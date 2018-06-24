import { 
    USER_GET_MEDIA, 
    USER_GET_MEDIA_ERROR,
    USER_GET_MEDIA_SUCCESS, 
    USER_GET_MEDIA_HIDE_ERROR,
} from '../actions/media'


//le state initial
const initialMediaState = {
    loadingGet: false,
    messageError: "",
    image: null
}

const media = (state = initialMediaState, action) => {

    switch(action.type) {
        // Gestion d'une demande d'ajout d'un utilisateur
        case USER_GET_MEDIA: 
            return Object.assign({}, state, {
                loadingGet : true
            });

        // Gestion de la réussite de l'ajout d'un administrateur
        case  USER_GET_MEDIA_SUCCESS: 
            return Object.assign({}, state, {
                loadingGet :    false,
                image:          action.image
            });

        // Gestion d'une erreur lors de l'ajout d'un administrateur
        case  USER_GET_MEDIA_ERROR : 
            return Object.assign({}, state, {
                loadingGet:     false,
                messageError:   action.message
                
            });
        


        case USER_GET_MEDIA_HIDE_ERROR : 
            return Object.assign({}, state, {
                messageError:   "",
            })

        //autres 
        default : 
            return state;
    }
}

export default media;