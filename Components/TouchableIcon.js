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
        action:         () => console.log('//TODO : configure action'),
        loading:        false,
        loadingSize:    'small',
        loadingColor:   '#aaa',
    };


  render() {
    let {loading, loadingSize, loadingColor, action, icon } = this.props;
    
    return loading
        ?   <ActivityIndicator size={ loadingSize } color={ loadingColor }/> 
        :   <TouchableOpacity onPress={ action }>
                { icon }
            </TouchableOpacity>
    }
}
