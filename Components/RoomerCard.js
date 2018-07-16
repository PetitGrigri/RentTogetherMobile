/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */
import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';
import Text from '../Components/Text';
import PropTypes from 'prop-types';
import RatingCondensed2 from './RatingCondensed2';
import { UserImage, UserImageBackground } from '../containers'
import { getImagesFromPersonalReferentialName } from '../utils/rating';

class RoomerCard extends Component 
{
    static propTypes= {
        targetUser:         PropTypes.object.isRequired,
        matchDetailApiDtos: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            avatarRadius: 0,
        }
    }

    changeRadius = (nativeEvent) => {
        this.setState({avatarRadius: nativeEvent.layout.width / 2 })
    }

    render() {

        return (
            <View style={ styles.card }>
                <View style={styles.cardTop} />
                <UserImage  
                    style={ [styles.avatar,{borderRadius: this.state.avatarRadius} ] } 
                    userId= { this.props.targetUser.userId }
                    onLayout={(event) => this.changeRadius(event.nativeEvent)}  />
                    
                <View style={ styles.cardTopInformation}>
                    <UserImageBackground
                        blurRadius={ 10 } 
                        style={styles.backgroundAvatar } 
                        userId= { this.props.targetUser.userId} >

                        <View style={{width:'100%', height:'100%', backgroundColor:'rgba(0,0,0,0.2)'}}>
                            <View style={{flex:1, alignItems:'flex-start', justifyContent: 'flex-end', flexDirection:  'row',}}>
                                <View style={{width:'25%', padding: 5, alignItems: 'flex-end'}}>
                                    <Text h2 style={styles.textWhite}>{ this.props.average } %</Text>
                                </View>
                            </View>
                            <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
                                <Text h1 style= {styles.textWhite}>{ this.props.targetUser.firstName } { this.props.targetUser.lastName }</Text>
                            </View>
                        </View>
                    </UserImageBackground>
                    <View style={styles.cardBottomTop} />
                </View>
                <View style={ styles.cardBottom }>
                    
                    <Text style={ styles.textDescription }>
                        { this.props.targetUser.description ? this.props.targetUser.description : "Cet utilisateur n'a pas encore remplis sa description, mais ses carectéristiques et ses localisations semblent correspondre avec les votres." }
                    </Text>

                    <View style={{ flexDirection: 'row', alignSelf: 'flex-start', justifyContent: 'space-around' , flexWrap: 'wrap' }} >
                        { this.props.matchDetailApiDtos.map((personality, index) => {
                            let images = getImagesFromPersonalReferentialName(personality.detailPersonalityApiDto.name);
                            return <RatingCondensed2 key={index} fractions={ 5 }  currentValue={ personality.value } activeComponent= { images.activeComponent } unactiveComponent={ images.unactiveComponent} />
                        })}



                        { /* this.props.characteristics.map((characteristic, index) => <RatingCondensed2 key={index} {...characteristic} />) */}
                    </View>
                </View>
            </View>
        );
    }
}

export default RoomerCard;    
    
const styles = StyleSheet.create({
    card: { 
        flex:           1,
        margin:         20,
        flexDirection:  'column',
        elevation:      2,
        alignItems:     'center',
    },

    avatar: { 
        width:          '44%',
        height:         undefined,
        aspectRatio:    1,
        zIndex:         2,
        borderWidth:    4,
        borderColor:    '#fff',
        flex:           1,
        position:       'absolute',
        top:            '0%',
        

    },
   cardTop: {
       flex:    12.5,
   },
    cardTopInformation: {
        flex:               25, 
        flexDirection:      'row',
        justifyContent:     'center',
        alignItems:         'center',
        zIndex:             1,
        borderWidth:        1,
        borderBottomWidth:  0,
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
        flex:               62.5,
        backgroundColor:    '#fff',
        borderWidth:        1,
        borderColor:        '#ccc',
        borderTopWidth:     0,
        justifyContent:     'space-between',
        padding:            8,
        width:              '100%',
    },
    cardBottomTop: {
        position:           'absolute',
        bottom:             -12,
        zIndex:             1000,
        backgroundColor:    '#fff',
        height:             20,
        width:              '100%',
        borderRadius:       10,
        borderWidth:        0,
    }
  });