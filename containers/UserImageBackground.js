import React, { Component } from 'react';
import {  ImageBackground } from 'react-native';
import { isset } from '../utils/check';
import { getUserMedia } from '../utils/fileSystem';
import { connect } from 'react-redux'
import { handleGetUserMedia } from '../actions/media';
import { PropTypes } from 'prop-types';


class UserImageBackground extends Component {

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
        // Si le store redux vient de récupérer l'URI de l'utilisateur qui nous interesse, alors on récupère le contenu de l'URI
        if ((!isset(prevProps.imagesUsers[this.props.userId])) && (isset(this.props.imagesUsers[this.props.userId]))) {
            getUserMedia(this.props.imagesUsers[this.props.userId], (imageContent) => { 
                this.setState({ 
                    userImageContent: imageContent
                });
            });
        }
    }
    
    componentWillMount() {
        //si on a déjà l'uri de l'image dans le state média, on récupère son contenu
        if (isset(this.props.imagesUsers[this.props.userId])) {
            getUserMedia(this.props.imagesUsers[this.props.userId], (imageContent) => { 
                this.setState({ 
                    userImageContent: imageContent
                })
            });
        } else {
            this.props.handleGetUserMedia(this.props.userId);
        }
    };

    render() {

        return (
            <ImageBackground 
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
)(UserImageBackground);