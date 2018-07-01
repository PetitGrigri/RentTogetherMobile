import React, { Component } from 'react';
import { View } from 'react-native';
import Text from '../Components/Text';
import TabContent from '../Components/TabContent';
import RoomerCard from '../Components/RoomerCard';
import SwipeCards from 'react-native-swipe-cards'
import { Foundation, MaterialCommunityIcons} from '@expo/vector-icons';
import { connect } from 'react-redux';
import { handleGetLocatairesPotentiels } from '../actions/matches'

class Roomers extends Component {

    handleYup = () => {
        console.log('Oui');
    }

    handleNope = () => {
        console.log('Non');
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
});

const mapDispatchToProps = dispatch => ({
    handleGetLocatairesPotentiels:     (filter) => dispatch(handleGetLocatairesPotentiels(filter)),
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Roomers);
