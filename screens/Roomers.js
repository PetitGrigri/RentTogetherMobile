import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, Image } from 'react-native';
import Text from '../Components/Text';
import TabContent from '../Components/TabContent';
import { Font } from 'expo';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fontLoaded:false,
            avatarRadius: 0,
        }
    }
    
    componentDidMount() {
        //chargement de la font open-sans
        Font.loadAsync({
            'open-sans-light': require('../assets/fonts/Open_Sans/OpenSans-Light.ttf'),
            'open-sans-regular': require('../assets/fonts/Open_Sans/OpenSans-Regular.ttf'),
        }).then(() => {
            this.setState({fontLoaded: true});
        });
    }
    changeRadius = (nativeEvent) => {
        this.setState({avatarRadius: nativeEvent.layout.width / 2 })
    }

    render() {

        return (
            <TabContent>
                <View style={ styles.card }>
                    <View style={styles.cardTop} />
                    <Image  
                        style={ [styles.avatar,{borderRadius: this.state.avatarRadius} ] } 
                        source={require('../assets/tests/deadpool.jpg')} 
                        onLayout={(event) => this.changeRadius(event.nativeEvent)}    />

                    <View style={ styles.cardTopInformation}>
                        <ImageBackground
                            blurRadius={ 10 } 
                            style={styles.backgroundAvatar } 
                            source={require('../assets/tests/deadpool.jpg')}>

                            <View style={{width:'100%', height:'100%', backgroundColor:'rgba(0,0,0,0.2)'}}>
                                <View style={{flex:1, alignItems:'flex-start', justifyContent: 'space-between', flexDirection:  'row',}}>
                                        <View style={{width:'25%', padding: 5}}>
                                        <Text h2 style={styles.textWhite}>34 ans</Text>
                                    </View>
                                    <View style={{width:'25%', padding: 5, alignItems: 'flex-end'}}>
                                        <Text h2 style={styles.textWhite}>87%</Text>
                                    </View>
                                </View>
                                <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
                                    <Text h1 style= {styles.textWhite}>DEAD POOL</Text>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={ styles.cardBottom }>
                        <Text style={ styles.textDescription }>
                            Deadpool est un psychopathe et un mégalomane, complètement imprévisible et très arrogant. Il est également capable d'une grande cruauté physique et mentale. Pendant un temps, il n'hésita pas à séquestrer une vieille aveugle dans sa maison, Al, pour qu'elle lui serve d'esclave, de confidente, d'oreille attentive (et inoffensive) à ses tourments, ainsi qu'à son goût pour les blagues douteuses.
                        </Text>

                        <Text>//TODO Caractéristiques</Text>
                    </View>
                </View>
            </TabContent>
        );
    }
}

export default Home;




const styles = StyleSheet.create({
    card: { 
        flex:           1,
        margin:         20,
        flexDirection:  'column',
        elevation:          2,
        alignItems:         'center',
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
        top:'0%',
        

    },
    /*
        avatar: { 
        aspectRatio:    1,
        zIndex:         100,
        borderWidth:    4,
        borderColor:    '#fff',

        position:       'absolute',
        left:'50%',
        width:'25%',
        height: undefined,

        aspectRatio:1,
        top:0,
        left:0,

    },
    */
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

    /*
        cardTopDescription: {
        justifyContent:     'center',
        alignItems:         'center',
        flex:               1,
    },

    cardTopDescriptionTitle: {
        color:              '#fff',
        fontFamily:         'open-sans-light', 
        fontSize:           30,
    },
    cardTopInfosElement: {
        borderWidth:        1,
        flex:               1,

    },
    cardTopInfosElement: {
        color:              '#fff',
        fontFamily:         'open-sans-light', 
        fontSize:           30,
    },*/
    cardBottom: {
        flex:               62.5,
        
        backgroundColor:    '#fff',
        borderWidth:        1,
        borderColor:        '#ccc',
        borderTopWidth: 0,
        justifyContent:     'flex-start',
        alignItems:         'flex-start',
    }
  });