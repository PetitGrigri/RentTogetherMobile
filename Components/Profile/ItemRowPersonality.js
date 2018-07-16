/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */
import React, { Component } from 'react';
import {  View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { getImagesFromPersonalReferentialName } from '../../utils/rating';
import Rating from '../Rating';

export default class ItemRowPersonality extends Component {
  
    static proptTypes = {
        index:  PropTypes.number.isRequired,
        item:   PropTypes.object.isRequired,
    }
    
    render() {
        let { item } = this.props;

        let images = getImagesFromPersonalReferentialName(item.characteristicsReferencial.name);

        let itemProps = {
            fractions:          5,
            currentValue:       item.personality.value,
            activeComponent:    images.activeComponent,
            unactiveComponent:  images.unactiveComponent,
            reviews:            [
                item.characteristicsReferencial.description1,
                item.characteristicsReferencial.description2,
                item.characteristicsReferencial.description3,
                item.characteristicsReferencial.description4,
                item.characteristicsReferencial.description5,
            ],
            onChange:  (rating) => item.onChange(rating)
        }

        return (
            <View key={ `personality-${item.characteristicsReferencial.personalityValueId}` } style={styles.itemRowPersonality}>
                <Rating {...itemProps} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemRowPersonality: {
        padding:        12,
        marginLeft:     4,
        marginRight:    4,
        flex:           1,
    },
});