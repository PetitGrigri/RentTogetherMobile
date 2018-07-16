/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import RoomerTabNavigator from './RoomerTabNavigator';
import Messages from '../screens/Messages';
import UpdateParam from '../screens/UpdateParam';
import UpdateDescription from '../screens/UpdateDescription';
import UpdateLocalisation from '../screens/UpdateLocalisation';
import RoomerProfile from '../screens/RoomerProfile';
import MessagesLogement from '../screens/MessagesLogement';
import LocationDetails from '../screens/LocationDetails';

export default RoomerApplicationNavigator = createStackNavigator({
    home: {
        screen: RoomerTabNavigator,
        navigationOptions: {
            headerStyle: {
                height: 0,
                backgroundColor: 'rgba(255,255,255,0.5)'
            },
            headerTransparent: true
        }
    },
    messages: {
        screen: Messages, 
        navigationOptions: {
            headerStyle: {
                backgroundColor:    '#ff8f00',       
            },
            headerTintColor:        '#fff'
        }
    },
    updateParam: { 
        screen: UpdateParam, 
        navigationOptions: {
            title:  'Mes informations',
            headerStyle: {
                backgroundColor:    '#ff8f00',       
            },
            headerTintColor:        '#fff'
        }
    },
    updateDescription: { 
        screen: UpdateDescription, 
        navigationOptions: {
            title:  'Ma description',
            headerStyle: {
                backgroundColor:    '#ff8f00',       
            },
            headerTintColor:        '#fff'
        }
    },
    updateLocalisation: { 
        screen: UpdateLocalisation, 
        navigationOptions: {
            title:  'Mes recherches',
            headerStyle: {
                backgroundColor:    '#ff8f00',       
            },
            headerTintColor:        '#fff'
        }
    },
    roomerProfile: {
        screen: RoomerProfile, 
        navigationOptions: {
            headerStyle: {
                backgroundColor:    '#ff8f00',       
            },
            headerTintColor:        '#fff'
        }
    },
    locationDetails: {
        screen: LocationDetails, 
        navigationOptions: {
            headerStyle: {
                backgroundColor:    '#ff8f00',       
            },
            headerTintColor:        '#fff'
        }
    },
    messagesLogements: {
        screen: MessagesLogement, 
        navigationOptions: {
            headerStyle: {
                backgroundColor:    '#ff8f00',       
            },
            headerTintColor:        '#fff'
        }
    },
    
});