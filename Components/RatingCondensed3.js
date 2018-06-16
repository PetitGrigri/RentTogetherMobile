import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { Foundation, MaterialCommunityIcons} from '@expo/vector-icons';

class RatingCondensed3 extends Component {
    render() {

        return (
            <View style={styles.container}>
                <View style={styles.containerWhite }>
                    <View style={styles.containerRating}>
                        <Foundation style={styles.iconSelected} name='guide-dog' />
                        <Foundation style={styles.iconSelected} name='guide-dog' />
                        <Foundation style={styles.iconSelected} name='guide-dog' />
                        <Foundation style={styles.iconUnselected} name='guide-dog' />
                        <Foundation style={styles.iconUnselected} name='guide-dog' />
                    </View>
                    <View style={styles.containerOrange}>
                        <Text style={styles.containerOrangeText}>3</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default RatingCondensed3;

const styles = StyleSheet.create({
    container: { 
        backgroundColor:    '#ff8f00',
        width:              156,
        height:             40,
        padding:            2,
        borderRadius:       20,
        margin:             2,
        zIndex:             1,
    }, 
    containerWhite: {
        backgroundColor:    '#fff',
        flex:               1,
        borderRadius:       18,
        flexDirection:      'row',
        zIndex:             2,

    },
    containerRating: {
        justifyContent:     'space-between',
        alignItems:         'center',
        flexDirection:      'row',
        flex:               1,
        paddingLeft:        10,
        paddingRight:       5,
        zIndex:             3,
    },
    iconSelected: {
        color:      '#ff8f00',
        fontSize:   22,
        zIndex:     4,
    }, 
    iconUnselected: {
        color:      '#aaa',
        fontSize:   22,
        zIndex:     4,
    }, 
    containerOrange: {
        backgroundColor:    '#ff8f00',
        width:              36,
        height:             36,
        borderRadius:       18,
        flexDirection:      'row',
        justifyContent:     'center',
        alignItems:         'center',
        zIndex:     4,
    },
    containerOrangeText: {
        color:  '#fff',
        fontSize:   20,
        zIndex:     5,
    }
})