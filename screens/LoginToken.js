import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class LoginToken extends Component {

  render() {
    return (
        <ImageBackground
            source={require('../assets/login-screen-mobile.jpg')}
            style={styles.bgImage}
            >

              <Image source={require('../assets/logo.png')} style={styles.logo} />
              <Text style={styles.title}>Rent Together</Text>         
        </ImageBackground>
    );
  }
}
  
export default LoginToken;


const styles = StyleSheet.create({
  bgImage: {
    flex:   1,
    justifyContent:   'center', 
    alignItems:       'center'
  },
  logo:{
    width:  SCREEN_WIDTH/4,
    height: SCREEN_WIDTH/4,
  },
  title: {
    fontFamily: 'open-sans-light', 
    fontSize:   44,
    color:      '#e65100'
  },
  
});
