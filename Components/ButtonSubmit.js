import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';

class ButtonSubmit extends Component {

    onPress= () => {
        if (this.props.loading !== true) {
            this.props.onPress();
        }
    }
    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={{marginTop:50}}
                onPress={this.onPress}
                >
                <View style={inputButtonStyle.button}>
                    { this.props.loading 
                        ?   <ActivityIndicator size="small" color='#fff' />
                        :   <Text style={inputButtonStyle.text}>
                                {this.props.text}
                            </Text>
                    }  
                </View>
            </TouchableOpacity>
        );
    }
}
export default ButtonSubmit;


const inputButtonStyle = StyleSheet.create({
    text: {
        color: '#fff'
    },
    button: {
        height: 40, 
        borderWidth: 0,
        borderRadius: 20,
        backgroundColor: '#ff8f00',
        elevation: 0,
        alignItems:'center',
        justifyContent: 'center'
    }
});