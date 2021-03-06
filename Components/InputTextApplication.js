/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */
import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';


class InputTextApplication extends Component {
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
            value: this.props.value,
            height: undefined,
            width:  undefined,
            x:      undefined,
            y:      undefined
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.value != this.props.value) {
            this.setState({
                value:  this.props.value,
            })
        }
    };
    
    onChange = (text) => {
        this.setState({value:text});
        if (this.props.onChangeText) {
            this.props.onChangeText(text);
        }
    }
    

    getEvent = (event) => {
        this.setState({
            height: event.layout.height,
            width:  event.layout.width,
            x:      event.layout.x,
            y:      event.layout.y,
        })
    }
    
    render() {
        let { onChangeText, value, iconLeft, onScrollTo, onFocus, ...textInputProps} = this.props;

        let customOnFocus = () => {
            if (typeof onScrollTo == "function") {
                onScrollTo(this.state.y);
            }
            if (typeof onFocus == "function") {
                onFocus();
            }
        }
        return (
            <View style={ [inputTextStyle.formInputContainer, (this.props.error? inputTextStyle.formInputContainerError: inputTextStyle.formInputContainerNormal) ]} onLayout={ (event) => this.getEvent(event.nativeEvent) } >
                { iconLeft ? iconLeft : null }
                <TextInput
                    {...textInputProps }
                    style={inputTextStyle.formInput}
                    underlineColorAndroid="transparent"
                    onFocus={ () => customOnFocus() }
                    onChangeText={this.onChange}
                    value={ this.state.value }
                    placeholderTextColor={ this.props.error ? '#c62828' : '#ccc'}
                    />
            </View>
        );
    }
}

export default InputTextApplication;



const inputTextStyle = StyleSheet.create({
    formInputContainer: {
        height:             40, 
        borderRadius:       4,
        marginBottom:       5,
        marginTop:          5,
        flexDirection:      'row',
        alignItems:         'center',
    },
    formInputContainerError: {
        backgroundColor:        '#ef9a9a',
    },
    formInputContainerNormal: {
        backgroundColor: '#fff'
    },
    formInput:{
        flex:           1,
        marginLeft:     8,
        marginRight:    8,
        height:         40,
        fontFamily:     'open-sans-light',
        fontSize:       16,     
        color:          '#000',
    }
});