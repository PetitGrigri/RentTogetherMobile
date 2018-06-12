import React, { Component } from 'react';
import { StyleSheet, Button, TouchableHighlight, ImageBackground,Image, View, SectionList, ScrollView } from 'react-native';
import Text from  '../Components/Text';
import { Font } from 'expo';
import { Foundation, MaterialCommunityIcons} from '@expo/vector-icons';
import Rating from '../Components/Rating';


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
            <Foundation color='#ff8f00' name={item.iconLeft} size={32}/>
            <Rating   
                {...item}
                />
            <Foundation color='#ff8f00' name={item.iconRight} size={32}/>
        </View>);

}

const sections = [
    {   title: 'Mes informations', 
        data: [{
            label : "Nom",
            value: "DOE"
        }, {
            label : "Prénom",
            value: "John"
        }, {
            label: "Email",
            value: "john.doe@lost.com"
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
    },
];


//TODO
const titleHeader = (props) => {

}

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
            avatarRadius: 0,
        }
    }
    componentDidMount() {
        Font.loadAsync({
            'open-sans-light': require('../assets/fonts/Open_Sans/OpenSans-Light.ttf'),
            'open-sans-regular': require('../assets/fonts/Open_Sans/OpenSans-Regular.ttf'),
        }).then(() => {
            this.setState({fontLoaded: true});
        });
    }

    changeRadius = (nativeEvent) => {
        this.setState({avatarRadius: nativeEvent.layout.width / 2 })
    }

    render() {
        return (
            this.state.fontLoaded
              ? <ScrollView style={styles.container}>
                    <ImageBackground 
                        source={require('../assets/tests/star_lord.jpg')}  
                        style= { styles.imageHeader}
                        blurRadius= { 10 }
                    >
                        <Image 
                            source={require('../assets/tests/star_lord.jpg')}  
                            style={ [styles.imageAvatar, {borderRadius: this.state.avatarRadius} ] } 
                            onLayout={(event) => this.changeRadius(event.nativeEvent)}  />
                        <Text h1 style= {styles.textWhite}>John Doe</Text>
                    </ImageBackground>
                        <View style={styles.containerInformations}>
                            <SectionList
                                renderItem={({ item, index, section }) => <Text key={index}>{item}</Text>}
                                renderSectionHeader={({section: {title}}) => (
                                    <Text h2 style={styles.titleProfile}>{title}</Text>
                                )}
                                sections={sections}
                                keyExtractor={(item, index) => item + index}
                            />
                        </View>
                </ScrollView>
              : null
        );
    }
}

export default Profile;

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
        color: '#e65100',
    },
    containerInformations: {
        margin: 16,
    },
    itemRow: {
        padding: 12,
        marginLeft: 4,
        marginRight: 4,
        flexDirection:  'row',
        justifyContent: 'flex-start',
        alignItems:     'center',
        //backgroundColor: '#fff',
    },
    itemRowLabel: {
        fontFamily: 'open-sans-light', 
        fontSize: 12,
        flex: 1,
    }, 
    itemRowValue: {
        fontFamily: 'open-sans-light', 
        fontSize : 16,
        flex: 2,
        textAlign: 'right'
    },
    itemRowCharacteristic : {
        padding: 12,
        marginLeft: 4,
        marginRight: 4,
        flexDirection:  'row',
        justifyContent: 'space-between',
        alignItems:     'center',
        //backgroundColor: '#fff',
    }

});