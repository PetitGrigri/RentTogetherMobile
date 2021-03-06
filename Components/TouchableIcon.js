/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */
import React, { Component } from 'react';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

export default class TouchableIcon extends Component {

    static propTypes = {
        icon:           PropTypes.object.isRequired,
        action:         PropTypes.func,
        loading:        PropTypes.bool,
        loadingSize:    PropTypes.string,
        loadingColor:   PropTypes.string,

    };

    static defaultProps = {
        action:         () => console.log('//TODO : configure TouchableIcon action'),
        loading:        false,
        loadingSize:    'small',
        loadingColor:   '#aaa',
    };


  render() {

    return this.props.loading
        ?   <ActivityIndicator size={ this.props.loadingSize } color={ this.props.loadingColor }/> 
        :   <TouchableOpacity onPress={ this.props.action }>
                { this.props.icon }
            </TouchableOpacity>
    }
}
