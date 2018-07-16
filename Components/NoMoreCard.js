import React, { Component } from 'react';
import {  View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import { Entypo } from '@expo/vector-icons';
import ButtonSubmit from '../Components/ButtonSubmit';

export default class NoMoreCard extends Component {

    static propTypes= {
        loading:        PropTypes.bool.isRequired,
        loadingText:    PropTypes.string.isRequired,
        nothingText:    PropTypes.string.isRequired
    }

    render() {
        return (
            this.props.loading 
                ?   <View style={ styles.containerNoMoreCards }>
                        <Text style={ styles.noMoreText }>{ this.props.loadingText }</Text>
                        <ActivityIndicator color='#ff8f00' size='large' />
                    </View>
                :   <View style={ styles.containerNoMoreCards }>
                        <Text style={ styles.noMoreText }>{ this.props.nothingText }</Text>
                        <Entypo name='emoji-sad' color='#ff8f00'  size={40}/>
                        { this.props.searchAgainAction 
                            ?   <ButtonSubmit 
                                    text="Chercher encore !"
                                    style={{marginTop:40, padding: 20 }}
                                    loading={ this.props.loadingGetLocatairesPotentiels }
                                    onPress={ this.props.searchAgainAction }
                                />
                            : null
                        }
                    </View>
        );
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