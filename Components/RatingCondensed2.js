import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { PropTypes } from 'prop-types';

class RatingCondensed2 extends Component {

    static propTypes = {
        fractions:      PropTypes.number.isRequired,
        value:          PropTypes.number.isRequired,
        icon:           PropTypes.object.isRequired,
    }

    render() {
        let stars = [];

        for (var i = 1; i <= this.props.fractions; i++) {
            //mise en place du style des "étoiles"
            let style = (i <= this.props.value) ? styles.iconSelected : styles.iconUnselected;
            let props = { 
                key:    i,
                style:  style,
            }

            stars.push(React.cloneElement(this.props.icon,   props))
        }
        return (
            <View style={styles.container}>
                <View style={styles.containerWhite }>
                    {stars}
                </View>
            </View>
        );
    }
}

export default RatingCondensed2;

const styles = StyleSheet.create({
    container: { 
        backgroundColor:    '#ff8f00',
        width:              140,
        height:             40,
        padding:            2,
        borderRadius:       20,
        margin: 2
    }, 
    containerWhite: {
        backgroundColor:    '#fff',
        width:              136,
        height:             36,
        padding:            5,
        paddingLeft:        10,
        paddingRight:        10,
        borderRadius:       18,
        flexDirection:      'row',
        justifyContent:     'space-between',
        alignItems:         'center',
    },
    iconSelected: {
        color:      '#ff8f00',
        fontSize:   24,
    }, 
    iconUnselected: {
        color:      '#aaa',
        fontSize:   24,
    }, 
})