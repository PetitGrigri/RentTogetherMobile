import React, { Component } from 'react';
import {  View, StyleSheet, TouchableOpacity} from 'react-native';
import Text from '../Text';
import PropTypes from 'prop-types';

export default class TitleHeader extends Component {
  
    static proptTypes = {
        section:  PropTypes.object.isRequired,
    }
    
    render() {
        let {section: {title, actionTitle, action}} = this.props

        return  (
            <View style={ styles.titleSection }>
                { (title && (!actionTitle)) ? <Text h2 style={styles.titleProfile}>{ title }</Text> : null }
                { actionTitle 
                    ?   <TouchableOpacity onPress= { actionTitle } style={styles.actionTitle}>
                            <Text h2 style={styles.titleProfile}>{ title }</Text>
                        </TouchableOpacity> 
                    :   null 
                }
                { action  ?   action  :   null  }
            </View>
        );
    }
}

const styles = StyleSheet.create({
   
    titleProfile: {
        fontFamily: 'open-sans-light', 
        color:      '#e65100',
        flex:       1,
    },
   
    titleSection: {
        flexDirection:  'row',
        alignItems:     'center',
        marginTop:      10,
    },
    actionTitle: {
        flex:       1,
    },
    titleProfile: {
        fontFamily: 'open-sans-light', 
        color:      '#e65100',
        flex:       1,
    },
});