import React, { Component } from 'react';
import { StatusBar, ScrollView, Platform, StyleSheet, FlatList, View, KeyboardAvoidingView, Keyboard, Dimensions } from 'react-native';
import TabContent from '../Components/TabContent';
import Bubble from '../Components/Bubble';
import { connect } from 'react-redux';
import { handleGetMessages, handlePostMessage, handleCleanMessage } from '../actions/messages';
import { PropTypes } from 'prop-types';
import InputTextMessage from '../Components/InputTextMessage';
import {empty, isset } from '../utils/check';

class Messages extends Component {

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
            conversation:       this.props.navigation.getParam('conversation'), 
            messagePosition:    0,
        }
    }

    componentDidMount = () => {
        this.props.handleGetMessages(this.state.conversation.conversationId);

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
        
        //console.log(message.item.messageId);
        //récupération de l'utilisateur qui a écrit le message
        let user = this.state.conversation.participants.filter(participant => {
                return (message.item.userId === participant.userApiDto.userId)
            })[0].userApiDto;

        
        let alignRight= (this.props.userConnected.userId !== user.userId);

        
        //retour d'une bulle avec le contenu du message et l'utilisateur qui l'a écrit
        return <Bubble {...message.item} handlePress={ this.handlePress } user={user} right={alignRight} />
    }


    onSend = (message) => {
        console.log('je dois envoyer quelquechose', this.state.conversation.conversationId, message);
        this.props.handlePostMessage(this.state.conversation.conversationId, message);
    }

    render() {

        return (
            <View style={[styles.container, {backgroundColor: '#fff'}]}>

                <View style={{ marginBottom: this.state.messagePosition + 50}}>

                    <FlatList
                        ref={(ref) => { this.flatList= ref; }}
                        data={this.props.messages}
                        keyExtractor={item => `${item.messageId}`}
                        renderItem={(message) =>  this.getMessageItem(message)}
                        refreshing={false}
                        onRefresh={() => console.log('refresh')}
                        onEndReached={() => console.log('loadNext') }
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
    loadingMessages:    state.messages.loadingMessages, 
    loadingPostMessage: state.messages.loadingPostMessage,
    messages:           state.messages.messages, 
    userConnected:      state.connection.user,

});

const mapDispatchToProps = dispatch => ({
    handleGetMessages:     (conversationId)             => dispatch(handleGetMessages(conversationId)),
    handlePostMessage:     (conversationId, message)    => dispatch(handlePostMessage(conversationId, message)),
    handleCleanMessage:    () => dispatch(handleCleanMessage()),
});

  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Messages);



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