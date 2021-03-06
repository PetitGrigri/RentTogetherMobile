/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */
import React, { Component } from 'react';
import {  View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import { Entypo } from '@expo/vector-icons';
import ButtonSubmit from '../Components/ButtonSubmit';

export default class NoMoreFlatList extends Component {

    static propTypes= {
        loading:        PropTypes.bool.isRequired,
        haveContent:    PropTypes.bool.isRequired,  
        loadingText:    PropTypes.string.isRequired,
        nothingText:    PropTypes.string.isRequired
    }

    render() {
        if (this.props.loading) {
            return (
                <View style={ styles.containerNoMoreCards }>
                    <Text style={ styles.noMoreText }>{ this.props.loadingText }</Text>
                    <ActivityIndicator color='#ff8f00' size='large' />
                </View>)
        } else if (!this.props.haveContent) {
            return (
                <View style={ styles.containerNoMoreCards }>
                    <Text style={ styles.noMoreText }>{ this.props.nothingText }</Text>
                    <Entypo name='emoji-sad' color='#ff8f00'  size={40}/>
                    { this.props.searchAgainAction 
                        ?   <ButtonSubmit 
                                text="Raffraichir !"
                                style={{marginTop:40, padding: 20 }}
                                loading={ this.props.loadingGetLocatairesPotentiels }
                                onPress={ this.props.searchAgainAction }
                            />
                        : null
                    }
                </View>)
        } else {
            return null
        }
    }
}


const styles = StyleSheet.create({
    containerNoMoreCards: {
        flex:           1,
        justifyContent: 'center',
        alignItems:     'center',
        padding:        16,
    }, 
    noMoreText: {
        color:           '#ff8f00',
        fontFamily:      'open-sans-light', 
        fontSize:        24,
        textAlign:      'center',
        marginBottom:   40,           
    }
});