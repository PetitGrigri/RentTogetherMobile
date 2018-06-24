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

            <View style={{flex:4, justifyContent: 'center', alignItems: 'center'}}>  
                <Image source={require('../assets/logo.png')} style={styles.logo} />
                <Text style={styles.loginTitle}>Rent Together</Text>
            </View>           
        </ImageBackground>
    );
  }
}
  
export default LoginToken;


const styles = StyleSheet.create({
  bgImage: {
    flex:   1,
  },
  logo:{
    width:  SCREEN_WIDTH/4,
    height: SCREEN_WIDTH/4,
  },
  loginTitle: {
    fontFamily: 'open-sans-light', 
    fontSize:   4,
    color:      '#e65100'
  },
  footerText: {
    fontFamily: 'open-sans-regular', 
    fontSize:   12,
    color:      '#fff'
  },
  form: {
    flex:   2,
    width:  SCREEN_WIDTH*0.80, 
  },
});
