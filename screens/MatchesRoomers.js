import React, { Component } from 'react';
import { View, StyleSheet,FlatList, Text } from 'react-native';
import RoomerMatchesItem from '../Components/RoomerMatchesItem';
import { handlePostConversation } from '../actions/conversations';
import { connect } from 'react-redux';
import { empty } from '../utils/check';

const matchesRoomers = [{
    id: 1,
    user: {
        userId:     28,
        firstName:  "Test",
        lastName:   "Un",
    }
}, 
{
    id: 3,
    user: {
        userId:     29,
        firstName:  "Test",
        lastName:   "Deux",
    }
}, 
{
    id: 5,
    user: {
        userId:     30,
        firstName:  "Test",
        lastName:   "Trois",
    }
}, 
{
    id: 10,
    user: {
        userId:     31,
        firstName:  "Test",
        lastName:   "Quatre",
    }
}, 
{
    id: 18,
    user: {
        userId:     32,
        firstName:  "Test",
        lastName:   "Cinq",
    }
}, 
{
    id: 17,
    user: {
        userId:     33,
        firstName:  "Test",
        lastName:   "Six",
    }
}];

class MatchesRoomers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userIdConversationInProgress: null,
        };
    }
    componentDidMount() {

    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.loadingPostConversations && !this.props.loadingPostConversations && empty(this.props.message_error)) {
            this.setState({
                userIdConversationInProgress: null
            });
        } else if (prevProps.loadingPostConversations && !this.props.loadingPostConversations && !empty(this.props.message_error)) {
            this.setState({
                userIdConversationInProgress: null
            });
        }
    }


    getData = () =>{
        let matchesRoomersCards = matchesRoomers;
        let lastRowItemsCount = matchesRoomers.length % 2;


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

    getMatcheItem = (matche) => {
        return (matche.item.isEmpty === true) 
            ? <View style={styles.emptyContainer} /> 
            : <RoomerMatchesItem 
                key={ matche.item.id } {...matche.item} 
                handleCreateConversation={ this.handleCreateConversation } 
                loadingCreateConversation={ matche.item.user.userId == this.state.userIdConversationInProgress }
                />
    }

    render() {
        let roomersCards    = this.getData();

        return (
            <FlatList
                data={ roomersCards }
                keyExtractor={item => `${item.id}`}
                renderItem={ (matche) => this.getMatcheItem(matche) } 
                refreshing={false}
                onRefresh={() => console.log('refresh')}
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
    loadingPostConversations :  state.conversations.loadingPostConversations, 
    currentUser:                state.connection.user,
    message_error:              state.conversations.message,
});

const mapDispatchToProps = dispatch => ({
    handlePostConversation:     (participantsId) => dispatch(handlePostConversation(participantsId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MatchesRoomers);
