import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

class InputTextareaApplication extends Component {
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
        let { onChangeText, value, iconLeft, ...textInputProps} = this.props;
        return (
            <View style={inputTextStyle.formInputContainer}>
                { iconLeft ? iconLeft : null }
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

export default InputTextareaApplication;


const inputTextStyle = StyleSheet.create({
    formInputContainer: {
        flex:               1,
        height:             160,
        backgroundColor:    '#fff',
        marginBottom:       5,
        marginTop:          5,
        flexDirection:      'row',
        alignItems:         'center',
    }, 
    formInput:{
        flex:           1,
        marginLeft:     8,
        marginRight:    8,
        fontFamily:     'open-sans-light',
        fontSize:       16,     
        color:          '#000',
    }
});