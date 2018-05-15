import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Test from '../screens/Test';

const ApplicationNavigator = createStackNavigator({
    home: createBottomTabNavigator({
        Profile: {
            screen: Test,
            navigationOptions: {
                tabBarLabel: 'Profile',
                header: null
            },
        },
        Home: {
            screen: Test,
            navigationOptions: {
                tabBarLabel: 'Home',
                header: null
            }
        },
        Matches: {
            screen: Test,
            navigationOptions: {
                tabBarLabel: 'Matches',
                header: null
            },
        },
    }, {

    }, {
        //TODO
    })
});

export default ApplicationNavigator;