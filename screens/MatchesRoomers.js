/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */
import React, { Component } from 'react';
import { View, StyleSheet,FlatList } from 'react-native';
import RoomerMatchesItem from '../Components/RoomerMatchesItem';
import { handlePostConversation } from '../actions/conversations';
import { connect } from 'react-redux';
import { empty } from '../utils/check';
import { generateTitleConversation } from '../utils/conversations';
import { handleGetLocatairesValides } from '../actions/matches';


class MatchesRoomers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userIdConversationInProgress: null,
        };
    }
    componentWillMount() {
        this.props.handleGetLocatairesValides();
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.loadingPostConversations && !this.props.loadingPostConversations && empty(this.props.message_error)) {

            this.setState({
                userIdConversationInProgress: null
            });

            let title = generateTitleConversation(this.props.createdConversation, this.props.currentUser);


            this.props.navigation.navigate('messages', {
                conversation:       this.props.createdConversation,
                title:              title
            });


        } else if (prevProps.loadingPostConversations && !this.props.loadingPostConversations && !empty(this.props.message_error)) {
            this.setState({
                userIdConversationInProgress: null
            });
        }
    }


    getData = () =>{
        let matchesRoomersCards = this.props.locatairesValides.map(match => {
            return {
                id: match.matchId,
                user: match.targetUser
            }
        });
        let lastRowItemsCount = matchesRoomersCards.length % 2;


        if (lastRowItemsCount == 1) {
            matchesRoomersCards.push({ 
                id:     'empty',
                isEmpty:  true
            })
        }

        return matchesRoomersCards;
        
    }

    handleCreateConversation = (userId) => {
        this.setState({
            userIdConversationInProgress: userId,
        })

        this.props.handlePostConversation([this.props.currentUser.userId, userId])
    }

    handleShowMatchProfile = (userId) => {
        let match = this.props.locatairesValides.filter(match => match.targetUser.userId == userId )[0];

        this.props.navigation.navigate('roomerProfile', {
            match: match
        });
    }

    handleRefresh = () => {
        this.props.handleGetLocatairesValides();
    }
    getMatcheItem = (matche) => {
        return (matche.item.isEmpty === true) 
            ? <View style={styles.emptyContainer} /> 
            : <RoomerMatchesItem 
                key={ matche.item.id } {...matche.item} 
                handleCreateConversation={ this.handleCreateConversation } 
                handleShowProfile= { this.handleShowMatchProfile }
                loadingCreateConversation={ matche.item.user.userId == this.state.userIdConversationInProgress }
                />
    }


    render() {
        return (
            <FlatList
                refreshing={ this.props.loadingGetLocatairesValides }
                onRefresh={() => this.handleRefresh() }
                data={ this.getData() }
                keyExtractor={item => `${item.id}`}
                renderItem={ (matche) => this.getMatcheItem(matche) } 
                numColumns={ 2 }
                style={styles.container}

            />
        );
    }
}

const styles = StyleSheet.create({
    emptyContainer: {
        flex:       1,
        margin:     16,
    },
})


const mapStateToProps = state => ({
    loadingPostConversations :      state.conversations.loadingPostConversations, 
    currentUser:                    state.connection.user,
    message_error:                  state.conversations.message,
    createdConversation:            state.conversations.createdConversation,
    loadingGetLocatairesValides:    state.matches.loadingGetLocatairesValides,
    locatairesValides:              state.matches.locatairesValides,

});

const mapDispatchToProps = dispatch => ({
    handlePostConversation:     (participantsId) => dispatch(handlePostConversation(participantsId)),
    handleGetLocatairesValides: (filter={}) => dispatch(handleGetLocatairesValides(filter))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MatchesRoomers);
