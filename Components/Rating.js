import React, { Component } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native'
import PropTypes from 'prop-types';
import { Foundation } from '@expo/vector-icons';

class Rating extends Component {

    static propTypes = {
        fractions: PropTypes.number.isRequired,
        currentValue: PropTypes.number.isRequired,
    }

    //TODO static default value ! 


    constructor(props) {
        super(props);
        
        this._panResponder = null

        this.state = {
            value :         this.props.currentValue,    // Valeur du vote
            wrapperWith:    0,                          // Longueur du composant 
            wrapperX:       0,                          // Abscisse du composant
            starWith:       0,                          // Longueur d'un élément de rating
        }
    }

    /**
     * Permet de calculer le vote de l'utilisateur en fonction de la postion du doit sur le composant
     */
    calculateRating = (event) =>{
        let padding     = ((this.state.wrapperWith/this.props.fractions - this.state.starWith));
        let positionX   = event.nativeEvent.pageX - this.state.wrapperX;
        let rating      = Math.ceil(((positionX-padding) / this.state.wrapperWith) * this.props.fractions)

        this.setState({
            value: (rating > 0) ? rating : 1
        })
    }

    /**
     * Avant le rendu on ajoute la détection des évènements sur le composant
     */
    componentWillMount () {
        this._panResponder = PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onShouldBlockNativeResponder: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => this.calculateRating(evt),
            onPanResponderMove: (evt, gestureState) => this.calculateRating(evt),
            onPanResponderRelease: (evt, gestureState) => this.calculateRating(evt),

        });
    }

    /**
     * Permet d'obtenir des informations sur la taille du composant que l'on affiche ainsi que son abscisse
     * Cela sera pris en compte pour le calcul du rating 
     */
    getInformationsWrapper = (event) => {
        this.setState({
            wrapperWith:    event.nativeEvent.layout.width,
            wrapperX:       event.nativeEvent.layout.x
        })

    }

    /**
     * Permet d'obtenir des informations sur la taille de l'élément que l'on affiche.
     * Cela sera pris en compte pour le calcul du rating 
     */
    getStarInformation = (event) => {
        this.setState({
            starWith: event.nativeEvent.layout.width,
        })
    }

    render() {
        let stars = [];
        for (var i = 1; i <= this.props.fractions; i++) {
            stars.push( (i <= this.state.value) 
                          ? <Foundation key={i} color='#ff8f00' name='star' size={32} onLayout={ (i===1) ? this.getStarInformation : null } /> 
                          : <Foundation key={i} color='#aaa' name='star' size={32} onLayout={ (i===1) ? this.getStarInformation : null } /> );
        }
        return (
            <View style={ styles.container } {...this._panResponder.panHandlers} onLayout={this.getInformationsWrapper}>
                { stars }
            </View>
        );
    }
}

export default Rating;

const styles = StyleSheet.create({
    container: {
        flex:           1,
        flexDirection:  'row',
        justifyContent: 'space-around',
        alignItems:     'center',
    }
});