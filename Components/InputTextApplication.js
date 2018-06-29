import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

class InputTextApplication extends Component {
    constructor(props) {
        super(props);

        this.state={
            value: this.props.value || '',
        }
    }

    onChange = (text) => {
        this.setState({value:text});
        if (this.props.onChangeText) {
            this.props.onChangeText(text);
        }
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
            </View>
        );
    }
}

export default InputTextApplication;



const inputTextStyle = StyleSheet.create({
    formInputContainer: {
        height:             40, 
        borderBottomWidth:  1,
        borderColor:        '#ff8f00',
        backgroundColor:    'transparent',
        marginBottom:       5,
        marginTop:          5,
    },
    formInput:{
        marginLeft:     8,
        marginRight:    8,
        height:         40,
        fontFamily:     'open-sans-light',
        fontSize:       24,     
        color:          '#ff8f00',
    }
});