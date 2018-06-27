import React, { Component } from 'react';
import { StyleSheet, View, SectionList, ScrollView, StatusBar } from 'react-native';
import Text from  '../Components/Text';
import { Foundation, MaterialCommunityIcons} from '@expo/vector-icons';
import Rating from '../Components/Rating';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { handleGetUserMedia } from '../actions/media';
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

//TODO
const titleHeader = (props) => {

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
    }

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

    render() {
        return (
            <ScrollView style={styles.container}>
                <UserImageBackground
                    userId= { this.props.user.userId }
                    style= {[styles.imageHeader, { paddingTop: getStatusBarHeight() }  ]}
                    blurRadius= { 10 }>
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
                            renderSectionHeader={({section: {title}}) => (
                                <Text h2 style={styles.titleProfile}>{title}</Text>
                            )}
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
});

const mapDispatchToProps = dispatch => ({
    handleGetUserMedia: (userId) => dispatch(handleGetUserMedia(userId)),
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
    }

});