import React, { Component } from 'react';
import {  View, Text, StyleSheet,  Animated, PanResponder, Easing, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

export default class ItemRowLocalisationSwipe extends Component {
  
    constructor(props) {
        super(props);

        this.state = {
            translation:        new Animated.Value(0),
            itemWidth:          null,
            itemHeight:         null,
        }
    }
    static proptTypes = {
        index:          PropTypes.number.isRequired,
        item:           PropTypes.object.isRequired,
        handleDelete:   PropTypes.func.isRequired,
    }
    
    componentWillMount () {
        this.panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => { return true },
            onStartShouldSetPanResponderCapture: (evt, gestureState) => {  return true },
            onMoveShouldSetPanResponder: (evt, gestureState) => { return true },
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => { return true },
            onPanResponderTerminationRequest: (evt, gestureState) => { return false },
            onShouldBlockNativeResponder: (evt, gestureState) => { return true },

            onPanResponderGrant: (evt, gestureState) => { 

            },
            onPanResponderMove: (evt, gestureState) => { 
                if ((gestureState.dx < 0) && (!this.props.deleteInProgress)) {
                    this.state.translation.setValue(gestureState.dx);
                }
            },
            onPanResponderRelease: (evt, gestureState) => { 

                if (this.props.deleteInProgress) {
                    return;
                }

                let toValue = 0;
                
                // Si on déplace notre Iem au dela de 50% de la longueur disponibles on lance la suppression de l'item 
                if  (gestureState.dx <=  -this.state.itemWidth*0.5) {
                    toValue = -this.state.itemWidth ;

                    //demande de suppression au parent
                    this.props.handleDelete(this.props.item);
                }
                
                // Animation de 
                Animated.timing(
                    this.state.translation,
                    {
                        toValue: toValue,
                        duration: 250,
                        easing: Easing.ease
                    }
                ).start();
            },
        });
    }

    setSwipeDimensions(nativeEvent) {
        this.setState({
            itemWidth:  nativeEvent.layout.width,
            itemHeight: nativeEvent.layout.height
        })
    }

    render() {

        let { index, item } = this.props;

        return (
            <View key={`${index}-swipe`} {...this.panResponder.panHandlers} onLayout={ (event) => this.setSwipeDimensions(event.nativeEvent) } style={ styles.container } >
                <Animated.View style={ [styles.itemRow, {transform:[ {translateX: this.state.translation} ]}] }>
                    <Text style={styles.city}  >{item.city} {item.city2}</Text>
                    <Text style={styles.postalCode} >{item.postalCode }</Text>
                </Animated.View>
                <View  style={styles.delete}>
                    <Text style={styles.textDelete}>Supprimer</Text>
                    { this.props.deleteInProgress ? <ActivityIndicator size="small" color='#fff' /> : <Ionicons name='ios-trash-outline' color='#fff' size={24} /> }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft:     8,
        marginRight:    8,
        height:         50,
    },
    delete: {
        backgroundColor:    '#f33',
        position:           'absolute',
        top:                0,
        left:               0,
        right:              0,
        bottom:             0,
        zIndex:             0,
        flexDirection:      'row',
        justifyContent:     'flex-end',
        alignItems:         'center',
        paddingRight:       20,
    },
    textDelete: {
        color:              '#fff',
        marginRight:        10,
        fontFamily:         'open-sans-light', 
    },
    itemRow: {
        paddingRight:   12,
        paddingLeft:    12,
        flexDirection:  'row',
        justifyContent: 'flex-start',
        alignItems:     'center',
        backgroundColor: '#fff',
        zIndex:         1,
        height:         50,

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
    deleteIcon: {
        width:          30,
        textAlign:      'left',

    }, 
});