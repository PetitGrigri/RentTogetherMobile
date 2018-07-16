/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */
import React, { Component } from 'react';
import { StyleSheet,FlatList, Alert } from 'react-native';
import LocationItem from '../Components/LocationItem';
import { handlePostConversation } from '../actions/conversations';
import { connect } from 'react-redux';
import { empty } from '../utils/check';
import { handleGetFavoriteLocations } from '../actions/logements';
import { generateTitleConversation } from '../utils/conversations';
import NoMoreFlatList from '../Components/NoMoreFlatList';

class MatchLocations extends Component {

    componentWillMount() {
        this.props.handleGetFavoriteLocations();
    }


    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.loadingPostConversations && !this.props.loadingPostConversations && empty(this.props.conversations_messages_error)) {

            let title = generateTitleConversation(this.props.createdConversation, this.props.currentUser);


            this.props.navigation.navigate('messages', {
                conversation:       this.props.createdConversation,
                title:              title
            });


        } else if (prevProps.loadingPostConversations && !this.props.loadingPostConversations && !empty(this.props.conversations_messages_error)) {

            Alert.alert(
                'Erreur',
                this.props.conversations_messages_error,
                [
                    {text: 'OK'},
                ],
                { cancelable: true }
            )

        }
    }

    handleRefresh = () => {
        this.props.handleGetFavoriteLocations();
    }

    //TODO Factoriser copié coller de ownerProperties.js
    showMessages = (item) => {
        this.props.navigation.navigate('messagesLogements', {
            title:      item.title, 
            owner:      item.ownerApiDto,
            buildingId: item.buildingId
        })
    }

    handleShowLocation= (item) => {

        this.props.navigation.navigate('locationDetails', {
            location:       item, 
            showMessages :  () => this.showMessages(item),
        });
    }

    handleCreateConversation = (userId) => {
        this.props.handlePostConversation([this.props.currentUser.userId, userId])
    }

    getFavoriteLocationItem = (favoriteLocation) => {
        return <LocationItem 
            {...favoriteLocation.item} 
            showMessages = { () => this.showMessages(favoriteLocation.item) }
            handleShowLocation= { () => this.handleShowLocation(favoriteLocation.item) }

            handleCreateConversation={ () => this.handleCreateConversation(favoriteLocation.item.ownerApiDto.userId) } 
            loadingCreateConversation={ this.props.loadingPostConversations }
            />
        

    }


    render() {
        let haveContent = !empty(this.props.appartementsFavoris);

        if (this.props.loadingGetAppartementsFavoris || (!haveContent)) {
            return (
                <NoMoreFlatList 
                    loading={ this.props.loadingGetAppartementsFavoris }
                    haveContent={haveContent}
                    loadingText="Chargement de vos appartements favoris en cours..."
                    nothingText="Vous n'avez pas encore d'appartements favoris" 
                    searchAgainAction={ this.handleRefresh }
                />
            );
        } else {
            return (
                <FlatList
                    refreshing={ this.props.loadingGetAppartementsFavoris }
                    onRefresh={() => this.handleRefresh() }
                    data={ this.props.appartementsFavoris }
                    keyExtractor={item => `${item.buildingId}`}
                    renderItem={ (matche) => this.getFavoriteLocationItem(matche) } 
                    style={styles.container}

                />
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex:       1,
    },
})


const mapStateToProps = state => ({
    loadingGetAppartementsFavoris:  state.logements.loadingGetAppartementsFavoris,
    appartementsFavoris:            state.logements.appartementsFavoris,
    messages_error:                 state.logements.messages_error,

    createdConversation:            state.conversations.createdConversation,
    loadingPostConversations :      state.conversations.loadingPostConversations, 
    currentUser:                    state.connection.user,
    conversations_messages_error:   state.conversations.messages_error, 
});

const mapDispatchToProps = dispatch => ({
    handlePostConversation:         (participantsId) => dispatch(handlePostConversation(participantsId)),
    handleGetFavoriteLocations:     () => dispatch(handleGetFavoriteLocations()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MatchLocations);
