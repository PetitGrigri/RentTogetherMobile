import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { PropTypes } from 'prop-types';


class RatingCondensed extends Component {

    static propTypes = {
        value:          PropTypes.string.isRequired,
        icon:           PropTypes.object.isRequired,
    }

    render() {

        let iconStyle = {style: styles.icon};
        let icon = React.cloneElement(this.props.icon,   iconStyle);
        
        return (
            <View style={styles.container}>
                <View style={styles.iconWrapper}>
                    { icon }
                </View>
                <View style={ styles.valueWrapper }>
                    <Text style={ styles.value} >{ this.props.value}</Text>
                </View>
            </View>
        );
    }
}

export default RatingCondensed;

const styles = StyleSheet.create({
    container: {
        backgroundColor:    '#ff8f00',

        height:             34,
        padding:            1,
        borderRadius:       17,
        flexDirection:      'row',
        margin: 2,
    }, 
    iconWrapper: {
        backgroundColor:    '#fff',
        width:              32,
        height:             32,
        borderRadius:       16,
        justifyContent:     'center',
        alignItems:         'center',
    }, 
    icon: {
        color:      '#ff8f00',
        fontSize:   22,
    }, 
    valueWrapper: {
        paddingLeft:    10,
        paddingRight:    10,
        justifyContent: 'center',
        alignItems:     'center',
    }, 
    value: {
        color:      '#fff',
        fontSize:   18,
    }
})