import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import LoginNavigator from './LoginNavigator';
import ApplicationNavigator from './ApplicationNavigator';

class MainNavigator extends React.Component {
    render() {
        return !this.props.isAuthenticated ? <LoginNavigator /> : <ApplicationNavigator />
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.connection.isAuthenticated, 
});
  
export default connect(
    mapStateToProps
)(MainNavigator);