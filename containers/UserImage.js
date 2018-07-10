import React, { Component } from 'react';
import {  Image } from 'react-native';
import { isset } from '../utils/check';
import { getCachedMedia } from '../utils/fileSystem';
import { connect } from 'react-redux'
import { handleGetUserMedia } from '../actions/media';
import { PropTypes } from 'prop-types';

class UserImage extends Component {

    static propTypes= {
        userId:     PropTypes.any.isRequired,
    }
    
    constructor(props) {
        
        super(props);
        this.state = {
            userImageContent: null
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.userId != prevProps.userId) {
            this.setState({
                userImageContent: null
            });
            this.props.handleGetUserMedia(this.props.userId);
        }

        // Si le store redux vient de récupérer l'URI de l'utilisateur qui nous interesse, alors on récupère le contenu de l'URI
        if (prevProps.imagesUsers[this.props.userId] != this.props.imagesUsers[this.props.userId]) {

            getCachedMedia(this.props.imagesUsers[this.props.userId], (imageContent) => { 
                this.setState({ 
                    userImageContent: imageContent
                });
            });
        }
    }

    componentWillMount() {
        //si on a déjà l'URI de l'image dans le state média, on récupère son contenu
        if (isset(this.props.imagesUsers[this.props.userId])) {
            getCachedMedia(this.props.imagesUsers[this.props.userId], (imageContent) => { 
                this.setState({ 
                    userImageContent: imageContent
                })
            });
        } 
        // Sinon, on demande à récupérer cette URI
        else {
            this.props.handleGetUserMedia(this.props.userId);
        }
    };

    render() {

        return (
            <Image 
                source={ this.state.userImageContent
                        ? { uri: this.state.userImageContent }
                        : require('../assets/no_user.png') }  
                { ...this.props} 
            />
        );
    }
}

const mapStateToProps = state => ({
    imagesUsers:     state.media.usersMedia,
});

const mapDispatchToProps = dispatch => ({
    handleGetUserMedia: (userId) => dispatch(handleGetUserMedia(userId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserImage);
