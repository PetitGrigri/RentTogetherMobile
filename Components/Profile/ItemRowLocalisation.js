/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */

 import React, { Component } from 'react';
import {  View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class ItemRowLocalisation extends Component {
  
    static proptTypes = {
        index:  PropTypes.number.isRequired,
        item:   PropTypes.object.isRequired,
    }
    
    render() {
        let { index, item } = this.props;

        return (
            <View key={index} style={styles.itemRow}>
                <Text style={styles.city}  >{item.city} {item.city2}</Text>
                <Text style={styles.postalCode} >{item.postalCode }</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemRow: {
        padding:        12,
        marginLeft:     4,
        marginRight:    4,
        flexDirection:  'row',
        justifyContent: 'flex-start',
        alignItems:     'center',
    },
    postalCode: {
        fontFamily:     'open-sans-light', 
        fontSize:       12,
        flex:           1,
        textAlign:      'right'
    }, 
    city: {
        fontFamily:     'open-sans-light', 
        fontSize :      16,
        flex:           2,
        textAlign:      'left'
    },
    deleteIcon: {
        width:          30,
        textAlign:      'left',

    }, 
});