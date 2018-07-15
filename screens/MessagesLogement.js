import React, { Component } from 'react';
import { StatusBar, ScrollView, Platform, StyleSheet, FlatList, View, KeyboardAvoidingView, Keyboard, Dimensions } from 'react-native';
import TabContent from '../Components/TabContent';
import Bubble from '../Components/Bubble';
import { connect } from 'react-redux';
import { handleGetMessages, handlePostMessage, handleCleanMessage } from '../actions/messagesLogement';
import { PropTypes } from 'prop-types';
import InputTextMessage from '../Components/InputTextMessage';
import {empty, isset } from '../utils/check';

class MessagesLogement extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title'), 
        };
    };

    static propTypes = {

    }

    constructor(props) {
        super(props);
        this.state= {
            buildingId:         this.props.navigation.getParam('buildingId'), 
            owner:              this.props.navigation.getParam('owner'),
            messagePosition:    0,
        }
    }

    componentDidMount = () => {
        this.props.handleGetMessages(this.state.buildingId);

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',  this.keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',  this.keyboardDidHide);
        this.keyboardWillShowListener  = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillShowListener  = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    };

    componentWillUnmount () {
        // On arrête l'écoute du clavier
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        this.keyboardWillShowListener.remove();
        this.keyboardWillShowListener.remove();
        //on vide la liste des messages (pour prévenir de certains bug)
        this.props.handleCleanMessage();
    }

    keyboardDidShow = (event) => {
        this.setState({
            messagePosition: event.endCoordinates.height
        })

        this.flatList.scrollToOffset(event.endCoordinates.height);
    }

    keyboardDidHide = (event) => {
         this.setState({
            messagePosition: 0
        })
    }

    keyboardWillShow = (event) => {
        console.log('WILL SHOW //TODO ANIMATION APPLE', event, Dimensions.get('window'));

    }

    keyboardWillHide = (event) => {
        console.log('WILL HIDE //TODO ANIMATION APPLE', event, Dimensions.get('window'));

    }


    getMessageItem = (message) => {
        //retour d'une bulle avec le contenu du message et l'utilisateur qui l'a écrit
        return <Bubble 
            userId={ message.item.writer.userId }
            messageText={ message.item.messageText }
            createdDate={ message.item.createdDate }
            user={ message.item.writer }
            right={ message.item.writer.userId == this.state.owner.userId }
            handlePress={ this.handlePress } />
    }


    onSend = (message) => {
        this.props.handlePostMessage(this.state.buildingId, message);
    }

    render() {

        return (
            <View style={[styles.container, {backgroundColor: '#fff'}]}>

                <View style={{ marginBottom: this.state.messagePosition + 50}}>

                    <FlatList
                        ref={(ref) => { this.flatList= ref; }}
                        data={this.props.messages}
                        keyExtractor={item => `${item.buildingMessageId}`}
                        renderItem={(message) =>  this.getMessageItem(message)}
                        refreshing={false}
                        onRefresh={() => console.log('refresh')}
                        refreshing={this.props.loadingMessages}
                        inverted
                    />

                </View>

                <View style={[styles.keyBoadContainer, { bottom: this.state.messagePosition}] }>
                    <InputTextMessage 
                        onSend={ (message) => this.onSend (message)}
                        placeholder='Votre message'
                        loadingSend={ this.props.loadingPostMessage }

                    />
                </View>

            </View>
        );
    }
}


const mapStateToProps = state => ({
    loadingMessages:    state.messagesLogement.loadingMessages, 
    loadingPostMessage: state.messagesLogement.loadingPostMessage,
    messages:           state.messagesLogement.messages, 
});

const mapDispatchToProps = dispatch => ({
    handleGetMessages:     (buildingId)             => dispatch(handleGetMessages(buildingId)),
    handlePostMessage:     (buildingId, message)    => dispatch(handlePostMessage(buildingId, message)),
    handleCleanMessage:    () => dispatch(handleCleanMessage()),
});

  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MessagesLogement);



const styles = StyleSheet.create({
    container: {
        flex:       1,
    },
    keyBoadContainer: {
        height:     50,
        position:   'absolute',
        left:       0,
        right:      0,

    },
});