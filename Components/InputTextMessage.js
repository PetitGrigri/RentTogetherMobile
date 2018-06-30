import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import SendButton from './SendButton';

class InputTextMessage extends Component {
    constructor(props) {
        super(props);
        this.state={
            value: this.props.value || '',
        }

    }

    onChange = (text) => {
        this.setState({ value: text });
    }

    onSend = () => {
        if (( this.props.onSend ) && ( this.state.value.length > 0 )) {
            this.props.onSend(this.state.value);
        }
        this.setState({ value: '' });
    }

    
    render() {
        let { onChangeText, value, ...textInputProps} = this.props;

        return (
            <View style={inputTextStyle.formInputContainer}>
                <TextInput
                    {...textInputProps }
                    style={inputTextStyle.formInput}
                    underlineColorAndroid="transparent"
                    onChangeText={this.onChange}
                    value={ this.state.value }
                />
                <SendButton
                    active={ (this.state.value.length) > 0 ? true : false }
                    loadingSend= { this.props.loadingSend}
                    onPress={this.onSend}
                />

            </View>
        );
    }
}

export default InputTextMessage;



const inputTextStyle = StyleSheet.create({
    formInputContainer: {
        height:             100, 
        borderTopWidth:     1,
        borderColor:        '#eee',
        backgroundColor:    '#fff',
        padding:            5,
        flexDirection:      'row',
        alignContent:       'center',
        justifyContent:     'center',
    },
    formInput:{

        height:         40,
        fontFamily:     'open-sans-regular', 
        fontSize:       14,
        color:          '#000',
        textAlign:      'justify',
        flex:           1
    }
});