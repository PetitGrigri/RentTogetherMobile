import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import Roomers from '../screens/Roomers';
import Locations from '../screens/Locations';
import Profile from '../screens/Profile';
import Matches from '../screens/Matches';
import Messages from '../screens/Messages';

const TabNavigator = createBottomTabNavigator({
    Roomers: {
        screen: Roomers,
        navigationOptions: {
            tabBarLabel: 'Locataires',
            tabBarIcon: ({focused}) => (
                <Ionicons color={focused?'#ff8f00':'#ccc'} name={focused ? 'ios-contacts' : 'ios-contacts-outline'} size={32}/>
            ),
        },
    },
    Locations: {
        screen: Locations,
        navigationOptions: {
            tabBarLabel: 'Locations',
            tabBarIcon: ({focused}) => (
                <Ionicons color={focused?'#ff8f00':'#ccc'} name={focused ? 'ios-home' : 'ios-home-outline'} size={32}/>
            ),
        },
    },
    Matches: {
        screen: Matches,
        navigationOptions: {
            tabBarLabel: 'Matches',
            tabBarIcon: ({focused}) => (
                <Ionicons color={focused?'#ff8f00':'#ccc'} name={focused ? 'ios-checkmark-circle' : 'ios-checkmark-circle-outline'} size={32}/>
            ),
        },
    },
    Messages: {
        screen: Messages,
        navigationOptions: {
            tabBarLabel: 'Messages',
            tabBarIcon: ({focused}) => (
                <Ionicons color={focused?'#ff8f00':'#ccc'} name={focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline'} size={32}/>
            ),
        },
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarLabel: 'Mon profil',
            tabBarIcon: ({focused}) => (
                <Ionicons color={focused?'#ff8f00':'#ccc'} name={focused ? 'ios-contact' : 'ios-contact-outline'} size={32}/>
            ),
            headerStyle: {
                backgroundColor: 'rgba(255,255,255,0.5)',
            },
            headerTransparent: true
        }
    },
},{
    tabBarOptions: {
        activeTintColor:    '#ff8f00',
        inactiveTintColor:  '#ccc',
    }
})


export default TabNavigator;