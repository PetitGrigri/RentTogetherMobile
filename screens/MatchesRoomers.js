import React, { Component } from 'react';
import { View, StyleSheet,FlatList } from 'react-native';
import ConversationItem from '../Components/ConversationItem';
import { Font } from 'expo';
import { Header } from 'react-navigation';
import TabContent from '../Components/TabContent';

const listeConversations = [{
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
}];

class MatchesRoomers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fontLoaded:false,
        }
    }
    handlePress() {
        console.log('press');
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
    render() {
        return (
            this.state.fontLoaded 
              ? <FlatList
                        data={listeConversations}
                        keyExtractor={item => `${item.id}`}
                        ItemSeparatorComponent={ () => <View style={{ height: 1, backgroundColor: '#ccc', marginLeft:20,marginRight:20 }} /> }
                        renderItem={(conversation) => <ConversationItem key={conversation.id} {...conversation} handlePress={ this.handlePress }/> }
                        refreshing={false}
                        onRefresh={() => console.log('refresh')}
                        onEndReached={() => console.log('loadNext') }
                />
              : null
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:   1,
    },
    segmentedView: {
        padding: 8 ,
    }
})

export default MatchesRoomers;