/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */
import React, { Component } from 'react';
import  { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { UserImage } from '../containers';


class RoomerMatchesItem extends Component {
    static propTypes = {
        user:                       PropTypes.object.isRequired,
        handleShowProfile:          PropTypes.func.isRequired,
        handleCreateConversation:   PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            fontLoaded: true,
        }
    }

    render() {
        let { user, handleCreateConversation, handleShowProfile, loadingCreateConversation } = this.props;

        return (
            <View style={ styles.container } >
                <UserImage 
                    style={ styles.avatar }
                    userId={ user.userId }
                />
                <Text style={ styles.roomer}>{ user.firstName } { user.lastName } </Text>
                
                <View style={styles.iconesWraper} >
                    <TouchableOpacity onPress={ () => handleShowProfile(user.userId) }>
                        <Ionicons name='ios-contact' style={ styles.icon } size={28} />
                    </TouchableOpacity>
                    <View style= {styles.separator} />
                    {loadingCreateConversation 
                        ?   <ActivityIndicator size="small" color='#aaa' /> 
                        :   <TouchableOpacity onPress={ () => handleCreateConversation(user.userId) }>
                                <Ionicons name='ios-mail-outline' style={ styles.icon } size={32} />
                            </TouchableOpacity>
                    }
                    
                </View>
            </View>
        );
    }
}
  
export default RoomerMatchesItem

const styles= StyleSheet.create({
    container: {
        flex:               1,
        borderColor:        '#ccc',
        borderRadius:       2,
        borderWidth:        0,
        backgroundColor:    '#fff',
        margin:             8,
        alignItems:         'center',
        justifyContent:     'space-around',
        padding:            8,
        elevation:          3,
    }, 
    roomer: {
        fontFamily:     'open-sans-regular',
        margin:         10,
    },
    iconesWraper: {
        flexDirection:      'row',
        alignItems:         'center',
        justifyContent:     'center',
        
    },    
    separator: {
        height:             20,
        width:              1,
        backgroundColor:    '#ccc',
        marginLeft:         10,
        marginRight:        10,

    },
    icon: {
        color:              '#aaa',
        marginLeft:         10,
        marginRight:        10,
    },
    avatar: { 
        width:          80, 
        height:         80, 
        borderRadius:   40, 
        borderWidth:    2,
        borderColor:    '#ccc',
    }
    

})