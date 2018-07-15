import React, { Component } from 'react';
import {  ImageBackground } from 'react-native';
import { isset } from '../utils/check';
import { getCachedMedia } from '../utils/fileSystem';
import { connect } from 'react-redux'
import { handleGetLogementMedia } from '../actions/media';
import { PropTypes } from 'prop-types';

class LocationImageBackground extends Component {

    static propTypes= {
        pictureId:     PropTypes.any.isRequired,
    }
    
    constructor(props) {
        
        super(props);
        this.state = {
            locationImageContent: null
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.pictureId != prevProps.pictureId) {
            this.setState({
                locationImageContent: null
            });
            this.props.handleGetLogementMedia(this.props.pictureId);
        }

        // Si le store redux vient de récupérer l'URI de l'utilisateur qui nous interesse, alors on récupère le contenu de l'URI
        if (prevProps.imagesLogements[this.props.pictureId] != this.props.imagesLogements[this.props.pictureId]) {
            getCachedMedia(this.props.imagesLogements[this.props.pictureId], (imageContent) => { 
                this.setState({ 
                    locationImageContent: imageContent
                });
            });
        }
    }

    componentWillMount() {
        //si on a déjà l'URI de l'image dans le state média, on récupère son contenu
        if (isset(this.props.imagesLogements[this.props.pictureId])) {
            getCachedMedia(this.props.imagesLogements[this.props.pictureId], (imageContent) => { 
                this.setState({ 
                    locationImageContent: imageContent
                })
            });
        } 
        // Sinon, on demande à récupérer cette URI
        else {
            this.props.handleGetLogementMedia(this.props.pictureId);
        }
    };

    render() {

        return (
            <ImageBackground 
                source={ this.state.locationImageContent
                        ? { uri: this.state.locationImageContent }
                        : require('../assets/no_building.png') }  
                { ...this.props} 
            />
        );
    }
}

const mapStateToProps = state => ({
    imagesLogements:     state.media.locationsMedia,
});

const mapDispatchToProps = dispatch => ({
    handleGetLogementMedia: (pictureId) => dispatch(handleGetLogementMedia(pictureId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocationImageBackground);
