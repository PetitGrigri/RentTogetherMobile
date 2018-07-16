/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */
import React, { Component } from 'react';
import {View, Image, StyleSheet } from 'react-native'

class Avatar extends Component {

    render() {
        return (
            <View>
                <Image style={ styles.avatar } source={require('../assets/no_user.png')}  />
            </View>
        );
    }
}

export default Avatar;

const styles = StyleSheet.create({
    avatar: { 
        width:          80, 
        height:         80, 
        borderRadius:   40, 
        borderWidth:    2,
        borderColor:    '#ccc',
    }
});