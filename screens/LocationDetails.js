/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */
import React, { Component } from 'react';
import LocationCard from '../Components/LocationCard';

export default class LocationDetails extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('location').title,
        };
    };

    render() {
        return (
            <LocationCard {...this.props.navigation.getParam('location')}
                handleShowMessages= { this.props.navigation.getParam('showMessages') }
            />
        )
    }
}

