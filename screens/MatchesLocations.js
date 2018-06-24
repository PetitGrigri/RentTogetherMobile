import React, { Component } from 'react';
import { View, StyleSheet,FlatList } from 'react-native';
import ConversationItem from '../Components/ConversationItem';

const listeConversations = [{
    id: 107,
    users:
    [
        {
            id: 2,
            firstName: "T4",
            lastName: "",
            photoUrl: ""
        },
    ],
    lastMessage: "Super Appartement",
    dateTimeLastMessage: "2018-05-17T21:35:32.5268506+00:00"
}];


class MatchesLocations extends Component {

    handlePress() {
        console.log('press');
    }

    render() {
        return (
            <FlatList
                data={listeConversations}
                keyExtractor={item => `${item.id}`}
                ItemSeparatorComponent={ () => <View style={{ height: 1, backgroundColor: '#ccc', marginLeft:20,marginRight:20 }} /> }
                renderItem={(conversation) => <ConversationItem key={conversation.id} {...conversation} handlePress={ this.handlePress }/> }
                refreshing={false}
                onRefresh={() => console.log('refresh')}
                onEndReached={() => console.log('loadNext') }
            />

        );
    }
}

//TODO
const styles = StyleSheet.create({
    container: {
        flex:   1,
    },
    segmentedView: {
        padding: 8 ,
    }
})

export default MatchesLocations;