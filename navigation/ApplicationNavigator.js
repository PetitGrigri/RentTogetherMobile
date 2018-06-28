import React from 'react';
import { createStackNavigator } from 'react-navigation';
import TabNavigator from './TabNavigator';
import Messages from '../screens/Messages';
import UpdateParam from '../screens/UpdateParam';

const ApplicationNavigator = createStackNavigator({
    home: {
        screen: TabNavigator,
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
    }
});

export default ApplicationNavigator;