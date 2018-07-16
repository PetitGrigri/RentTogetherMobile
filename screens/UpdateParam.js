/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import Text from  '../Components/Text';
import ButtonSubmit from '../Components/ButtonSubmit';
import InputTextApplication from '../Components/InputTextApplication';
import { connect } from 'react-redux'
import { UserImage, UserImageBackground } from '../containers';
import { handlePatchConnectedUser } from '../actions/connection';
import { empty } from '../utils/check';
import {handleHideError } from '../actions/connection';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const REQUIRED_VALUES=["firstName", "lastName", "phoneNumber", "email"];


class UpdateParam extends Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName:  this.props.user.firstName,
            lastName:   this.props.user.lastName,
            phoneNumber:this.props.user.phoneNumber,
            email:      this.props.user.email,
            errorInput: [],
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Si on a une erreur lors de la mise à jour de l'utilisateur
        if (prevProps.loadingPatchUser && !this.props.loadingPatchUser && (!empty(this.props.message_error))) {
            Alert.alert(
                'Erreur',
                this.props.message_error,
                [
                    {text: 'OK', onPress: () => this.props.handleHideError()},
                ],
                { cancelable: true }
            );
        }
        // Si l'on n'a pas d'erreur lors de la mise à jour de l'utilisateur
        if (prevProps.loadingPatchUser && !this.props.loadingPatchUser && (empty(this.props.message_error))) {
            Alert.alert(
                '',
                "Vos données personnelles ont été mise à jour",
                [
                    {text: 'OK', onPress: () => this.props.navigation.goBack()},
                ],
                { cancelable: true }
            );

        }
    }

    changeRadius = (nativeEvent) => {
        this.setState({avatarRadius: nativeEvent.layout.width / 2 })
    };

    handlePatchUser = ()  => {

        if ((this.checkForm()) && (!this.props.loadingPatchUser)) {
            // Demande de mise à jour de l'utilisateur
            this.props.handlePatchConnectedUser({
                email:          this.state.email,
                firstName:      this.state.firstName,
                lastName:       this.state.lastName,
                phoneNumber:    this.state.phoneNumber,
            });
        } else {
            Alert.alert(
                'Attention',
                "Vous n'avez pas saisi tout les champs nécessaires.",
                [
                    { text: 'OK' }
                ],
                { cancelable: false }
            )
        }
    }

    checkForm = () => {
        let checkForm = REQUIRED_VALUES.filter(value => empty(this.state[value]));

        //on ajoute les formulaires erronés
        this.setState({errorInput: checkForm});

        return (checkForm.length <= 0)
    }

    isInputError = (who) => {
        return (this.state.errorInput.filter(name => name === who).length > 0)
    }

    updateValue = (who, val) => {
        if (empty(val)) {
            this.setState({
                [who] :     val
            });
        } else {
            this.setState({
                [who] :     val,
                errorInput: this.state.errorInput.filter(name => ((name !== who)))
            })
        }
    }

    render() {
        return (
            <View>
                <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled">
                    <KeyboardAvoidingView behavior="position">
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
                                    iconLeft= { <FontAwesome name='user' size={ 18 } style={styles.iconLeft}/> }
                                    onChangeText={(text) => this.updateValue("firstName", text) } 
                                    error={ this.isInputError("firstName") }
                                    value={ this.state.firstName }
                                    placeholder='Prénom'/>

                                <InputTextApplication 
                                    iconLeft= { <FontAwesome name='user' size={ 18 } style={styles.iconLeft}/> }
                                    onChangeText={(text) => this.updateValue("lastName", text) } 
                                    error={ this.isInputError("lastName") }
                                    value={ this.state.lastName }
                                    placeholder='Nom'/>
                                    
                                <InputTextApplication 
                                    iconLeft= { <FontAwesome style={ styles.iconLeft } size={18} name='phone' />  }
                                    onChangeText={(text) => this.updateValue("phoneNumber", text) } 
                                    error={ this.isInputError("phoneNumber") }
                                    value={ this.state.phoneNumber }
                                    placeholder='Téléphone'/>

                                <InputTextApplication 
                                    iconLeft= { <Ionicons style={ styles.iconLeft } size={18} name='ios-mail-outline' />  }
                                    onChangeText={(text) => this.updateValue("email", text) } 
                                    error={ this.isInputError("email") }
                                    value={ this.state.email }
                                    placeholder='Email'/>

                                <ButtonSubmit 
                                    text="Enregistrer"
                                    style={{marginTop:40}}
                                    loading={ this.props.loadingPatchUser }
                                    onPress={ this.handlePatchUser }
                                />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user:               state.connection.user,
    loadingPatchUser:   state.connection.loadingPatchUser,
    message_error:      state.connection.message_error
});

const mapDispatchToProps = dispatch => ({
    handlePatchConnectedUser:   (userData) => dispatch(handlePatchConnectedUser(userData)),
    handleHideError:            () => dispatch(handleHideError()),
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

    },
    iconLeft: {
        paddingRight:       8,
        paddingLeft:        16,
        color:              '#000',
    },
});