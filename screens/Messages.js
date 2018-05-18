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

import TabContent from '../Components/TabContent';
import * as datesUtils from '../utils/dates';

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
    }, 
]

const Conversation = props => {
    
    
    let {id, lastMessage, dateTimeLastMessage, users} = props.item

    

    return (
        <TouchableOpacity onPress={props.handlePress}>
            <View style={ styles.row }>
                <Image style={ styles.avatar } source={require('../assets/proprietaire.png')}  />
                <View style={styles.right}>
                    <View style={styles.rightTop}>
                        <Text style={ styles.users }>
                            Test toto
                        </Text>
                        <Text style={ styles.date }>
                            {datesUtils.toString(dateTimeLastMessage)}
                        </Text>
                    </View>
                    <Text style={ styles.secondaryText } numberOfLines={2}>{lastMessage}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}


class Messages extends Component {

    handlePress = () => {
        console.log('test');
        this.props.navigation.push('chat');
    }

    render() {
        return (
            <TabContent>
                <FlatList
                    data={listeConversations}
                    keyExtractor={item => `${item.id}`}
                    ItemSeparatorComponent={ () => <View style={{ height: 1, backgroundColor: '#ccc', marginLeft:20,marginRight:20 }} /> }
                    renderItem={(conversation) => <Conversation key={conversation.id} {...conversation} handlePress={ this.handlePress }/> }
                />
            </TabContent>
        );
    }
}

export default Messages;


const styles = StyleSheet.create({
    row: { 
        flexDirection: "row", 
        alignItems: "center", 
        padding: 8 ,
        flex:1
    },
    avatar: { 
        width: 50, 
        height: 50, 
        borderRadius: 25, 
        marginRight: 8 
    },
    right: {
        marginRight: 8, 
        flex:1 
    },
    rightTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex:1,
    },
    users: {
        fontWeight: "bold",
        fontSize: 14,
        color: '#000',
        marginBottom: 4
    },
    date: {
        fontSize: 13,
        color: '#666',
        marginBottom: 4
    },
    secondaryText: { 
        color: '#666',
        fontSize: 12,
    }
  });