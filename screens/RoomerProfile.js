import React, { Component } from 'react';
import RoomerCard from '../Components/RoomerCard';

export default class RoomerProfile extends Component {

    static navigationOptions = ({ navigation }) => {
        let targetUser = navigation.getParam('match').targetUser;
        return {
            title: `${targetUser.firstName} ${targetUser.lastName}`
        };
    };

    render() {
        console.log('test',this.props.navigation.getParam('match'));
        return (
            <RoomerCard {...this.props.navigation.getParam('match')}/>
        )
    }
}

