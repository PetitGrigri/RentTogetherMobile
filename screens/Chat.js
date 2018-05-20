import React, { Component } from 'react';
import { ImageBackground, Text} from 'react-native';

class Chat extends Component {
    


    /**
     * Attention : un header transparent aura un contenu en dessous, ce problème n'existe pas avec une barre normale
     */
    render() {
        return (
            <ImageBackground
                source={require('../assets/login-screen-mobile.jpg')}
                style={{flex:1}}
                >
                <Text>Chat</Text>
            </ImageBackground>
        );
    }
}

export default Chat;