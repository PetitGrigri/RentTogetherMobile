import React, { Component } from 'react';
import { 
    ImageBackground, 
    Text, 
    TouchableHighlight, 
    FlatList,
    TouchableOpacity,
    View,
    Image,
    SafeAreaView,
    StyleSheet,
} from 'react-native';
import { Font } from 'expo';
import TabContent from '../Components/TabContent';
import ConversationItem from '../Components/ConversationItem';

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

class Messages extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fontLoaded:false,
        }
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

    handlePress = () => {
        this.props.navigation.push('chat');
    }

    render() {
        return (
            this.state.fontLoaded 
              ? <TabContent>
                    <FlatList
                        data={listeConversations}
                        keyExtractor={item => `${item.id}`}
                        ItemSeparatorComponent={ () => <View style={{ height: 1, backgroundColor: '#ccc', marginLeft:20,marginRight:20 }} /> }
                        renderItem={(conversation) => <ConversationItem key={conversation.id} {...conversation} handlePress={ this.handlePress }/> }
                        refreshing={false}
                        onRefresh={() => console.log('refresh')}
                        onEndReached={() => console.log('loadNext') }
                   />
                </TabContent>
              : null
        );
    }
}

export default Messages;