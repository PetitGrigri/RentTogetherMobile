import React, { Component } from 'react';
import { View } from 'react-native';
import Text from '../Components/Text';
import TabContent from '../Components/TabContent';
import RoomerCard from '../Components/RoomerCard';
import SwipeCards from 'react-native-swipe-cards'
import { connect } from 'react-redux';
import { handleGetLocatairesPotentiels, handlePostMatchLocataire } from '../actions/matches'

class Roomers extends Component {

    handleYup = (card) => {
        console.log('Oui', card.matchId, card.targetUser.userId, 1);
        this.props.handlePostMatchValidation(card.matchId, card.targetUser.userId, 1)
        

    }

    handleNope = (card) => {
        console.log('Non', card.matchId, card.targetUser.userId, 2);
        this.props.handlePostMatchValidation(card.matchId, card.targetUser.userId, 2)
    }


    componentWillMount() {
        this.props.handleGetLocatairesPotentiels();
    }


    render() {
        return (
            <TabContent>
                <SwipeCards
                    cards={ this.props.locatairesPotentiels }
                    stack={false}
                    renderCard={(potentialRoomer) => <RoomerCard {...potentialRoomer} />}
                    renderNoMoreCards={() => <View style={{flex:1}}><Text>Terminé</Text></View>}
                    showYup={true}
                    showNope={true}
                    showMaybe={false}
                    yupText='Je te veux !'
                    nopeText='Mmmm non...'
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
