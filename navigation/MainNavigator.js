import React from 'react';
import { connect } from 'react-redux';
import LoginNavigator from './LoginNavigator';
import ApplicationNavigator from './ApplicationNavigator';
import { handleConnectWithPreviousToken } from '../actions/connection';
import LoginToken from '../screens/LoginToken'
import { TOKEN_NAME } from '../actions/connection';

class MainNavigator extends React.Component {

    /**
     * Lorsque que l'on aura monté le composant, on va vérifier qu'il n'y a pas un token d'une connexion précédente.
     * Si c'est le cas, on tentera de se connecter avec
     */
    componentDidMount() {
        let handleConnectWithPreviousToken = this.props.handleConnectWithPreviousToken;

        Expo.SecureStore.getItemAsync(TOKEN_NAME)
            .then((tokenValue) => handleConnectWithPreviousToken(tokenValue))
        ;
    }

    /**
     * Trois rendu possible : 
     *   - L'écran de connexion en cours (LoginToken)
     *   - Le navigator de Login (LoginNavigator)
     *   - Le navigator principal de la navigation (ApplicationNavigator)
     */
    render() {
        return this.props.loadingSignInToken 
          ? <LoginToken />
          : !this.props.isAuthenticated 
            ? <LoginNavigator /> 
            : <ApplicationNavigator />
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.connection.isAuthenticated, 
    loadingSignInToken: state.connection.loadingSignInToken,
});

const mapDispatchToProps = dispatch => ({
    handleConnectWithPreviousToken: (token) => dispatch(handleConnectWithPreviousToken(token)),
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainNavigator);