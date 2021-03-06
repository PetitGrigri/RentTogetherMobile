/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */
import React, { Component } from 'react';
import { StyleSheet, View, SectionList, ScrollView, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import Text from  '../Components/Text';
import { Entypo, Ionicons, SimpleLineIcons, FontAwesome } from '@expo/vector-icons';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { handleGetUserMedia, handleUploadUserMedia } from '../actions/media';
import { handleLogout, handleGetPersonalityConnectedUser, handlePatchConnectedUserPersonality, handlePostConnectedUserPersonality } from '../actions/connection';
import { handleLogout as handleLogoutConversations } from '../actions/conversations';
import { connect } from 'react-redux'
import { UserImage, UserImageBackground } from '../containers';
import { Alert } from 'react-native';
import { handleGetReferentialCharacteristics } from '../actions/referentielCaracteristiques';
import { isset, empty } from '../utils/check';
import {handleHideError, handlePatchConnectedUser } from '../actions/connection';
import { ItemRow, ItemRowLocalisation, ItemRowPersonality, TitleHeader, ItemRowDescription } from '../Components/Profile';
import { handleGetConnectedUserLocalisations } from '../actions/localisations';
import TouchableIcon from '../Components/TouchableIcon';
import { takeAPhoto}  from '../utils/photo';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatarRadius:           40,
            imageUser:              null,
            personality:            [],
            personalityToUpdate:    false,
        }
    }

    changeRadius = (nativeEvent) => {
        this.setState({avatarRadius: nativeEvent.layout.width / 2 })
    };

    componentWillMount = () => {
        this.props.handleGetUserMedia(this.props.user.userId);
        this.props.handleGetReferentialCharacteristics();
        this.props.handleGetPersonalityConnectedUser();
        this.props.handleGetConnectedUserLocalisations();
    };
    
    componentDidUpdate = (prevProps, prevState) => {

        // Si lors de la mise à jour du composant, on n'a plus de chargement de référentiel de caractéristiques 
        // et qu'à l'état précédent, l'un des deux était en chargement, alors on set le state des personality.
        if (!this.props.loadingGetPersonality && !this.props.loadingCharacteristicsReferential && 
            (prevProps.loadingGetPersonality || prevProps.loadingCharacteristicsReferential) )  {

            // Si l'utilisateur connecté n'a pas de personnalité après la récupération du référentiel de caractéristiques et de la personnalité de ce dernier, on l'initialise
            if (empty(this.props.personality)) {
                this.initEmptyPersonality();
            // Sinon, on met à jour le state personality de ce composant (qu'on pourra modifier jusqu'à sa sauvegarde)
            } else {
                this.setState({ personality: this.props.personality });
            }
        }

        // Si l'on vient d'insérer la personalité d'un utilisateur alors on remet à jour le state pour qu'il prenne en compte les personalité enregistré (et leur id)
        if (prevProps.loadingPostPersonality && !this.props.loadingPostPersonality && (empty(this.props.message_error))) {
            Alert.alert(
                '',
                "Vos caractéristiques sont enregistrées",
                [
                    {text: 'OK', onPress: () => {
                        this.setState({
                            personality:            this.props.personality,
                            personalityToUpdate:    false
                        });
                    }}
                ],
                { cancelable: false }
            );   
        }

        // Si il y a eu une erreur lors de l'insertion de la personalité d'un utilisateur
        if (prevProps.loadingPostPersonality && !this.props.loadingPostPersonality && (!empty(this.props.message_error))) {
            this.setState({
                personalityToUpdate:    false
            })
            Alert.alert(
                'Erreur',
                this.props.message_error,
                [
                    {text: 'OK', onPress: () => this.props.handleHideError() }
                ],
                { cancelable: false }
            );   
        }
        
        // Si tout s'est bien passé lors de la mise à jour des caractéristique
        if (prevProps.loadingPatchPersonality && !this.props.loadingPatchPersonality && (empty(this.props.message_error))) {
            Alert.alert(
                '',
                "Vos caractéristiques ont étés mise à jour",
                [
                    {text: 'OK'}
                ],
                { cancelable: false }
            );
        }

        // Erreur lors de la mise à jour des caractéristiques
        if (prevProps.loadingPatchPersonality && !this.props.loadingPatchPersonality && (!empty(this.props.message_error))) {
            Alert.alert(
                'Erreur',
                this.props.message_error,
                [
                    {text: 'OK', onPress: () => this.props.handleHideError() }
                ],
                { cancelable: false }
            );            
        }
    }

    changePersonality = (personalityElementToUpdate, rating) =>{

        let newPersonality = this.state.personality.map(oldPersonalityElement => {
            if  (oldPersonalityElement.personalityReferencialId !== personalityElementToUpdate.personalityReferencialId) {
                return oldPersonalityElement;
            } else {
                return Object.assign({}, personalityElementToUpdate, {value: rating});
            }
        }); 

        this.setState({
            personalityToUpdate:    true,
            personality:            newPersonality
        });
    }

    saveUpdatedPersonality = () => {

        this.setState({ personalityToUpdate : false });

        // Si on doit insérer les personalités pour la première fois 
        if (empty(this.props.personality)) {
            this.props.handlePostConnectedUserPersonality(this.state.personality);
        } 
        // Si on doit mettre à jour les personalités
        else {
            this.props.handlePatchConnectedUserPersonality(this.state.personality);
        }

    }


    getSections = () => {
        // Création d'un tableau contenant l'une des personalité de l'utilisateur, 
       let sectionPersonality = [];
       if ( this.state.personality.length > 0 ) {
            this.state.personality.forEach(personalityElement => {
                if (isset(this.props.characteristicsReferencial[personalityElement.personalityReferencialId])) {
                    sectionPersonality.push({
                        characteristicsReferencial : this.props.characteristicsReferencial[personalityElement.personalityReferencialId],
                        personality:                 personalityElement, 
                        onChange:                    (rating) => this.changePersonality(personalityElement, rating),
                    });
                }
            });
        }


        return [{   
            title: 'Mes informations', 
            data: [{
                label :     "Nom",
                value:      this.props.user.lastName,
            }, {
                label :     "Prénom",
                value:      this.props.user.firstName,
                
            }, {
                label:      "Email",
                value:      this.props.user.email,
            }], 
            renderItem: (props) => <ItemRow {...props} />,
            action: <TouchableOpacity onPress={ this.changeParam  }><Entypo  color='#aaa' name='edit' size={ 18 } style={styles.editParam }/></TouchableOpacity>
        },{   
            title: 'Ma description', 
            data: [{
                value:      this.props.user.description,
            }], 
            renderItem: (props) => <ItemRowDescription {...props} />,
            action: <TouchableOpacity onPress={ this.changeDescription  }><Entypo  color='#aaa' name='edit' size={ 18 } style={styles.editParam }/></TouchableOpacity>
        }, {   
            title: 'Mes recherches', 
            data: this.props.localisations,
            renderItem: (props) => <ItemRowLocalisation {...props} />,
            
            action: this.props.loadingGetLocalisations
                ?   <ActivityIndicator size="small" color='#aaa' /> 
                :   <TouchableOpacity onPress={ this.changeLocalisations  }><Entypo  color='#aaa' name='edit' size={ 18 } style={styles.editParam }/></TouchableOpacity>
        }, {
            title: 'Mes caractéristiques', 
            data: sectionPersonality,
            action: (this.state.personalityToUpdate && !this.props.loadingPatchPersonality) 
                ?   <TouchableOpacity onPress={ this.saveUpdatedPersonality  }><Entypo  color='#aaa' name='save' size={ 18 } style={styles.editParam }/></TouchableOpacity>
                :   (this.props.loadingGetPersonality || this.props.loadingCharacteristicsReferential || this.props.loadingPatchPersonality || this.props.loadingPostPersonality) 
                    ? <ActivityIndicator size="small" color='#aaa' /> 
                    : null,
            renderItem: (props) => <ItemRowPersonality {...props} />
        }, {
            title:          'Se déconnecter',
            actionTitle:    this.logout,
            action:         <TouchableOpacity onPress={ this.logout }><SimpleLineIcons  color='#aaa' name='logout' size={ 18 } style={styles.editParam }/></TouchableOpacity>,
            data:           [],
        }];
    }


    changeParam = () =>{
        this.props.navigation.navigate('updateParam');
    }

    changeDescription = () =>{
        this.props.navigation.navigate('updateDescription');
    }

    changeLocalisations = () => {
        this.props.navigation.navigate('updateLocalisation');
    }
    
    /**
     * Dans le cas ou un utilisateur n'a pas de personnalité, on lui initialise une personalité vide (et on l'informe qu'il doit les sauvegarder)
     */
    initEmptyPersonality = () => {
        // Message d'information
        Alert.alert(
            'Vos caractéristiques',
            "Vos caractéristiques ne sont pas encore configurées. \nNous vous invitons à les configurer pour que vous puissiez trouver d'autres colocataires",
            [
                { text: 'OK', onPress: () => {
                    this.setState({
                        personality: [{
                            personalityReferencialId : 1,
                            value : 3
                        },
                        {
                            personalityReferencialId : 2,
                            value : 3
                        },
                        {
                            personalityReferencialId : 4,
                            value: 3
                        },
                        {
                            personalityReferencialId: 5,
                            value: 3
                        },
                        {
                            personalityReferencialId : 6,
                            value: 3
                        },
                        {
                            personalityReferencialId : 7,
                            value: 3
                        }],
                        personalityToUpdate: true
                    });
                }}
            ],
            { cancelable: false }
        )
        
    }

    /**
     * Fonction permettant à l'utilisateur de prendre une photo et de l'uploader
     */
    pickAPhoto = async () => {
        // Réalisation et compression d'une photo
        let uriPhoto = await takeAPhoto();

        if (uriPhoto) {
            //transmission de la photo 
            this.props.handleUploadUserMedia(uriPhoto);
        }
    }


    logout = () => {
        this.props.handleLogout();
        this.props.handleLogoutConversations();
    }

    /**
     * Fonction permettant  de changer de rôle (Propriétaire ou locataire)
     */
    changeRole = ()  => {

        this.props.handlePatchConnectedUser({
            isOwner:    this.props.user.isOwner ? 0 : 1, 
            isRoomer:   this.props.user.isRoomer ? 0 : 1
        });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <UserImageBackground
                    userId= { this.props.user.userId }
                    style= {[styles.imageHeader ]}
                    blurRadius= { 10 }>

                    <View style={ [ styles.imageHeaderIcons , { top: getStatusBarHeight() }]} >
                        <TouchableOpacity onPress={ this.changeRole }>
                            <FontAwesome color='#fff' name='exchange' size={24} />
                        </TouchableOpacity>
                        <TouchableIcon 
                            action={this.pickAPhoto } 
                            loading= { this.props.loadingUpload } 
                            icon={ <Ionicons color='#fff' name='ios-camera' size={32} /> } 
                            loadingColor='#fff' />
                    </View>

                    <UserImage 
                        userId= { this.props.user.userId }
                        style={ [styles.imageAvatar, {borderRadius: this.state.avatarRadius} ] } 
                        onLayout={(event) => this.changeRadius(event.nativeEvent)}  
                    />
                    <Text h1 style= {styles.textWhite}>{ this.props.user.firstName } { this.props.user.lastName }</Text>
                    
                </UserImageBackground>
                
                <View style={styles.cardBottomTop} />
                <View style={styles.containerInformations}>
                    <SectionList
                        renderItem={({ item, index, section }) => <Text key={index}>{item}</Text>}
                        renderSectionHeader={ (props) => <TitleHeader {...props} />}
                        sections={ this.getSections() }
                        keyExtractor={(item, index) => item + index}
                    />
                    
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
    loadingGet:                         state.media.loadingGet,
    messageError:                       state.media.messageError,
    image:                              state.media.usersMedia[state.connection.user.userId] ? state.media.usersMedia[state.connection.user.userId] : null,
    user:                               state.connection.user,
    personality:                        state.connection.personality,
    loadingUpload:                      state.media.userMediaUploading,
    loadingGetPersonality:              state.connection.loadingGetPersonality,
    loadingPatchPersonality:            state.connection.loadingPatchPersonality,
    loadingPostPersonality:             state.connection.loadingPostPersonality,
    loadingCharacteristicsReferential:  state.referentielCaracteristiques.loadingGetReferential,
    characteristicsReferencial:         state.referentielCaracteristiques.characteristicsReferencial,
    message_error:                      state.connection.message_error,
    loadingGetLocalisations:            state.localisations.loadingGetLocalisations,
    localisations:                      state.localisations.localisations,
});

