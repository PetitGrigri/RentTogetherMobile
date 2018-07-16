/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */
import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, ActivityIndicator } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class LoginWaiting extends Component {
  render() {

    return (
        <ImageBackground
            source={require('../assets/login-screen-mobile.jpg')}
            style={styles.bgImage} >

            <View style={styles.container}>  
                <View style={styles.titleContainer}>
                    <Text style={styles.loginTitle}>Rent T</Text>
                    <ActivityIndicator color='#e65100' size='small' />
                    <Text style={styles.loginTitle}>gether</Text>
                </View>
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                
            </View>

        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:           4, 
    justifyContent: 'center', 
    alignItems:     'center'
  },
  titleContainer: {
    flexDirection: 'row',
  },
  bgImage: {
    flex: 1,
  },
  logo:{
    width:  SCREEN_WIDTH/4,
    height: SCREEN_WIDTH/4,
  },
  loginTitle: {
    fontFamily:     'open-sans-light', 
    fontSize:       28,
    color:          '#e65100',
    marginBottom:   8,
  }
});
