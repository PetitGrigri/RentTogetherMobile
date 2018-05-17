import React, { Component } from 'react';
import { ImageBackground, Text} from 'react-native';

class Matches extends Component {
    render() {
        return (
            <ImageBackground
                source={require('../assets/login-screen-mobile.jpg')}
                style={{flex:1}}
                >
                <Text>Matches</Text>
            </ImageBackground>
        );
    }
}

export default Matches;