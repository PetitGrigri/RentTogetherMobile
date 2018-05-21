import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, Image } from 'react-native';
import Text from '../Components/Text';
import TabContent from '../Components/TabContent';
import PropTypes from 'prop-types';

class RoomerCard extends Component 
{
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
                <Image  
                    style={ [styles.avatar,{borderRadius: this.state.avatarRadius} ] } 
                    source={ this.props.image }
                    onLayout={(event) => this.changeRadius(event.nativeEvent)}    />

                <View style={ styles.cardTopInformation}>
                    <ImageBackground
                        blurRadius={ 10 } 
                        style={styles.backgroundAvatar } 
                        source={ this.props.image }>

                        <View style={{width:'100%', height:'100%', backgroundColor:'rgba(0,0,0,0.2)'}}>
                            <View style={{flex:1, alignItems:'flex-start', justifyContent: 'space-between', flexDirection:  'row',}}>
                                    <View style={{width:'25%', padding: 5}}>
                                    <Text h2 style={styles.textWhite}>{ this.props.age} ans</Text>
                                </View>
                                <View style={{width:'25%', padding: 5, alignItems: 'flex-end'}}>
                                    <Text h2 style={styles.textWhite}>{ this.props.pourcentage } %</Text>
                                </View>
                            </View>
                            <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
                                <Text h1 style= {styles.textWhite}>{ this.props.name }</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={ styles.cardBottom }>
                    <Text style={ styles.textDescription }>
                        { this.props.description }
                    </Text>

                    <Text>//TODO Caractéristiques</Text>
                </View>
            </View>
        );
    }
}

RoomerCard.propTypes = {
    age:            PropTypes.number.isRequired,
    description:    PropTypes.string.isRequired,
    name:           PropTypes.string.isRequired,
    pourcentage:    PropTypes.number.isRequired,
};

RoomerCard.defaultProps = {
    image: require("../assets/tests/troll.jpg"),
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
        justifyContent:     'flex-start',
        alignItems:         'flex-start',
    }
  });