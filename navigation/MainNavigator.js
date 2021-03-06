import React from 'react';
import { connect } from 'react-redux';
import LoginNavigator from './LoginNavigator';
import RoomerApplicationNavigator from './RoomerApplicationNavigator';
import OwnerApplicationNavigator from './OwnerApplicationNavigator';
import { handleConnectWithPreviousToken } from '../actions/connection';
import { TOKEN_NAME, USER_ID } from '../actions/connection';
import { empty } from '../utils/check';
import LoginWaiting from '../screens/LoginWaiting';

class MainNavigator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingPromiseToken: true
        }
    }
    /**
     * Lorsque que l'on aura monté le composant, on va vérifier qu'il n'y a pas un token d'une connexion précédente.
     * Si c'est le cas, on tentera de se connecter avec
     */
    componentDidMount() {
        Promise.all([
            Expo.SecureStore.getItemAsync(TOKEN_NAME),
            Expo.SecureStore.getItemAsync(USER_ID)
        ]).then((values) => {
            this.setState({
                loadingPromiseToken: false
            });
            let tokenValue =    values[0];
            let userId =        values[1];

            if ((!empty(tokenValue)) && (!empty(userId))) {
                this.props.handleConnectWithPreviousToken(tokenValue, userId);
            }
        });

    }

    /**
     * Trois rendu possible : 
     *   - L'écran de connexion en cours (LoginToken)
     *   - Le navigator de Login (LoginNavigator)
     *   - Le navigator principal de la navigation (ApplicationNavigator)
     */
    render() {
        return (
            this.props.isAuthenticated 
                ? this.props.user.isOwner 
                    ?   <OwnerApplicationNavigator/>
                    :   <RoomerApplicationNavigator/>
                :   (this.state.loadingPromiseToken || this.props.loadingSignInToken)
                    ?   <LoginWaiting />
                    :   <LoginNavigator /> 
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated:    state.connection.isAuthenticated,
    user:               state.connection.user,
    loadingSignInToken: state.connection.loadingSignInToken,
});

const mapDispatchToProps = dispatch => ({
    handleConnectWithPreviousToken: (token, userId) => dispatch(handleConnectWithPreviousToken(token, userId)),
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainNavigator);