import React from 'react';
import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cff'

    },
    safeContainer: {
        flex: 1,
        backgroundColor: '#f00'
    },
})

module.exports = styles