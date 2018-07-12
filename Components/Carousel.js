import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet, Image, PanResponder, Animated } from 'react-native';
import Text from './Text';
import PropTypes from 'prop-types';
import RoomerTabNavigator from '../navigation/RoomerTabNavigator';


class Carousel extends Component {

    static propTypes= {
        //image: PropTypes.,
    }
    constructor(props) {
        super(props);

        this.state = {
            cardWidth:      0,
            cardHeight:     0,
            position:       0,
            imagesCount:    this.props.images.length,
            translation:    new Animated.Value(0),
        }
    }

    getCardWidth = (nativeEvent) => {
        this.setState({
            cardWidth:  nativeEvent.layout.width,
            cardHeight: nativeEvent.layout.height
        })
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

            },
            onPanResponderRelease: (evt, gestureState) => { 

                let nextTranslation = this.state.position * this.state.cardWidth;

                if ((gestureState.dx < 20 ) && (this.state.position < (this.state.imagesCount-1))) {

                    nextTranslation = -this.state.cardWidth * (this.state.position + 1);

                    Animated.timing(
                        this.state.translation,
                        {
                            duration: 500,
                            toValue: nextTranslation,
                            useNativeDriver: true,
                        }
                    ).start(() => this.nextImage());

                } else if ((gestureState.dx > -20 ) && (this.state.position > 0)){

                    nextTranslation = -(this.state.position-1)  * this.state.cardWidth;

                    Animated.timing(
                        this.state.translation,
                        {
                            duration: 500,
                            toValue: nextTranslation,
                            useNativeDriver: true,
                        }
                    ).start(() => this.previousImage());
                }

                

            },
        });
    }

    nextImage = () => {
        this.setState({
            position: this.state.position +1,
        });
    }

    previousImage = () => {
        this.setState({
            position: this.state.position -1,
        });
    }

    getDynamicStyle = () =>{
       return { 
           width:       this.state.cardWidth * 3, 
           height:      this.state.cardHeight, 
           transform:   [{ translateX: this.state.translation }]
        }
    }


    render() {

        let images = this.props.images.map( (image, index) => React.cloneElement(image,  { 
            style : { width: this.state.cardWidth, height: this.state.cardHeight },
            key: index
        }));

        let dots = [];

        for (var i = 0; i <= this.state.imagesCount-1; i++) {
           
            dots.push((i == this.state.position) 
              ? <View key= {i} style={styles.dot} />
              : <View key= {i} style={styles.dotSelected} />
            );
        }

        return (
            <View style={ styles.carrouselWrapper} onLayout={ (event) => this.getCardWidth(event.nativeEvent) }  {...this.panResponder.panHandlers}>
                <Animated.View style= {[ this.getDynamicStyle(), styles.carrouselScrollView]}>
                    {images}
                </Animated.View>
                <View style={ styles.pageControlWrapper} >
                    {dots}
                </View>
            </View>
        );
    }
}

export default Carousel;


const styles = StyleSheet.create({
    carrouselWrapper: {
        width:              '100%',
        height:             '100%',
        overflow:           'hidden',
    },
    carrouselScrollView: {
        flexDirection:  'row',
        alignItems:     'center',
    },
    pageControlWrapper: {
        position:       'relative',
        width:          '100%',
        height:         20,
        bottom:         30,
        flexDirection:  'row',
        alignItems:     'center',
        justifyContent: 'center'
    },
    dot: {
        borderRadius:       5,
        backgroundColor:    '#ff8f00',
        width:              10,
        height:             10,
        margin:             5,
    },
    dotSelected: {
        borderRadius:       5,
        backgroundColor:    '#fff',
        width:              10,
        height:             10,
        margin:             5,
        borderColor:        'rgba(255,143,0,0.5)',
        borderWidth:        1,
    },
  });