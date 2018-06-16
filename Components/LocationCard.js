import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Text from '../Components/Text';
import PropTypes from 'prop-types';
import RatingCondensed from './RatingCondensed';
import Carousel from './Carousel';

class LocationCard extends Component 
{
    static defaultProps = {
       
    }

    constructor(props) {

        super(props);
    }

    render() {
        return (
            <View style={ styles.card }>
                    
                <View style={ styles.cardTopInformation}  >
                    <Carousel 
                        images={ this.props.images }
                    />
                    <View style={styles.cardBottomAfter}><View style={styles.cardBottomTop} /></View>
                </View>
                <View style={ styles.cardBottom }>
                    <Text style={ styles.textDescription }>
                        { this.props.description }
                    </Text>

                    <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'space-around' , flexWrap: 'wrap'}} >
                        { this.props.characteristics.map((characteristic, index) => <RatingCondensed key={index} {...characteristic} />)}
                    </View>
                </View>
            </View>
        );
    }
}

LocationCard.propTypes = {
    age:            PropTypes.number.isRequired,
    description:    PropTypes.string.isRequired,
    name:           PropTypes.string.isRequired,
    pourcentage:    PropTypes.number.isRequired,
};

export default LocationCard;    
    
const styles = StyleSheet.create({
    card: { 
        flex:           1,
        margin:         20,
        flexDirection:  'column',
        elevation:      2,
        alignItems:     'center',
    },

    cardTopInformation: {
        flex:               40, 
        flexDirection:      'row',
        justifyContent:     'center',
        alignItems:         'center',
        zIndex:             1,
        borderWidth:        1,
        borderColor:        '#ccc',
        borderBottomWidth:  0,
    },

    backgroundAvatar: {
        width:          '100%',
        height:         '100%',
    },
    textWhite: {
        color:           '#fff',
        fontFamily:      'open-sans-light', 
    },
    textDescription: {
        fontFamily:     'open-sans-regular', 
        fontSize:       14,
        color:          '#000',
        textAlign:      'justify',
        margin:         8
    },
    cardBottom: {
        flex:               60,
        backgroundColor:    '#fff',
        borderWidth:        1,
        borderColor:        '#ccc',
        borderTopWidth:     0,
        justifyContent:     'space-between',
        alignItems:         'flex-start',
        padding:            8,
    },
    cardBottomTop: {
        backgroundColor:    '#fff',
        borderRadius:       10,
        height:             20,

    },
    cardBottomAfter: {
        height:         10,
        overflow:       'hidden',
        width:          '100%',
        zIndex:         1000,
        bottom:         0,
        position:       'absolute'
    }
  });