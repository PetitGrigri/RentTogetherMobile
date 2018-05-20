import React, { Component } from 'react';
import { ImageBackground, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

var flatten = (style) => {

    if (typeof style === 'undefined')
        return {};

    if (!Array.isArray(style)) {
        style = [style];
    }

    return style.reduce((previousValue, currentValue) => {
           return { 
                ...(Number.isInteger(previousValue) ? StyleSheet.flatten(previousValue) : previousValue), 
                ...(Number.isInteger(previousValue) ? StyleSheet.flatten(previousValue) : previousValue)}
    });
}
class ColorfulImageBackground extends Component {
    render() {
        let {color, style, children, ...props} = this.props
        
        style = flatten(style);
        let {justifyContent, alignItems, flexDirection, ...styleBackground} = style

        let styleView = {
            width:'100%', 
            height:'100%', 
            backgroundColor: color, 
            justifyContent: justifyContent ? justifyContent : 'flex-start',
            alignItems: alignItems ? alignItems : 'flex-start'
        }

        return (
            <ImageBackground style={{titi:''}} {...props}>
                <View style={styleView} >
                    { children }
                </View>
            </ImageBackground>
        );
    }
}

ColorfulImageBackground.propTypes = {
    color: PropTypes.any.isRequired
};

export default ColorfulImageBackground;