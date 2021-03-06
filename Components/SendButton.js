/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */
import React, { Component } from 'react';
import {  StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class componentName extends Component {
    render() {

        return (

            <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
                { this.props.loadingSend 
                    ?   <ActivityIndicator size="small" color='#ff8f00' />
                    :   <Ionicons color={ this.props.active ? '#ff8f00'  : '#ccc' }name='md-send' size={32} />
                }  
            </TouchableOpacity>

        );
    }
}

const styles = StyleSheet.create({
    button: {
        width:              40,
        height:             40,
        justifyContent:     'center',
        alignItems:         'center',
        backgroundColor:    '#fff',
    },

})