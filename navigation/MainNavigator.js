import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import Test from '../screens/Test';
import LoginNavigator from './LoginNavigator';
import ApplicationNavigator from './ApplicationNavigator';

class MainNavigator extends React.Component {
    render() {
        console.log(this.props.isAuthenticated);
        return !this.props.isAuthenticated ? <LoginNavigator /> : <ApplicationNavigator />
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.connection.isAuthenticated, 
});
  
export default connect(
    mapStateToProps
)(MainNavigator);