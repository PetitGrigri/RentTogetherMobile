import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

class InputText extends Component {
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

export default InputText;



const inputTextStyle = StyleSheet.create({
    formInputContainer: {
        height: 40, 
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.50)',
        marginBottom:5,
        marginTop:5,
        elevation:2
    },
    formInput:{
        marginLeft: 20,
        marginRight: 20,
        height: 40,
        color:'#ff8f00',
    }
});