import { 
    USER_GET_USER_IMAGE_REQUEST,
    USER_GET_USER_IMAGE_SUCCESS, 
    USER_GET_USER_IMAGE_ERROR,

    USER_POST_USER_IMAGE_REQUEST,
    USER_POST_USER_IMAGE_SUCCESS, 
    USER_POST_USER_IMAGE_ERROR,

    BUILDING_GET_IMAGE_REQUEST,
    BUILDING_GET_IMAGE_SUCCESS, 
    BUILDING_GET_IMAGE_ERROR
} from '../actions/media'


//le state initial
const initialMediaState = {
    usersMediaLoading:  [],
    usersMediaError:    [],
    usersMedia:         {},

    locationsMediaLoading:  [],
    locationsMediaError:    [],
    locationsMedia:         {},

    userMediaUpaloadLoading: false
}


const media = (state = initialMediaState, action) => {

    switch(action.type) {
        case USER_GET_USER_IMAGE_REQUEST :
            return Object.assign({}, state, {
                usersMediaLoading : state.usersMediaLoading.concat(action.userId)
            });

        case USER_GET_USER_IMAGE_SUCCESS : 
            return Object.assign({}, state, {
                usersMediaLoading   : state.usersMediaLoading.filter(value => (value !== action.userId)),
                usersMedia          : Object.assign({}, state.usersMedia, { [action.userId] : action.image })
            });


        case USER_GET_USER_IMAGE_ERROR :
            return Object.assign({}, state, {
                usersMediaLoading   : state.usersMediaLoading.filter(value => (value !== action.userId)),
                usersMediaError     : state.usersMediaError.concat(action.userId)
            });





        case USER_POST_USER_IMAGE_REQUEST : 
            return Object.assign({}, state, {
                MediaUpaloadLoading:    true,
            });

        case USER_POST_USER_IMAGE_SUCCESS : 

            return Object.assign({}, state, {
                userMediaUpaloadLoading:    false,
                usersMedia          : Object.assign({}, state.usersMedia, { [action.userId] : action.image })

            });

        case USER_POST_USER_IMAGE_ERROR : 
            return Object.assign({}, state, {
                userMediaUpaloadLoading:    false,
                error:                      action.error
                
            });






        case BUILDING_GET_IMAGE_REQUEST :
            return Object.assign({}, state, {
                locationsMediaLoading : state.locationsMediaLoading.concat(action.pictureId)
            });

        case BUILDING_GET_IMAGE_SUCCESS : 
            return Object.assign({}, state, {
                locationsMediaLoading:  state.locationsMediaLoading.filter(value => (value !== action.pictureId)),
                locationsMedia:         Object.assign({}, state.locationsMedia, { [action.pictureId] : action.image })
            });


        case BUILDING_GET_IMAGE_ERROR :
            return Object.assign({}, state, {
                locationsMediaLoading: state.locationsMediaLoading.filter(value => (value !== action.pictureId)),
                locationsMediaError:   state.locationsMediaError.concat(action.pictureId)
            });


        //autres 
        default : 
            return state;
    }
}

export default media;