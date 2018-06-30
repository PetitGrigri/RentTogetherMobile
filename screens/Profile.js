import React, { Component } from 'react';
import { StyleSheet, View, SectionList, ScrollView, TouchableOpacity, ActivityIndicator, Platform, Image } from 'react-native';
import Text from  '../Components/Text';
import { Entypo, Ionicons, SimpleLineIcons} from '@expo/vector-icons';
import Rating from '../Components/Rating';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { handleGetUserMedia, handleUploadUserMedia } from '../actions/media';
import { handleLogout } from '../actions/connection';
import { connect } from 'react-redux'
import { UserImage, UserImageBackground } from '../containers';
import { Alert } from 'react-native';
import { handleGetReferentialCharacteristics } from '../actions/referentielCaracteristiques';

const itemRow = (props) => {
    let { index, item } = props;
    return (
        <View key={index} style={styles.itemRow}>
            <Text style={styles.itemRowLabel} >{item.label}</Text>
            <Text style={styles.itemRowValue}  >{item.value}</Text>
        </View>
    );
}

const itemRowLocation = (props) => {
    let { index, item } = props;
    return (
        <View key={index} style={styles.itemRow}>
            <Text style={styles.itemRowLabel} >{item.codePostal}</Text>
            <Text style={styles.itemRowValue}  >{item.city}</Text>
        </View>
    );
}

const itemRowCharacteristic = (props) => {
    let { index, item } = props;
    return (
        <View key={index} style={styles.itemRowCharacteristic}>
            <Rating {...item} />
        </View>
    );

}

