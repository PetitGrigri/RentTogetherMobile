import React, { Component } from 'react';
import {  View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class ItemRowLocation extends Component {
  
    static proptTypes = {
        index:  PropTypes.number.isRequired,
        item:   PropTypes.object.isRequired,
    }
    
    render() {
        let { index, item } = this.props;

        return (
            <View key={index} style={styles.itemRow}>
                <Text style={styles.itemRowLabel} >{item.postalCode }</Text>
                <Text style={styles.itemRowValue}  >{item.city}</Text>
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
    itemRowLabel: {
        fontFamily:     'open-sans-light', 
        fontSize:       12,
        flex:           1,
    }, 
    itemRowValue: {
        fontFamily:     'open-sans-light', 
        fontSize :      16,
        flex:           2,
        textAlign:      'right'
    }
});