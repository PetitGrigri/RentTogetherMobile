import React, { Component } from 'react';
import { View, StyleSheet,FlatList } from 'react-native';
import ConversationItem from '../Components/ConversationItem';
import { Font } from 'expo';
import TabContent from '../Components/TabContent';

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