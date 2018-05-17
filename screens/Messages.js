import React, { Component } from 'react';
import { ImageBackground, Text, TouchableHighlight} from 'react-native';

class Messages extends Component {
    render() {
        return (
            <ImageBackground
                source={require('../assets/login-screen-mobile.jpg')}
                style={{flex:1}}
                >
                <Text style={{marginBottom:50}}>Profil</Text>
                <TouchableHighlight
                    onPress={() => {console.log(this.props.navigation);  this.props.navigation.push('chat')}}
                    ><Text>Messages</Text></TouchableHighlight>
            </ImageBackground>
        );
    }
}

export default Messages;