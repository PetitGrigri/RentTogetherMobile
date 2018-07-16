/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */
import React, { Component } from 'react';
import { Text as TextNative, StyleSheet } from 'react-native';

class Text extends Component {
    render() {
        let {style, children, h1, h2, h3, h4, h5, ...props} = this.props

        let styleTitle = 
            (h1 && styles.h1) ||
            (h2 && styles.h2) ||
            (h3 && styles.h3) ||
            (h4 && styles.h4) ||
            (h5 && styles.h5) ||
            {};
            
        return <TextNative style={[style, styleTitle]} {...props}>{ children }</TextNative>
    }
}

export default Text;

const styles = StyleSheet.create({
    h1: { fontSize: 30 },
    h2: { fontSize: 24 },
    h3: { fontSize: 20 },
    h4: { fontSize: 16 },
    h5: { fontSize: 12 },
});
