import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from '../screens/Login';
import Register from '../screens/Register';

const LoginNavigator = createStackNavigator({
    login: {
        screen: Login,
    },
    register: {
        screen: Register,
    }
});

export default LoginNavigator;