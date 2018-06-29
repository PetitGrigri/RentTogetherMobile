import React, { Component } from 'react';
import {  View, Text, StyleSheet, Image } from 'react-native';
import { UserImage } from '../containers'
import PropTypes from 'prop-types';
import { convertStringToDateFR } from '../utils/convert';

export default class Bubble extends Component {

    static propTypes= {
        userId:         PropTypes.number.isRequired,
        messageText:    PropTypes.string.isRequired,
        createdDate:    PropTypes.string.isRequired,
        user:           PropTypes.object.isRequired,
        right:          PropTypes.bool,
    }

  render() {

    return (
      <View style={ this.props.right ? styles.containerRight : styles.containerLeft }>
            { this.props.right ===false ? <UserImage userId = { this.props.userId } style={ styles.avatarLeft } /> : null }

            <View style={ styles.messageWrapper } >
                
                <View style={ styles.messageHeader }>
                    { this.props.right === false
                        ?   <Text style={ styles.userLeft }>{ this.props.user.firstName } { this.props.user.lastName }</Text> 
                        :   <Text style={ styles.dateLeft }>{ convertStringToDateFR(this.props.createdDate) }</Text> 
                    }
                    { this.props.right === false
                        ?   <Text style={ styles.dateRight }>{ convertStringToDateFR(this.props.createdDate) }</Text> 
                        :   <Text style={ styles.userRight }>{ this.props.user.firstName } { this.props.user.lastName }</Text> 
                    }
                </View>

                <View style={ styles.messagesBubble }>

                    { this.props.right !== true ? <Image style= { styles.arrowLeft} source={ require('../assets/ios/buble_left.png') }  /> : null }

                    <View style={ this.props.right ? styles.messageRight : styles.messageLeft } >
                        <Text style={ styles.messageContent }> { this.props.messageText } </Text>
                    </View>

                    { this.props.right ? <Image style= { styles.arrowRight} source={ require('../assets/ios/buble_right.png') }  /> : null }

                </View>

            </View>
            { this.props.right ? <UserImage userId = { this.props.userId } style={ styles.avatarRight } /> : null }
      </View>
    );
  }
}

const styles = StyleSheet.create({
    containerLeft: {
        flexDirection:  'row', 
        alignItems:     'flex-end', 
        padding:        8,
        flex:           1,
        marginRight:    30,
    },
    containerRight: {
        flexDirection:  'row', 
        alignItems:     'flex-end', 
        padding:        8 ,
        flex:           1,
        marginLeft:     30,
    },
    avatarLeft: { 
        width:          40, 
        height:         40, 
        borderRadius:   20, 
        marginRight:    8 , 
        borderWidth:    1,
        borderColor:    '#eee',
    },
    avatarRight: { 
        width:          40, 
        height:         40, 
        borderRadius:   20, 
        marginLeft:     8, 
        borderWidth:    1,
        borderColor:    '#eee',
    },
    messageWrapper: {
        flex:           1,
        flexDirection:  'column',
        paddingTop:     5,
    },
    messageHeader: {
        height:             20,
        flexDirection:      'row',
    },
    userLeft: {
        fontFamily:     'open-sans-semi-bold', 
        fontSize:       12,
        color:          '#333',
        flex:           1,
    },
    userRight: {
        fontFamily:     'open-sans-semi-bold', 
        fontSize:       12,
        color:          '#333',
        flex:           1,
        textAlign:      'right',
    },
    dateLeft: {
        fontFamily:     'open-sans-regular', 
        fontSize:       12,
        color:          '#333',
        flex:           1,
    },
    dateRight: {
        fontFamily:     'open-sans-regular', 
        fontSize:       12,
        color:          '#333',
        flex:           1,   
        textAlign:      'right',   
    },
    messagesBubble: {
        flex:           1,
        flexDirection:  'row',
        elevation:      3,
    },

    messageRight: {
        borderRadius:       12, 
        flex:               1,
        backgroundColor:    '#ff8f00',
        padding:            8,
        minHeight:          40,
        zIndex:             2,
        marginBottom:       10,

    },
    messageLeft: {
        borderRadius:       12, 
        flex:               1,
        backgroundColor:    '#eee',
        padding:            8,
        minHeight:          40,
        zIndex:             2,
        marginBottom:       10,
    },
    messageContent: {
        fontFamily:     'open-sans-regular', 
        fontSize:       12,
        color:          '#000',
        textAlign:      'justify',
    }, 

    arrowRight: {
        width:          32,
        height:         24,
        position:       'absolute',
        bottom:         10,
        right:          -10,
        zIndex:         1,
    },

    arrowLeft: {
        width:          32,
        height:         24,
        position:       'absolute',
        bottom:         10,
        left:          -10,
        zIndex:         1,
    },
});
