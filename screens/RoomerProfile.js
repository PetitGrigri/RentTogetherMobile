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
        return (
            <RoomerCard {...this.props.navigation.getParam('match')}/>
        )
    }
}

