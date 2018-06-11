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
import { convertStringToDateFR } from '../utils/convert';

import PropTypes from 'prop-types';

class ConversationItem extends Component {

    static propTypes = {
        item: PropTypes.object.isRequired,
        handlePress: PropTypes.func.isRequired,
    }

    render() {
        let {id, lastMessage, dateTimeLastMessage, users} = this.props.item
        return (
            <TouchableOpacity onPress={this.props.handlePress}>
                <View style={ styles.row }>
                    <Image style={ styles.avatar } source={require('../assets/tests/iron_man.jpg')}  />
                    <View style={styles.right}>
                        <View style={styles.rightTop}>
                            <Text style={ styles.users }>
                                Test toto
                            </Text>
                            <Text style={ styles.date }>
                                { convertStringToDateFR(dateTimeLastMessage) }
                            </Text>
                        </View>
                        <Text style={ styles.secondaryText } numberOfLines={2}>{lastMessage}</Text>
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