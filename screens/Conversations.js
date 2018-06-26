import React, { Component } from 'react';
import { 
    FlatList,
    View,
} from 'react-native';
import TabContent from '../Components/TabContent';
import ConversationItem from '../Components/ConversationItem';
import { connect } from 'react-redux';
import { handleGetConversations } from '../actions/conversations';

const listeConversations = [
    {
    id: 107,
    users:
    [
        {
            id: 2,
            firstName: "Tony",
            lastName: "Stark",
            photoUrl: ""
        },
    ],
    lastMessage: "Salut Fabien, je me disais qu'une armure te serais très utile",
    dateTimeLastMessage: "2018-05-17T21:35:32.5268506+00:00"
}, 
{
    id: 57,
    users:
    [
        {
            id: 2,
            firstName: "Jack",
            lastName: "Sparrow",
            photoUrl: "",
        },
    ],
    lastMessage: "Why the rhum is gone ? ",
    dateTimeLastMessage: "2018-05-13T22:02:12.5268506+00:00"
}, 
{
    id: 32,
    users:
    [
        {
            id: 2,
            firstName: "Charles",
            lastName: "Xavier",
            photoUrl: "",
        },
    ],
    lastMessage: "Je suis à la recherche d'un ami, il s'appelle Logan, l'aurais tu vu ? ",
    dateTimeLastMessage: "2018-05-13T22:02:12.5268506+00:00"
}, 
{
    id: 33,
    users:
    [
        {
            id: 2,
            firstName: "Charles",
            lastName: "Xavier",
            photoUrl: "",
        },
    ],
    lastMessage: "Je suis à la recherche d'un ami, il s'appelle Logan, l'aurais tu vu ? ",
    dateTimeLastMessage: "2018-05-13T22:02:12.5268506+00:00"
}, 
{
    id: 34,
    users:
    [
        {
            id: 2,
            firstName: "Charles",
            lastName: "Xavier",
            photoUrl: "",
        },
    ],
    lastMessage: "Je suis à la recherche d'un ami, il s'appelle Logan, l'aurais tu vu ? ",
    dateTimeLastMessage: "2018-05-13T22:02:12.5268506+00:00"
}, 
{
    id: 35,
    users:
    [
        {
            id: 2,
            firstName: "Charles",
            lastName: "Xavier",
            photoUrl: "",
        },
    ],
    lastMessage: "Je suis à la recherche d'un ami, il s'appelle Logan, l'aurais tu vu ? ",
    dateTimeLastMessage: "2018-05-13T22:02:12.5268506+00:00"
}, 
{
    id: 36,
    users:
    [
        {
            id: 2,
            firstName: "Charles",
            lastName: "Xavier",
            photoUrl: "",
        },
    ],
    lastMessage: "Je suis à la recherche d'un ami, il s'appelle Logan, l'aurais tu vu ? ",
    dateTimeLastMessage: "2018-05-13T22:02:12.5268506+00:00"
}, 
{
    id: 37,
    users:
    [
        {
            id: 2,
            firstName: "Charles",
            lastName: "Xavier",
            photoUrl: "",
        },
    ],
    lastMessage: "Je suis à la recherche d'un ami, il s'appelle Logan, l'aurais tu vu ? ",
    dateTimeLastMessage: "2018-05-13T22:02:12.5268506+00:00"
}, 
{
    id: 38,
    users:
    [
        {
            id: 2,
            firstName: "Charles",
            lastName: "Xavier",
            photoUrl: "",
        },
    ],
    lastMessage: "Je suis à la recherche d'un ami, il s'appelle Logan, l'aurais tu vu ? ",
    dateTimeLastMessage: "2018-05-13T22:02:12.5268506+00:00"
}, 
{
    id: 39,
    users:
    [
        {
            id: 2,
            firstName: "Charles",
            lastName: "Xavier",
            photoUrl: "",
        },
    ],
    lastMessage: "Je suis à la recherche d'un ami, il s'appelle Logan, l'aurais tu vu ? ",
    dateTimeLastMessage: "2018-05-13T22:02:12.5268506+00:00"
}, 
{
    id: 40,
    users:
    [
        {
            id: 2,
            firstName: "Charles",
            lastName: "Xavier",
            photoUrl: "",
        },
    ],
    lastMessage: "Je suis à la recherche d'un ami, il s'appelle Logan, l'aurais tu vu ? ",
    dateTimeLastMessage: "2018-05-13T22:02:12.5268506+00:00"
}, 
{
    id: 41,
    users:
    [
        {
            id: 2,
            firstName: "Charles",
            lastName: "Xavier",
            photoUrl: "",
        },
    ],
    lastMessage: "Je suis à la recherche d'un ami, il s'appelle Logan, l'aurais tu vu ? ",
    dateTimeLastMessage: "2018-05-13T22:02:12.5268506+00:00"
}, 
{
    id:42,
    users:
    [
        {
            id: 2,
            firstName: "Charles",
            lastName: "Xavier",
            photoUrl: "",
        },
    ],
    lastMessage: "Je suis à la recherche d'un ami, il s'appelle Logan, l'aurais tu vu ? ",
    dateTimeLastMessage: "2018-05-13T22:02:12.5268506+00:00"
}
];

class Conversations extends Component {

    constructor(props) {
        super(props)
    }
    
    handlePress = () => {
        this.props.navigation.push('chat');
    }

    componentDidMount = () => {
        this.props.handleGetConversations({});
    };
    
    getConversationItem = (conversation) => {


        return <ConversationItem {...conversation.item} handlePress={ this.handlePress }/>
    }
    render() {
        return (
            <TabContent>
                <FlatList
                    data={this.props.conversations}
                    keyExtractor={item => `${item.conversationId}`}
                    ItemSeparatorComponent={ () => <View style={{ height: 1, backgroundColor: '#ccc', marginLeft:20,marginRight:20 }} /> }
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
});

const mapDispatchToProps = dispatch => ({
    handleGetConversations:     (filter) => dispatch(handleGetConversations(filter)),
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Conversations);
