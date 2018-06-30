import React, { Component } from 'react';
import {  Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { convertStringToDateFR } from '../utils/convert';
import { isset } from '../utils/check';
import PropTypes from 'prop-types';
import { UserImage } from '../containers';
import { connect } from 'react-redux';


class ConversationItem extends Component {

    static propTypes= {
        conversationId: PropTypes.number.isRequired,
        createdDate:    PropTypes.string.isRequired,
        messages:       PropTypes.array.isRequired,
        participants:   PropTypes.array.isRequired,
        title:          PropTypes.string.isRequired,
    }

    render() {
        let { conversationId, createdDate, messages, participants, title } = this.props;

        //récupération de la date du dernier message ou de la date de création de la conversation
        createdDate             = isset(messages[0]) ? messages[0].createdDate : createdDate;
        let lastMessageContent  = isset(messages[0]) ? messages[0].messageText : "Cette conversation n'a pas encore de message";

        // Filtrage des participants (on ne veut que les participants différent de l'utilisateur connecté)
        let filererdParticipants= participants.filter((participant) =>  this.props.currentUser.userId != participant.userApiDto.userId );
        let userParticipants    = filererdParticipants.map(participant => participant.userApiDto);


        return (
            <TouchableOpacity onPress={() => this.props.handlePress(conversationId, title)}>
                <View style={ styles.row }>
                    <UserImage style={ styles.avatar } userId={ userParticipants[0].userId } />
                    <View style={styles.right}>
                        <View style={styles.rightTop}>
                            <Text style={ styles.users } numberOfLines={1}>
                                { this.props.title }
                            </Text>
                            <Text style={ styles.date }>
                                { convertStringToDateFR(createdDate) }
                            </Text>
                        </View>
                        <Text style={ styles.secondaryText } numberOfLines={2}>{ lastMessageContent}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = state => ({
    currentUser:     state.connection.user,
});

export default connect(
    mapStateToProps
)(ConversationItem);



const styles = StyleSheet.create({
    row: { 
        flexDirection: "row", 
        alignItems: "center", 
        padding: 8 ,
        flex:1
    },
    avatar: { 
        width:          50, 
        height:         50, 
        borderRadius:   25, 
        marginRight:    8 , 
        borderWidth:    1,
        borderColor:    '#ccc',
    },
    right: {
        marginRight: 8, 
        flex:1 
    },
    rightTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:     'center',
        flex:1,
    },
    users: {
        fontFamily:     'open-sans-regular', 
        fontSize:       16,
        color:          '#000',
        marginBottom:   4,
        flex:           2,
    },
    date: {
        fontFamily:     'open-sans-light', 
        fontSize:       14,
        color:          '#333',
        marginBottom:   4,
        width:          130,
        textAlign:      'right'

    },
    secondaryText: { 
        color: '#333',
        fontFamily: 'open-sans-light', 
        fontSize: 14,
    }
  });