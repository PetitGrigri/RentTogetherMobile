import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Text from '../Components/Text';
import PropTypes from 'prop-types';
import RatingCondensed from './RatingCondensed';
import Carousel from './Carousel';
import LocationImage from '../containers/LocationImage';
import { Ionicons} from '@expo/vector-icons';

import { MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';

class LocationCard extends Component 
{
    static defaultProps = {
       
    }

    static propTypes = {
        description:    PropTypes.string.isRequired,
        //images:         PropTypes.array.isRequired,
        handleShowMessages:  PropTypes.func.isRequired
    };

    render() {

        let images = this.props.buildingPictureInformationApiDtos.map( value => { 
            return <LocationImage pictureId={ value.buildingPictureId } /> 
        });

        return (
            <View style={ styles.card }>
                    
                <View style={ styles.cardTopInformation}  >
                    <View style={ styles.messagesIcon } >
                        <TouchableOpacity onPress={ () => { this.props.handleShowMessages(this.props.buildingId) } } >
                            <Ionicons color='#fff' name='ios-chatbubbles' size={32} />
                        </TouchableOpacity>
                    </View>
                    <Carousel 
                        images={ images }
                    />
                    <View style={styles.cardBottomAfter}><View style={styles.cardBottomTop} /></View>
                </View>
                <View style={ styles.cardBottom }>
                    <Text style={ styles.textDescription }>
                        { this.props.description }
                    </Text>

                    <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'space-around' , flexWrap: 'wrap'}} >
                        <RatingCondensed value={ this.props.nbRoom } icon={ <FontAwesome name='bed' /> } />
                        <RatingCondensed value={ this.props.nbPiece } icon={ <FontAwesome name='cube' /> } />
                        <RatingCondensed value={ `${this.props.nbRenters} / ${this.props.nbMaxRenters}` } icon={ <FontAwesome name='user' /> } />
                        <RatingCondensed value={ this.props.parking } icon={ <MaterialIcons name='local-parking' /> } />
                        <RatingCondensed value={ this.props.area } icon={ <Entypo name='resize-full-screen' /> } />
                        <RatingCondensed value={ `${this.props.price} / personne` } icon={ <FontAwesome name='euro' /> } />
                    </View>
                </View>
            </View>
        );
    }
}

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
        padding:            8,
        width:              '100%',
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
    },
    messagesIcon: {
        position:           'absolute',
        padding:            8,
        top:                0,
        right:              0,
        zIndex:             5,
    }
  });