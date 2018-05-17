import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Matches from '../screens/Matches';
import Messages from '../screens/Messages';

const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: 'Accueil',
          },
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarLabel: 'Profil',
          },
        /*
        navigationOptions: {
            tabBarLabel: 'Votre profil',
            headerMode: null
        },*/
    },
    Matches: {
        screen: Matches,
        navigationOptions: {
            tabBarLabel: 'Matches',
          },
        /*
        navigationOptions: {
            tabBarLabel: 'Vos Matches',
            headerMode: null
        },*/
    },
    Messages: {
        screen: Messages,
        navigationOptions: {
            tabBarLabel: 'Messages',
          },
        /*
        navigationOptions: {
            tabBarLabel: 'Messages',
            headerMode: null
        },
        */
    },
},{
    tabBarOptions: {
        //TODO
    }
})

export default TabNavigator;