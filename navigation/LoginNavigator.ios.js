import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from '../screens/Login';
import Register from '../screens/Register';

const LoginNavigator = createStackNavigator({
    login: {
        screen: Login,
        navigationOptions: {
            header: null,
            title: 'Connexion',
        }
    },
    register: {
        screen: Register,
        
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'rgba(255,255,255,0.5)',
            },
            title: 'Inscription',
            headerTransparent: true
        }
    }
});

export default LoginNavigator;