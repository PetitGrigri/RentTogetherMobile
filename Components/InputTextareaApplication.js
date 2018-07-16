import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

class InputTextareaApplication extends Component {
    static propTypes =  {

    }

    // Paramêtres par défaut
    static defaultProps = {
        error:      false,
        value:      ''
    }
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
            <View style={ [inputTextStyle.formInputContainer, (this.props.error? inputTextStyle.formInputContainerError: inputTextStyle.formInputContainerNormal) ]} >
                { iconLeft ? iconLeft : null }
                <TextInput
                    {...textInputProps }
                    style={inputTextStyle.formInput}
                    underlineColorAndroid="transparent"
                    onChangeText={this.onChange}
                    value={ this.state.value }
                    placeholderTextColor={ this.props.error ? '#c62828' : '#ccc'}
                    />
            </View>
        );
    }
}

export default InputTextareaApplication;


const inputTextStyle = StyleSheet.create({
    formInputContainer: {
        flex:               1,
        borderRadius:       4,
        marginBottom:       5,
        marginTop:          5,
        flexDirection:      'row',
        alignItems:         'center',
    }, 
    formInputContainerError: {
        backgroundColor: '#ef9a9a'
    },
    formInputContainerNormal: {
        backgroundColor: '#fff'
    },
    formInput:{
        flex:           1,
        padding:        8,
        fontFamily:     'open-sans-light',
        fontSize:       16,     
        color:          '#000',
    }
});