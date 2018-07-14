import React, { Component } from 'react';
import  { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Avatar from './Avatar';
import { Ionicons, Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { UserImage } from '../containers';
import { LinearGradient } from 'expo';
import Carousel from '../Components/Carousel';
import LocationImage from '../containers/LocationImage';

class LocationItem extends Component {
    static propTypes = {
    };

    constructor(props) {
        super(props);
    }

    render() {

        //les images sont contenus dans buildingPictureInformationApiDtos. Si buildingPictureInformationApiDtos est null (cela est lié à l'ajout d'un appartement dans redux, on retourne un tableau vide)
        let images = this.props.buildingPictureInformationApiDtos ? this.props.buildingPictureInformationApiDtos.map( picture => {
            return <LocationImage pictureId={ picture.buildingPictureId } /> 
        }) : [];

        let { handleCreateConversation, handleShowLocation, loadingCreateConversation, showMessages } = this.props;

        return (
            <View  style={ styles.propertyContainer }>
                <View style={{elevation: 3, flex:1}}>
                    <LinearGradient colors={['rgba(0,0,0,0)','rgba(0,0,0,0.1)', 'rgba(0,0,0, 0.6 )', ]} style={ styles.titlePropertContainer } start={[0, 1]} end={[0, 0]}>
                        <Text style={ styles.title }>{ this.props.title }</Text>
                        
                    </LinearGradient>
                    { (images.length > 0)
                        ? <Carousel images={ images }/>
                        : <Image source={ require('../assets/no_building.png') }  />
                    }
                </View>
                <View style={ styles.bottomCard}>
                    <View style={styles.iconesWraper} >
                        <TouchableOpacity onPress={ () => handleShowLocation() }>
                            <Ionicons name='ios-home' style={ styles.icon } size={28} />
                        </TouchableOpacity>
                        <View style= {styles.separator} />
                        {loadingCreateConversation 
                            ?   <ActivityIndicator size="small" color='#aaa' /> 
                            :   <TouchableOpacity onPress={ () => handleCreateConversation() }>
                                    <Ionicons name='ios-mail-outline' style={ styles.icon } size={32} />
                                </TouchableOpacity>
                        }
                        <View style= {styles.separator} />
                        <TouchableOpacity onPress={ () => { showMessages () } } >
                            <Ionicons name='ios-chatbubbles-outline' style={ styles.icon } size={28} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
  
export default LocationItem

const styles= StyleSheet.create({
    propertyContainer: {
        width:          '100%',
        aspectRatio:     1.6,
        padding:         8,
    },
    titlePropertContainer: {
        position:       'absolute',
        top:            0,
        right:          0,
        left:           0,
        height:         100,
        zIndex:         2,
        padding:        8,
        flexDirection:  'row',
        justifyContent: 'space-between',
        alignItems:     'flex-start',
    },
    title: {
        color:          '#fff',
        fontFamily:     'open-sans-light', 
        fontSize:       12,
        padding:        8,
    },
    bottomCard: { 

        backgroundColor:    '#fff', 
        padding:            8,
        justifyContent:     'flex-end',
        flexDirection:      'row',

    },
    iconesWraper: {
        flexDirection:      'row',
        alignItems:         'center',
        justifyContent:     'center',
        
    },    
    separator: {
        height:             20,
        width:              1,
        backgroundColor:    '#ccc',
        marginLeft:         10,
        marginRight:        10,

    },
    icon: {
        color:              '#aaa',
        marginLeft:         10,
        marginRight:        10,
    },

})