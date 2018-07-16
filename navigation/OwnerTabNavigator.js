/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */
import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import Profile from '../screens/Profile';
import Conversations from '../screens/Conversations';
import OwnerProperties from '../screens/OwnerProperties';
import AddProperty from '../screens/AddProperty';
import { Easing, Animated, Platform } from 'react-native';
import UpdateProperty from '../screens/UpdateProperty';

// transitionConfig Tuto :  https://medium.com/async-la/custom-transitions-in-react-navigation-2f759408a053 (lignes 17 à 63)
const transitionConfig = (Platform.OS === 'android') ? () => {
    return {
      transitionSpec: {
        duration: 200,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: sceneProps => {
          const { position, layout, scene, index, scenes } = sceneProps
          const toIndex = index
          const thisSceneIndex = scene.index
          const height = layout.initHeight
          const width = layout.initWidth

          const translateX = position.interpolate({
            inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
            outputRange: [width, 0, 0]
          })
    
          // Since we want the card to take the same amount of time
          // to animate downwards no matter if it's 3rd on the stack
          // or 53rd, we interpolate over the entire range from 0 - thisSceneIndex
          const translateY = position.interpolate({
            inputRange: [0, thisSceneIndex],
            outputRange: [height, 0]
          })
    
          const slideFromRight = { transform: [{ translateX }] }
          const slideFromBottom = { transform: [{ translateY }] }
    
          const lastSceneIndex = scenes[scenes.length - 1].index
    
          // Test whether we're skipping back more than one screen
          if (lastSceneIndex - toIndex > 1) {
            // Do not transoform the screen being navigated to
            if (scene.index === toIndex) return
            // Hide all screens in between
            if (scene.index !== lastSceneIndex) return { opacity: 0 }
            // Slide top screen down
            return slideFromBottom
          }
    
          return slideFromRight
        },
    }} : null;


export default RoomerTabNavigator = createBottomTabNavigator({
    
    OwnerProperties: {
        screen: createStackNavigator({
            properties: {
                screen: OwnerProperties,
                navigationOptions: {
                    title:  'Mes locations',
                    headerStyle: {
                        backgroundColor:    '#ff8f00',       
                    },
                    headerTintColor:        '#fff'
                }
            },
            addProperty: {
                screen: AddProperty,
                navigationOptions: {
                    title: 'Ajouter une location',
                    headerStyle: {
                        backgroundColor:    '#ff8f00',       
                    },
                    headerTintColor:        '#fff'
                }
            },
            updateProperty: {
                screen: UpdateProperty,
                navigationOptions: {
                    title:  'Modifier une location',
                    headerStyle: {
                        backgroundColor:    '#ff8f00',       
                    },
                    headerTintColor:        '#fff'
                }
            },
            
        }),
        navigationOptions: {
            tabBarLabel: 'Mes locations',
            tabBarIcon: ({focused}) => (
                <Ionicons color={focused?'#ff8f00':'#ccc'} name={focused ? 'ios-home' : 'ios-home-outline'} size={32}/>
            ),
            headerStyle: {
                backgroundColor: 'rgba(255,255,255,0.5)',
            },
            headerTransparent: true
        }
    },
    Conversations: {
        screen: Conversations,
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
    }
},{
    tabBarOptions: {
        activeTintColor:    '#ff8f00',
        inactiveTintColor:  '#ccc',
    }
})