const mapDispatchToProps = dispatch => ({
    handleGetUserMedia:                     (userId) => dispatch(handleGetUserMedia(userId)),
    handleGetReferentialCharacteristics:    () => dispatch(handleGetReferentialCharacteristics()),
    handleGetPersonalityConnectedUser:      () => dispatch(handleGetPersonalityConnectedUser()),
    handleUploadUserMedia:                  (imageURI) => dispatch(handleUploadUserMedia(imageURI)),
    handleLogout:                           () => dispatch(handleLogout()),
    handlePatchConnectedUserPersonality:    (personality) => dispatch(handlePatchConnectedUserPersonality(personality)),
    handlePostConnectedUserPersonality:     (personality) => dispatch(handlePostConnectedUserPersonality(personality)),
    handleHideError:                        () => dispatch(handleHideError()),
    handleLogoutConversations:              () => dispatch(handleLogoutConversations()),
    handleGetConnectedUserLocalisations:    () => dispatch(handleGetConnectedUserLocalisations()),
    handlePatchConnectedUser:               (userData)  => dispatch(handlePatchConnectedUser(userData))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile);


const styles = StyleSheet.create({
    container: {
        backgroundColor:    '#eee',
        flex:               1,
    },
    textWhite: {
        color:           '#fff',
        fontFamily:      'open-sans-light', 
    },
    imageHeader: {
        width:          '100%',
        aspectRatio:     1.8,
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
    containerInformations: {
        margin: 16,
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
        top:                0,
        left:               0,
        right:              0,
        paddingLeft:        16,
        paddingRight:       16,
        justifyContent:     'space-between',
        alignItems:         'flex-start',
        flexDirection:      'row',
    }, 
    editParam: {
        width:          30,
        textAlign:      'right',

    }, 
    actionTitle: {
        flex:       1,
    }
});