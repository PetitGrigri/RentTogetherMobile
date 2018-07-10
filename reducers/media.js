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
    usersMediaLoading:      [],
    usersMediaError: [],
    usersMedia: {},

    locationsMediaLoading:  [],
    locationsMediaError:    [],
    locationsMedia:         {},

    userMediaUpaloadLoading: false
}


const media = (state = initialMediaState, action) => {

    switch(action.type) {
        case USER_GET_USER_IMAGE_REQUEST :

            let newUsersMediaLoading = state.usersMediaLoading.slice(0);
            newUsersMediaLoading.push(action.userId)

            return Object.assign({}, state, {
                usersMediaLoading : newUsersMediaLoading
            });

        case USER_GET_USER_IMAGE_SUCCESS : 
            return Object.assign({}, state, {
                usersMediaLoading   : state.usersMediaLoading.filter(value => (value !== action.userId)),
                usersMedia          : Object.assign({}, state.usersMedia, { [action.userId] : action.image })
            });


        case USER_GET_USER_IMAGE_ERROR :

             let newUsersMediaError = state.usersMediaError.slice(0);
            newUsersMediaError.push(action.userId)

            return Object.assign({}, state, {
                usersMediaLoading   : state.usersMediaLoading.filter(value => (value !== action.userId)),
                usersMediaError     : newUsersMediaError
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

            let newlocationsMediaLoading = state.locationsMediaLoading.slice(0);
            newlocationsMediaLoading.push(action.pictureId)

            return Object.assign({}, state, {
                locationsMediaLoading : newlocationsMediaLoading
            });

        case BUILDING_GET_IMAGE_SUCCESS : 
            return Object.assign({}, state, {
                locationsMediaLoading:  state.locationsMediaLoading.filter(value => (value !== action.pictureId)),
                locationsMedia:         Object.assign({}, state.usersMedia, { [action.pictureId] : action.image })
            });


        case BUILDING_GET_IMAGE_ERROR :

            let newLocationsMediaError = state.locationsMediaError.slice(0);
            newLocationsMediaError.push(action.pictureId)

            return Object.assign({}, state, {
                locationsMediaLoading: state.newlocationsMediaLoading.filter(value => (value !== action.pictureId)),
                locationsMediaError:   newLocationsMediaError
            });


        //autres 
        default : 
            return state;
    }
}

export default media;