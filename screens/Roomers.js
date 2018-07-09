import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, ActivityIndicator } from 'react-native';
import TabContent from '../Components/TabContent';
import RoomerCard from '../Components/RoomerCard';
import SwipeCards from 'react-native-swipe-cards'
import { connect } from 'react-redux';
import { handleGetLocatairesPotentiels, handlePostMatchLocataire } from '../actions/matches'
import { LinearGradient } from 'expo';
import { Entypo } from '@expo/vector-icons';

const {height, width} = Dimensions.get('window');

class Roomers extends Component {

    handleYup = (card) => {
        console.log('Oui', card.matchId, card.targetUser.userId, 1);
        this.props.handlePostMatchLocataire(card.matchId, card.targetUser.userId, 1)

    }

    handleNope = (card) => {
        console.log('Non', card.matchId, card.targetUser.userId, 2);
        this.props.handlePostMatchLocataire(card.matchId, card.targetUser.userId, 2)
    }

    componentWillMount() {
        this.props.handleGetLocatairesPotentiels();
    }

    // Quand il n'y a plus de locataires potentiels, on lance une nouvelle recherche
    cardRemoved = (index) => {
        if (index >= (this.props.locatairesPotentiels.length -1)) {
            this.props.handleGetLocatairesPotentiels();
        }
    }

    // Méthode utilisée pour le rendu 
    noMoreCard = () => {
        if (this.props.loadingGetLocatairesPotentiels) {
            return  <View style={ styles.containerNoMoreCards }>
                        <Text style={ styles.noMoreText }>Recherche de nouveaux locataires en cours...</Text>
                        <ActivityIndicator color='#ff8f00' size='large' />
                    </View>
       } else {
            return  <View style={ styles.containerNoMoreCards }>
                        <Text style={ styles.noMoreText }>Nous n'avons pas trouvé de locataires vous correspondant</Text>
                        <Entypo name='emoji-sad' color='#ff8f00'  size={40}/>
                    </View>
        }   

    }

    render() {
        return (
            <TabContent>
                <SwipeCards
                    cards={ this.props.locatairesPotentiels }
                    stack={false}
                    renderCard={(potentialRoomer) => <RoomerCard {...potentialRoomer} />}
                    renderNoMoreCards={() => this.noMoreCard() }
                    showYup={true}
                    showNope={true}
                    showMaybe={false}
                    cardRemoved={ this.cardRemoved }
                    yupView={   <LinearGradient colors={['rgba(0,230,118,1)', 'rgba(0,230,118,0)']} style={ styles.yupNopeView} start={[1, 0]} end={[0, 0]}>
                                    <Entypo name='emoji-happy' color='#fff'  size={40}/> 
                                    <Text style={styles.whiteText} >Je te veux</Text>
                                </LinearGradient> }
                    noView={   <LinearGradient colors={['rgba(198,40,40,1)', 'rgba(198,40,40, 0)']} style={ styles.yupNopeView } start={[0, 0]} end={[1, 0]}>
                                    <Entypo name='emoji-sad' color='#fff'  size={40}/> 
                                    <Text style={styles.whiteText} >Plus tard peut être</Text>
                                </LinearGradient> }

                    yupStyle={styles.yupContainer}
                    nopeStyle={styles.nopeContainer}
                    handleYup={this.handleYup}
                    handleNope={this.handleNope}
                    dragY={false}
                    onClickHandler={()=>{}}
                /> 
            </TabContent>
        )
    }
}

const mapStateToProps = state => ({
    loadingGetLocatairesPotentiels :    state.matches.loadingGetLocatairesPotentiels,
    locatairesPotentiels:               state.matches.locatairesPotentiels,
    message_error:                      state.matches.message_error,
    loadingPostLocatairesPotentiels:    state.matches.loadingPostLocatairesPotentiels,
});

const mapDispatchToProps = dispatch => ({
    handleGetLocatairesPotentiels:     (filter) => dispatch(handleGetLocatairesPotentiels(filter)),
    handlePostMatchLocataire:         (matchId, targetUserId, statusValidation) => dispatch(handlePostMatchLocataire(matchId, targetUserId, statusValidation)),
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Roomers);


const styles = StyleSheet.create({
    yupContainer: {
        borderWidth:    0,
        height:         height*2,
        margin:         0,
        padding:        0,
        width:          (width * 0.4),
        position:       'absolute',
        top:            -0.5 * height,
        bottom:         -0.5 * height,
        right:          -0.2 * width,
        paddingRight:   0.2 * width,
    },
    nopeContainer: {
        borderWidth:    0,
        height:         height*2,
        margin:         0,
        padding:        0,
        width:          (width * 0.4),
        position:       'absolute',
        top:            -0.5 * height,
        bottom:         -0.5 * height,
        left:          -0.2 * width,
        paddingLeft:   0.2 * width,
    },
    yupNopeView: {
        flex:           1,
        justifyContent: 'center',
        alignItems:     'center',
    },
    whiteText:{
        color:          '#fff',
        fontFamily:     'open-sans-regular', 
        fontSize :      12,
        padding:        4,
        textAlign:      'center'
    }, 
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