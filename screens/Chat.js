import React, { Component } from 'react';
import { ImageBackground, Text} from 'react-native';

class Chat extends Component {
    


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