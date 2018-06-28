import React, { Component } from 'react';
import { 
    FlatList,
    View,
    StyleSheet,
} from 'react-native';
import TabContent from '../Components/TabContent';
import ConversationItem from '../containers/ConversationItem';
import { connect } from 'react-redux';
import { handleGetConversations } from '../actions/conversations';


class Conversations extends Component {

    constructor(props) {
        super(props)
    }
    
    handlePress = (conversationId, title) => {
        this.props.navigation.navigate('messages', {
            conversation:       this.props.conversations.filter(conversation => conversation.conversationId === conversationId)[0],
            title:              title
        });
    }

    componentDidMount = () => {
        this.props.handleGetConversations();
    };
    
    getConversationItem = (conversation) => {

        // Filtrage des participants (on ne veut que les participants différent de l'utilisateur connecté)
        let title =  conversation.item.participants
                        .filter((participant) =>  this.props.currentUser.userId != participant.userApiDto.userId )
                        .map(participant => participant.userApiDto)
                        .reduce((accumulator, participant) => { 
                            let virgule = accumulator.length > 0 ? ', ' : '';
                            return accumulator + virgule + `${participant.firstName} ${participant.lastName}`;
                        } , '');

        return <ConversationItem {...conversation.item} handlePress={ this.handlePress } title={ title }/>
    }

    render() {
        return (
            <TabContent>
                <FlatList
                    data={this.props.conversations}
                    keyExtractor={item => `${item.conversationId}`}
                    ItemSeparatorComponent={ () => <View style={ styles.separator } /> }
                    renderItem={(conversation) =>  this.getConversationItem(conversation)}
                    refreshing={false}
                    onRefresh={() => console.log('refresh')}
                    onEndReached={() => console.log('loadNext') }
                    refreshing={this.props.loadingConversations}
                />
            </TabContent>
        );
    }
}

const mapStateToProps = state => ({
    loadingConversations :  state.conversations.loadingConversations, 
    conversations:          state.conversations.conversations, 
    usersConversations:     state.conversations.usersConversations, 
    message:                state.conversations.message, //message d'erreur
    currentUser:            state.connection.user,
});

const mapDispatchToProps = dispatch => ({
    handleGetConversations:     (filter) => dispatch(handleGetConversations(filter)),
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Conversations);


const styles = StyleSheet.create({
    separator: {
        height:             1, 
        backgroundColor:    '#ccc', 
        marginLeft:         20,
        marginRight:        20
    }
})