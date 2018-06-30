import React from 'react';
import { connect } from 'react-redux';
import LoginNavigator from './LoginNavigator';
import ApplicationNavigator from './ApplicationNavigator';
import { handleConnectWithPreviousToken } from '../actions/connection';
import { TOKEN_NAME, USER_ID } from '../actions/connection';
import { empty } from '../utils/check';

class MainNavigator extends React.Component {

    /**
     * Lorsque que l'on aura monté le composant, on va vérifier qu'il n'y a pas un token d'une connexion précédente.
     * Si c'est le cas, on tentera de se connecter avec
     */
    componentDidMount() {

        Promise.all([
            Expo.SecureStore.getItemAsync(TOKEN_NAME),
            Expo.SecureStore.getItemAsync(USER_ID)
        ]).then((values) => {
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
        return this.props.isAuthenticated 
            ? <ApplicationNavigator />
            : <LoginNavigator /> 
    }
}

const mapStateToProps = state => ({
    isAuthenticated:    state.connection.isAuthenticated, 
    loadingSignInToken: state.connection.loadingSignInToken,
});

const mapDispatchToProps = dispatch => ({
    handleConnectWithPreviousToken: (token, userId) => dispatch(handleConnectWithPreviousToken(token, userId)),
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainNavigator);