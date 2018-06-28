import { 
    USER_GET_USER_IMAGE_REQUEST,
    USER_GET_USER_IMAGE_SUCCESS, 
    USER_GET_USER_IMAGE_ERROR,

    USER_POST_USER_IMAGE_REQUEST,
    USER_POST_USER_IMAGE_SUCCESS, 
    USER_POST_USER_IMAGE_ERROR

} from '../actions/media'


//le state initial
const initialMediaState = {
    usersMediaLoading:      [],
    usersMediaError: [],
    usersMedia: {},
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
                userMediaUpaloadLoading:    true,
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






        //autres 
        default : 
            return state;
    }
}

export default media;