import React from 'react';
import { createStackNavigator } from 'react-navigation';
import TabNavigator from './TabNavigator';
import Chat from '../screens/Chat';

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
    chat: {
        screen: Chat, 
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'rgba(255,255,255,0.5)',
            },
            headerTransparent: true
        }
    }
});

export default ApplicationNavigator;