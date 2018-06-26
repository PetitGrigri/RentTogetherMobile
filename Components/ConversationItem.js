import React, { Component } from 'react';
import { 
    Text, 
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
} from 'react-native';
import { convertStringToDateFR } from '../utils/convert';
import { isset } from '../utils/check';
import PropTypes from 'prop-types';

class ConversationItem extends Component {

    static propTypes = {
        
        handlePress: PropTypes.func.isRequired,
    }

    render() {

        let { createdDate, messages, participants } = this.props;

        //récupération de la date du dernier message ou de la date de création de la conversation
        createdDate             = isset(messages[0]) ? messages[0].createdDate : createdDate;
        let lastMessageContent  = isset(messages[0]) ? messages[0].messageText : "Cette conversation n'a pas encore de message";

        return (
            <TouchableOpacity onPress={this.props.handlePress}>
                <View style={ styles.row }>
                    <Image style={ styles.avatar } source={require('../assets/tests/iron_man.jpg')}  />
                    <View style={styles.right}>
                        <View style={styles.rightTop}>
                            <Text style={ styles.users }>
                                { '//TODO' }
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

export default ConversationItem;



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
        flex:1,
    },
    users: {
        fontFamily: 'open-sans-regular', 
        fontSize: 16,
        color: '#000',
        marginBottom: 4
    },
    date: {
        fontFamily: 'open-sans-light', 
        fontSize: 14,
        color: '#333',
        marginBottom: 4
    },
    secondaryText: { 
        color: '#333',
        fontFamily: 'open-sans-light', 
        fontSize: 14,
    }
  });