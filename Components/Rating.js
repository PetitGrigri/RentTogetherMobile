import React, { Component } from 'react';
import { View, StyleSheet, PanResponder, Text } from 'react-native'
import PropTypes from 'prop-types';

class Rating extends Component {
    // Définitions du type des props
    static propTypes = {
        fractions:          PropTypes.number.isRequired,
        currentValue:       PropTypes.number.isRequired,
        activeComponent:    PropTypes.object.isRequired,
        unactiveComponent:  PropTypes.object.isRequired,
        reviews:            PropTypes.array,
        readonly:           PropTypes.bool
    }
    // Paramêtres par défaut
    static defaultProps = {
        onChange:   (value) => console.log('rating change'),
        reviews:    [],
        readonly:   false
    }

    constructor(props) {
        super(props);
        
        this._panResponder = null

        this.state = {
            value :         this.props.currentValue,    // Valeur du vote
            wrapperWith:    0,                          // Longueur du composant 
            wrapperX:       0,                          // Abscisse du composant
            starWith:       0,                          // Longueur d'un élément de rating
            review:         (this.props.reviews.length === this.props.fractions) ? this.props.reviews[this.props.currentValue-1]: null,  // Le commentaire lié à la valeur du rating
        }
    }

    /**
     * Permet de calculer le vote de l'utilisateur en fonction de la postion du doit sur le composant
     */
    calculateRating = (event) =>{
        let padding     = ((this.state.wrapperWith/this.props.fractions - this.state.starWith));
        let positionX   = event.nativeEvent.pageX - this.state.wrapperX;
        let rating      = Math.ceil(((positionX-padding) / this.state.wrapperWith) * this.props.fractions);

        rating =(rating <= 0) ? 1 : rating
        rating =(rating > 5) ? 5 : rating

        if (this.state.value != rating) {
            this.props.onChange(rating);
        }

        this.setState({
            value:  rating,
            review: (this.props.reviews.length === this.props.fractions) ? this.props.reviews[rating-1]: null,
        })

    }

    /**
     * Avant le rendu on ajoute la détection des évènements sur le composant
     */
    componentWillMount () {
        if (!this.props.readonly) {
            this.panResponder = PanResponder.create({
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
        let panHandlers = (!this.props.readonly) ? this.panResponder.panHandlers : null;
        let stars = [];

        for (var i = 1; i <= this.props.fractions; i++) {
            let layout = (i===1) ? this.getStarInformation  : null;

            let props = { 
                key: i,
                onLayout: layout
            }
            stars.push((i <= this.state.value) 
              ? React.cloneElement(this.props.activeComponent,   props)
              : React.cloneElement(this.props.unactiveComponent, props))
        }
        return (
            <View style={ styles.container}>
                <View style={ styles.stars } {...panHandlers} onLayout={this.getInformationsWrapper}>
                    { stars }
                </View>
                { this.state.review 
                    ? <View><Text style={ styles.review }>{this.state.review}</Text></View> 
                    : null
                }      
            </View>
        );
    }
}

export default Rating;

const styles = StyleSheet.create({
    container: {
        flex:           1,
        flexDirection:  'column',
    },
    stars: {
        flex:           1,
        flexDirection:  'row',
        justifyContent: 'space-between',
        alignItems:     'center',
    },
    review: {
        fontFamily: 'open-sans-light', 
        color:      '#e65100',
        textAlign:  'center'
    }
});