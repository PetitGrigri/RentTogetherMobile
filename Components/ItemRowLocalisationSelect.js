import React, { Component } from 'react';
import {  View, Text, StyleSheet,  TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default class ItemRowLocalisationSelect extends Component {
  
    static proptTypes = {
        index:          PropTypes.number.isRequired,
        item:           PropTypes.object.isRequired,
        handleSelect:   PropTypes.func.isRequired,
        addInProgress:  PropTypes.bool,
        addDone:        PropTypes.bool
    }

    constructor(props) {
        super(props);
    }
    
    render() {
        let { index, item, handleSelect } = this.props;
        

        
        return (
            <View key={`${index}-swipe`}  style={ styles.itemRow } >
                <Text style={styles.city}  >{item.libelle} {item.libelle2}</Text>
                <Text style={styles.postalCode} >{item.postalCodeId }</Text>
                { this.props.addDone 
                    ? <Ionicons size={24} color='#ccc' name='md-checkmark' style={ styles.addIcon } />
                    :    !this.props.addInProgress 
                            ?   <TouchableOpacity onPress={ () => handleSelect(this.props.item) } style={ styles.addIcon }>
                                    <MaterialIcons size={24} color='#ff8f00'name='add-location' />
                                </TouchableOpacity>
                            : <ActivityIndicator size="small" color='#ff8f00' style={ styles.addIcon } />
                } 

            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemRow: {
        marginLeft:     8,
        marginRight:    8,
        height:         50,
        paddingRight:   12,
        paddingLeft:    12,
        flexDirection:  'row',
        justifyContent: 'flex-start',
        alignItems:     'center',
        backgroundColor: '#fff',
        zIndex:         1,
    },

    city: {
        fontFamily:     'open-sans-light', 
        fontSize:       16,
        flex:           1,
    }, 
    postalCode: {
        fontFamily:     'open-sans-light', 
        fontSize :      12,
        textAlign:      'right'
    },
    addIcon: {
        padding:            8,
        paddingLeft:        16,
        paddingRight:       0,
    },
});