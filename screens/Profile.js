import React, { Component } from 'react';
import { ImageBackground, Text, Button, TouchableHighlight, Safe} from 'react-native';

class Profile extends Component {
    render() {
        return (
            <ImageBackground
                source={require('../assets/login-screen-mobile.jpg')}
                style={{flex:1}}
                >
                <Text style={{marginBottom:50}}>Profil</Text>
            </ImageBackground>
        );
    }
}

export default Profile;