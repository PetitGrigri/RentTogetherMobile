/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from '../screens/Login';
import Register from '../screens/Register';

const LoginNavigator = createStackNavigator({
    login: {
        screen: Login,
        navigationOptions: {
            header: null,
        }
    },
    register: {
        screen: Register,
        navigationOptions: {
            header: null,
        }
    }
});

export default LoginNavigator;