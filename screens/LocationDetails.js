import React, { Component } from 'react';
import LocationCard from '../Components/LocationCard';

export default class LocationDetails extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('location').title,
        };
    };

    render() {
        console.log('location',this.props.navigation.getParam('location'));
        return (
            <LocationCard {...this.props.navigation.getParam('location')}
                handleShowMessages= { this.props.navigation.getParam('showMessages') }
            />
        )
    }
}

