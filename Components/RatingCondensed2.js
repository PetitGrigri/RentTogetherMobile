import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { PropTypes } from 'prop-types';

class RatingCondensed2 extends Component {

    static propTypes = {
        fractions:          PropTypes.number.isRequired,
        currentValue:       PropTypes.number.isRequired,
        activeComponent:    PropTypes.object.isRequired,
        unactiveComponent:  PropTypes.object.isRequired,
    }

    render() {
        let stars = [];

        stars.push()

        for (var i = 1; i <= this.props.fractions; i++) {
            stars.push( (i <= this.props.currentValue) 
                ?   React.cloneElement(this.props.activeComponent, {key: i, style: { width: 20, height: 20 }} )
                :   React.cloneElement(this.props.unactiveComponent, {key: i, style: { width: 20, height: 20 }} ));
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
        padding:            1,
        borderRadius:       20,
        margin:             2
    }, 
    containerWhite: {
        backgroundColor:    '#fff',
        width:              138,
        height:             38,
        padding:            5,
        paddingLeft:        10,
        paddingRight:       10,
        borderRadius:       19,
        flexDirection:      'row',
        justifyContent:     'space-between',
        alignItems:         'center',
    }
})