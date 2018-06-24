import React, { Component } from 'react';
import { View, StyleSheet,FlatList, Text } from 'react-native';
import RoomerMatchesItem from '../Components/RoomerMatchesItem';

const matchesRoomers = [{
    id: 1,
    user: {
        firstName: "Thomasine ",
        lastName: "Chinn",
    }
}, 
{
    id: 6,
    user: {
        firstName: "Marlene",
        lastName: "Faz",
    }
}, 
{
    id: 9,
    user: {
        firstName: "Amal ",
        lastName: "Bohland",
    }
}, 
{
    id: 12,
    user: {
        firstName: "Mindy",
        lastName: "Hasan",
    }
}, 
{
    id: 10,
    user: {
        firstName: "Jean ",
        lastName: "Eichman",
    }
}, 
{
    id: 17,
    user: {
        firstName: "Clarice",
        lastName: "Silveira",
    }
}, 
{
    id: 20,
    user: {
        firstName: "Isela",
        lastName: "Tutor",
    }
}, 
{
    id: 37,
    user: {
        firstName: "David",
        lastName: "Marrufo",
    }
}, 
{
    id: 60,
    user: {
        firstName: "Arminda",
        lastName: "Stainback",
    }
}, 
{
    id: 89,
    user: {
        firstName: "Beatrice",
        lastName: "Noack",
    }
}, 
{
    id: 99,
    user: {
        firstName: "Jermaine",
        lastName: "Lavoie",
    }
}, 
{
    id: 101,
    user: {
        firstName: "Lina",
        lastName: "Risley",
    }
}, 
{
    id: 103,
    user: {
        firstName: "Laila",
        lastName: "Vert",
    }
}];

class MatchesRoomers extends Component {


    componentDidMount() {

    }

    getData = () =>{
        let matchesRoomersCards = matchesRoomers
        let lastRowItemsCount = matchesRoomers.length % 2;

        if (lastRowItemsCount < 2) {
            matchesRoomersCards.push({ 
                id:     'empty',
                isEmpty:  true
            })
        }

        return matchesRoomersCards;
        
    }

    handlePress = () => {
        console.log('handlePress');
    }

    render() {
        let roomersCards    = this.getData();
        let handlePress     = this.handlePress;
        return (
            <FlatList
                data={ roomersCards }
                keyExtractor={item => `${item.id}`}
                renderItem={(roomerCard) => (roomerCard.item.isEmpty === true) ? <View style={styles.emptyContainer} /> : <RoomerMatchesItem {...roomerCard.item} handlePress={ handlePress }/> } 
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

export default MatchesRoomers;