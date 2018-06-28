import React, { Component } from 'react';
import { StyleSheet, View, SectionList, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Text from  '../Components/Text';
import { Foundation, MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import Rating from '../Components/Rating';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { handleGetUserMedia, handleUploadUserMedia } from '../actions/media';
import { connect } from 'react-redux'
import { UserImage, UserImageBackground } from '../containers';


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
    let {section: {title}} = props
    return <Text h2 style={styles.titleProfile}>{ title }</Text>
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

    };
    
    getSections = () => {
        return [{   
            title: 'Mes informations', 
            data: [{
                label : "Nom",
                value: this.props.user.lastName,
            }, {
                label : "Prénom",
                value: this.props.user.firstName,
            }, {
                label: "Email",
                value: this.props.user.email,
            }], 
            renderItem: itemRow 
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
                activeComponent:    <Foundation color='#ff8f00' name='guide-dog' size={32} />,
                unactiveComponent:  <Foundation color='#aaa' name='guide-dog' size={32}/>,
                reviews:            ['Allergique', 'Je n\'en veux pas', 'Pas d\'avis', 'Un, ca ne me dérange pas', 'J\'adore las animaux'],
                onChange:           (value) => console.log('animaux : ', value)
            },{
                currentValue:       1,
                fractions:          5,
                activeComponent:    <MaterialCommunityIcons color='#ff8f00' name='smoking' size={32} />,
                unactiveComponent:  <MaterialCommunityIcons color='#aaa' name='smoking' size={32}/>,
                onChange:           (value) => console.log('fumée : ', value)
            },{
                currentValue:       1,
                fractions:          5,
                activeComponent:    <MaterialCommunityIcons color='#ff8f00' name='broom' size={32} />,
                unactiveComponent:  <MaterialCommunityIcons color='#aaa' name='broom' size={32}/>,
                onChange:           (value) => console.log('fumée : ', value)
            },

            ],
            renderItem: itemRowCharacteristic 
        }];
    }


    pickAPhoto = async () => {

        const { status } = await Expo.Permissions.getAsync(Expo.Permissions.CAMERA)
        if (status !== 'granted') {
            await Expo.Permissions.askAsync(Expo.Permissions.CAMERA)
        }

        let result = await Expo.ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });

        console.log(result);


        info = await Expo.FileSystem.getInfoAsync(result.uri, {size: true});
        console.log('ORIGINALE', info);


        let resultResized = await Expo.ImageManipulator.manipulate( result.uri, [{ resize: { width: 1000 }}], { format: 'jpg', compress: 0.8} );

        console.log(resultResized)
        

        info = await Expo.FileSystem.getInfoAsync(resultResized.uri, {size: true});
        console.log('REDIMENSIONNE', info);
            
        this.props.handleUploadUserMedia(resultResized.uri);


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
    handleGetUserMedia:     (userId) => dispatch(handleGetUserMedia(userId)),
    handleUploadUserMedia:  (imageURI) => dispatch(handleUploadUserMedia(imageURI)),
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
    }
});