const titleHeader = (props)  => {
    let {section: {title, actionTitle, action}} = props

    return  <View style={ styles.titleSection }>
                { (title && (!actionTitle)) ? <Text h2 style={styles.titleProfile}>{ title }</Text> : null }
                { actionTitle 
                    ?   <TouchableOpacity onPress= { actionTitle } style={styles.actionTitle}>
                            <Text h2 style={styles.titleProfile}>{ title }</Text>
                        </TouchableOpacity> 
                    :   null 
                }
                { action  ?   action  :   null  }
            </View>
}

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatarRadius: 0,
            imageUser: null
        }
    }


    changeRadius = (nativeEvent) => {
        this.setState({avatarRadius: nativeEvent.layout.width / 2 })
    };

    componentDidMount = () => {
        this.props.handleGetUserMedia(this.props.user.userId);
        this.props.handleGetReferentialCharacteristics();
    };
    
    getSections = () => {
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
            renderItem: itemRow,
            action: <TouchableOpacity onPress={ this.changeParam  }><Entypo  color='#aaa' name='edit' size={ 18 } style={styles.editParam }/></TouchableOpacity>
        }, {   
            title: 'Mes recherches', 
            data: [{
                codePostal: "75015",
                city: "Paris 15ème"
            }, {
                codePostal: "45000",
                city: "Orléans"
            }],
            renderItem: itemRowLocation
        }, {
            title: 'Mes caractéristiques', 
            data: [{
                currentValue:       1,
                fractions:          5,
                activeComponent:    <Image source={ require('../assets/icon/pets_ff8f00.png')} style={ styles.icon}/>,
                unactiveComponent:  <Image source={ require('../assets/icon/pets_aaa.png')} style={ styles.icon}/>,
                reviews:            ['Allergique', 'Je n\'en veux pas', 'Pas d\'avis', 'Un, ca ne me dérange pas', 'J\'adore las animaux'],
                onChange:           (value) => console.log('pets : ', value)
            },{
                currentValue:       1,
                fractions:          5,
                activeComponent:    <Image source={ require('../assets/icon/smoke_ff8f00.png')} style={ styles.icon}/>,
                unactiveComponent:  <Image source={ require('../assets/icon/smoke_aaa.png')} style={ styles.icon}/>,
                onChange:           (value) => console.log('smoke : ', value)
            },{
                currentValue:       1,
                fractions:          5,
                activeComponent:    <Image source={ require('../assets/icon/clean_ff8f00.png')} style={ styles.icon}/>,
                unactiveComponent:  <Image source={ require('../assets/icon/clean_aaa.png')} style={ styles.icon}/>,
                onChange:           (value) => console.log('clean : ', value)
            },
            {
                currentValue:       1,
                fractions:          5,
                activeComponent:    <Image source={ require('../assets/icon/shelf_ff8f00.png')} style={ styles.icon}/>,
                unactiveComponent:  <Image source={ require('../assets/icon/shelf_aaa.png')} style={ styles.icon}/>,
                onChange:           (value) => console.log('shelf : ', value)
            },
            {
                currentValue:       1,
                fractions:          5,
                activeComponent:    <Image source={ require('../assets/icon/party_ff8f00.png')} style={ styles.icon}/>,
                unactiveComponent:  <Image source={ require('../assets/icon/party_aaa.png')} style={ styles.icon}/>,
                onChange:           (value) => console.log('party : ', value)
            },
            {
                currentValue:       1,
                fractions:          5,
                activeComponent:    <Image source={ require('../assets/icon/social_ff8f00.png')} style={ styles.icon}/>,
                unactiveComponent:  <Image source={ require('../assets/icon/social_aaa.png')} style={ styles.icon}/>,
                onChange:           (value) => console.log('social : ', value)
            }
            ],
            renderItem: itemRowCharacteristic 
        }, {
            title:          'Se déconnecter',
            actionTitle:    this.logout,
            action:         <TouchableOpacity onPress={ this.logout }><SimpleLineIcons  color='#aaa' name='logout' size={ 18 } style={styles.editParam }/></TouchableOpacity>,
            data:           [],
        }];
    }


    changeParam = () =>{
        this.props.navigation.navigate('updateParam')
    }


    pickAPhoto = async () => {
        
        // Demande de la permission camera
        let cameraPermission = await Expo.Permissions.getAsync(Expo.Permissions.CAMERA)
        if (cameraPermission.status !== 'granted') {
            await Expo.Permissions.askAsync(Expo.Permissions.CAMERA)
        }

        // Demande de la permission camera (semble nécessaire pour iOS)
        let cameraRollPermission= await Expo.Permissions.getAsync(Expo.Permissions.CAMERA_ROLL)
        if (cameraRollPermission.status  !== 'granted') {
            await Expo.Permissions.askAsync(Expo.Permissions.CAMERA_ROLL)
        }

        // Si on n'a pas de permission, on arrête là
        if (((Platform.OS === 'ios') && ((cameraPermission.status  !== 'granted') || (cameraRollPermission.status  !== 'granted'))) ||
            ((Platform.OS !== 'ios') && (cameraPermission.status  !== 'granted')) ) {
                // Message d'erreur en cas de refus
                Alert.alert(
                    'Erreur',
                    "Autorisation refusée",
                    [
                        {text: 'OK'},
                    ],
                    { cancelable: true }
                )
            return;
        }

        // Si on a les permissions, on peu continuer à prendre une photo 
        let result = await Expo.ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });

        // Si l'utilisateur a annulé, on quitte
        if (result.cancelled === true) {
            return;
        }

        // Redimentionnement de la photo (et modificaiton de son type en jpg (plus léger pour le transport)
        let resultResized = await Expo.ImageManipulator.manipulate( result.uri, [{ resize: { width: 1000 }}], { format: 'jpg', compress: 0.8} );

        //debug au cas ou
        //info = await Expo.FileSystem.getInfoAsync(resultResized.uri, {size: true});
        //console.log('REDIMENSIONNE', info);

        //transmission de la photo 
        this.props.handleUploadUserMedia(resultResized.uri);
    }


    logout = () => {
        this.props.handleLogout()
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <UserImageBackground
                    userId= { this.props.user.userId }
                    style= {[styles.imageHeader, { paddingTop: getStatusBarHeight() }  ]}
                    blurRadius= { 10 }>

                    <View style={ [ styles.imageHeaderIcons , { top: getStatusBarHeight() }]} >
                        { !this.props.loadingUpload 
                            ?   <TouchableOpacity onPress={ this.pickAPhoto }>
                                    <Ionicons color='#fff' name='ios-camera' size={32} />
                                </TouchableOpacity>
                            :   <ActivityIndicator size="small" color='#fff' />
                        }
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
                            renderSectionHeader={ (props) => titleHeader(props) }
                            sections={ this.getSections() }
                            keyExtractor={(item, index) => item + index}
                        />
                        
                    </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
    loadingGet:     state.media.loadingGet,
    messageError:   state.media.messageError,
    image:          state.media.usersMedia[state.connection.user.userId] ? state.media.usersMedia[state.connection.user.userId] : null,
    user:           state.connection.user,
    loadingUpload:  state.media.userMediaUpaloadLoading,
});

const mapDispatchToProps = dispatch => ({
    handleGetUserMedia:                     (userId) => dispatch(handleGetUserMedia(userId)),
    handleUploadUserMedia:                  (imageURI) => dispatch(handleUploadUserMedia(imageURI)),
    handleLogout:                           () => dispatch(handleLogout()),
    handleGetReferentialCharacteristics:    () => dispatch(handleGetReferentialCharacteristics()),
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
        aspectRatio:        1.8,
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
        flex:       1,
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
    titleSection: {
        flexDirection:  'row',
        alignItems:     'center',
        marginTop:      10,
    },
    actionTitle: {
        flex:       1,
    }, 
    icon: {
        height: 32, 
        width: 32
    }
});