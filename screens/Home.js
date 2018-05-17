import React, { Component } from 'react';
import { ImageBackground, Text, SafeAreaView, View} from 'react-native';

class Profile extends Component {
    render() {
        return (
            <ImageBackground
                source={require('../assets/login-screen-mobile.jpg')}
                style={{flex:1}}
                >
                <SafeAreaView style={{flex: 1}}>
                    <View style={{flex: 1}}>
                        <Text>Hello Accueil</Text>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        );
    }
}

export default Profile;