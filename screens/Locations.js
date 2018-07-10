import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';
import Text from '../Components/Text';
import TabContent from '../Components/TabContent';
import LocationCard from '../Components/LocationCard';
import SwipeCards from 'react-native-swipe-cards'
import { connect } from 'react-redux';
import { handleGetAppartementsPotentiels } from '../actions/logements';
import { Entypo } from '@expo/vector-icons';

const {height, width} = Dimensions.get('window');



class Locations extends Component {

    handleYup = () => {
        console.log('Oui');
    }

    handleNope = () => {
        console.log('Non');
    }

    componentWillMount() {
        this.props.handleGetAppartementsPotentiels();
    }

    // Méthode utilisée pour le rendu 
    noMoreCard = () => {
        if (this.props.loadingGetAppartementsPotentiels) {
            return  <View style={ styles.containerNoMoreCards }>
                        <Text style={ styles.noMoreText }>Recherche de l'appartement idéal en cours...</Text>
                        <ActivityIndicator color='#ff8f00' size='large' />
                    </View>
        } else {
            return  <View style={ styles.containerNoMoreCards }>
                        <Text style={ styles.noMoreText }>Nous n'avons pas trouvé d'appartements vous correspondant</Text>
                        <Entypo name='emoji-sad' color='#ff8f00'  size={40}/>
                    </View>
        }   

    }

    // Quand il n'y a plus de locataires potentiels, on lance une nouvelle recherche
    cardRemoved = (index) => {
        if (index >= (this.props.appartementsPotentiels.length -1)) {
            this.props.handleGetAppartementsPotentiels();
        }
    }

    showMessages = (buildingId) => {
        //TODO
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
                    yupText='Je te veux !'
                    nopeText='Mmmm non...'
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
    handleGetAppartementsPotentiels:     () => dispatch(handleGetAppartementsPotentiels()),
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
    }
});