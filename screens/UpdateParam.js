import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import Text from  '../Components/Text';
import ButtonSubmit from '../Components/ButtonSubmit';
import InputTextApplication from '../Components/InputTextApplication';
import { connect } from 'react-redux'
import { UserImage, UserImageBackground } from '../containers';
import { handleGetUserMedia, handleUploadUserMedia } from '../actions/media';

class UpdateParam extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName:  this.props.user.firstName,
            lastName:   this.props.user.lastName,
            phone:      this.props.user.phone,
            email:      this.props.user.email,
        }
    }

    changeRadius = (nativeEvent) => {
        this.setState({avatarRadius: nativeEvent.layout.width / 2 })
    };

    componentDidMount = () => {
        this.props.handleGetUserMedia(this.props.user.userId);
    };

    handlePatchUser = ()  => {

        this.props.handlePatchUser({
            email:      this.state.email,
            firstName:  this.state.firstName,
            lastName:   this.state.lastName,
            phone:      this.state.phone,
        })
    }

    render() {
        
        return (
            <ScrollView style={styles.container}>
                <UserImageBackground
                    userId= { this.props.user.userId }
                    style= { styles.imageHeader }
                    blurRadius= { 10 }>

                    <UserImage 
                        userId= { this.props.user.userId }
                        style={ [styles.imageAvatar, {borderRadius: this.state.avatarRadius} ] } 
                        onLayout={(event) => this.changeRadius(event.nativeEvent)}  
                    />
                </UserImageBackground>
                
                <View style={styles.cardBottomTop} />
                    <View style={styles.containerInformations}>

                    <Text h1 style= {styles.titleProfile}>Mes informations</Text>

                    <View style={ styles.inputWrapper}>
                        <InputTextApplication 
                            onChangeText={(text) => this.setState({ firstName:text }) } 
                            value={ this.state.firstName }
                            placeholder='Prénom'/>

                        <InputTextApplication 
                            onChangeText={(text) => this.setState({ lastName:text }) } 
                            value={ this.state.lastName }
                            placeholder='Nom'/>
                            
                        <InputTextApplication 
                            onChangeText={(text) => this.setState({ phone:text }) }
                            value={ this.state.phone }
                            placeholder='Téléphone'/>

                        <InputTextApplication 
                            onChangeText={(text) => this.setState({ email:text }) }
                            value={ this.state.email }
                            placeholder='Email'/>


                        <ButtonSubmit 
                            text="Enregistrer"
                            style={{marginTop:40}}
                            /*loading={ this.props.loadingAdd }*/
                            onPress={ this.handlePatchUser }
                        />
                    
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
    user:           state.connection.user,
    image:          state.media.usersMedia[state.connection.user.userId] ? state.media.usersMedia[state.connection.user.userId] : null,
});

const mapDispatchToProps = dispatch => ({
    handleGetUserMedia:     (userId) => dispatch(handleGetUserMedia(userId)),
    //handlePatchUser:        (userId) => dispatch(handlePatchUser(userId)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateParam);













const styles = StyleSheet.create({
    container: {
        backgroundColor:    '#eee',
        flex:               1,
    },
    inputWrapper: {
        padding:        12,
        paddingLeft:    20,
        paddingRight:   20,
    },
    titleProfile: {
        fontFamily: 'open-sans-light', 
        color:      '#e65100',
    },

    textWhite: {
        color:           '#fff',
        fontFamily:      'open-sans-light', 
    },
    imageHeader: {
        width:          '100%',
        aspectRatio:    1.8,
        justifyContent: 'center',
        alignItems:     'center',
    },
    imageAvatar: {
        width:          '30%',
        height:         undefined,
        aspectRatio:    1,
        borderWidth:    4,
        borderColor:    '#fff',
    },
    titleProfile: {
        fontFamily: 'open-sans-light', 
        color:      '#e65100',
    },
    containerInformations: {
        margin: 16,
    },
    itemRow: {
        padding:        12,
        marginLeft:     4,
        marginRight:    4,
        flexDirection:  'row',
        justifyContent: 'flex-start',
        alignItems:     'center',
    },
    itemRowLabel: {
        fontFamily:     'open-sans-light', 
        fontSize:       12,
        flex:           1,
    }, 
    itemRowValue: {
        fontFamily:     'open-sans-light', 
        fontSize :      16,
        flex:           2,
        textAlign:      'right'
    },
    itemRowCharacteristic: {
        padding:        12,
        marginLeft:     4,
        marginRight:    4,
        flex:           1,
    },
    cardBottomTop: {
        position:           'relative',
        bottom:             10,
        zIndex:             1000,
        backgroundColor:    '#eee',
        height:             20,
        borderRadius:       10,
    },
    imageHeaderIcons: {
        width:              '100%',
        position:           'absolute',
        padding:            16,
        justifyContent:     'center',
        alignItems:         'flex-end',
    }, 
    editParam: {
        width:          30,
        textAlign:      'right',

    }
});