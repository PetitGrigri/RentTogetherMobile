import React, { Component } from 'react';
import { ImageBackground } from 'react-native';

class Test extends Component {
    render() {
        return (
            <ImageBackground
                source={require('../assets/login-screen-mobile.jpg')}
                style={{flex:1}}
                />
        );
    }
}

export default Test;