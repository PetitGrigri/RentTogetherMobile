import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';
import Text from '../Components/Text';
import TabContent from '../Components/TabContent';
import LocationCard from '../Components/LocationCard';
import SwipeCards from 'react-native-swipe-cards'
import { connect } from 'react-redux';
import { handleGetAppartementsPotentiels, handleBuildingSeen, handleBuildingFavorite } from '../actions/logements';
import { LinearGradient } from 'expo';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import NoMoreCard from '../Components/NoMoreCard';

const {height, width} = Dimensions.get('window');



class Locations extends Component {

    handleYup = (card) => {
        //this.props.handlePostMatchLocataire(card.buildin, card.targetUser.userId, 1)
        this.props.handleBuildingFavorite(card.buildingId);
    }

    handleNope = (card) => {
        console.log(card);
        this.props.handleBuildingSeen(card.buildingId);
    }


    componentWillMount() {
        this.props.handleGetAppartementsPotentiels();
    }


    // Méthode utilisée pour le rendu 
    noMoreCard = () => {
        return <NoMoreCard 
            loading={ this.props.loadingGetAppartementsPotentiels } 
            loadingText="Chargement de logements interessants en cours..."
            nothingText="Nous n'avons pas trouvé d'appartements vous correspondant" />

    }

    // Quand il n'y a plus de locataires potentiels, on lance une nouvelle recherche
    cardRemoved = (index) => {
        if (index >= (this.props.appartementsPotentiels.length -1)) {
            this.props.handleGetAppartementsPotentiels();
        }
    }

    showMessages = (buildingId) => {
        let location = this.props.appartementsPotentiels.filter(location => location.buildingId == buildingId)[0];
        console.log('todo', buildingId, location);

        this.props.navigation.navigate('messagesLogements', {
            title:      location.title, 
            owner:      location.ownerApiDto,
            buildingId: location.buildingId
        })
    }

    render() {
        return (
            <TabContent>
                <SwipeCards
                    renderNoMoreCards={() => this.noMoreCard() }
                    cards={ this.props.appartementsPotentiels }
                    stack={false}
                    renderCard={(appartement) => <LocationCard {...appartement} handleShowMessages={ (buildingId) => this.showMessages(buildingId) }/>}
                    showYup={true}
                    showNope={true}
                    showMaybe={false}
                    yupView={   <LinearGradient colors={['rgba(255,200,0,1)', 'rgba(255,200,0,0)']} style={ styles.yupNopeView} start={[1, 0]} end={[0, 0]}>
                                    <MaterialIcons name='favorite-border' color='#fff'  size={40}/> 
                                    <Text style={styles.whiteText} >Ca me plait !</Text>
                                </LinearGradient> }
                    noView={   <LinearGradient colors={['rgba(198,40,40,1)', 'rgba(198,40,40, 0)']} style={ styles.yupNopeView } start={[0, 0]} end={[1, 0]}>
                                    <Entypo name='emoji-neutral' color='#fff'  size={40}/> 
                                    <Text style={styles.whiteText} >Plus tard peut être</Text>
                                </LinearGradient> }
                    yupStyle={styles.yupContainer}
                    nopeStyle={styles.nopeContainer}
                    handleYup={this.handleYup}
                    handleNope={this.handleNope}
                    dragY={false}
                    cardRemoved={ this.cardRemoved }
                    onClickHandler={()=>{}}
                /> 
            </TabContent>
        )
    }
}

const mapStateToProps = state => ({
    loadingGetAppartementsPotentiels :  state.logements.loadingGetAppartementsPotentiels,
    appartementsPotentiels:             state.logements.appartementsPotentiels,
    message_error:                      state.logements.message_error
});

const mapDispatchToProps = dispatch => ({
    handleGetAppartementsPotentiels:    () => dispatch(handleGetAppartementsPotentiels()),
    handleBuildingSeen:                 (buildingId) => dispatch(handleBuildingSeen(buildingId)),
    handleBuildingFavorite:             (buildingId) => dispatch(handleBuildingFavorite(buildingId)),
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Locations);


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
    },
    whiteText:{
        color:          '#fff',
        fontFamily:     'open-sans-regular', 
        fontSize :      12,
        padding:        4,
        textAlign:      'center'
    }, 
});