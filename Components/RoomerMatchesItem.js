import React, { Component } from 'react';
import  { View, StyleSheet, Text, } from 'react-native';
import Avatar from './Avatar';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

class RoomerMatchesItem extends Component {
    static propTypes = {
        user:           PropTypes.object.isRequired,
        handlePress:    PropTypes.func,
    };


    constructor(props) {
        super(props);

        this.state = {
            fontLoaded: true,
        }
    }

    render() {
        return (
            <View style={ styles.container } >
                <Avatar 

                />
                <Text style={ styles.roomer}>{ this.props.user.firstName } { this.props.user.lastName }</Text>
                
                <View style={styles.iconesWraper} >
                    <Ionicons name='ios-home' style={ styles.icon } size={24} />
                    <View style= {styles.separator} />
                    <Ionicons name='ios-mail-outline' style={ styles.icon } size={24} />
                </View>
            </View>
        );
    }
}

export default RoomerMatchesItem;

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
    }

})