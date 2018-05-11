import React from 'react';
import { StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

module.exports = styles