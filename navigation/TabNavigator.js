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
    },
    Matches: {
        screen: Matches,
        navigationOptions: {
            tabBarLabel: 'Matches',
          },
    },
    Messages: {
        screen: Messages,
        navigationOptions: {
            tabBarLabel: 'Messages',
          },
    },
},{
    tabBarOptions: {

    }
})

export default TabNavigator;