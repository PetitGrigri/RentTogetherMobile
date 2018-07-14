import React, { Component } from 'react';
import { 
    FlatList,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import Carousel from '../Components/Carousel';
import LocationImage from '../containers/LocationImage';
import TabContent from '../Components/TabContent';
import { handleGetAppartementsPotentiels } from '../actions/logements';
import { connect } from 'react-redux';
import NoMoreCard from '../Components/NoMoreCard';
import { LinearGradient } from 'expo';
import { Ionicons} from '@expo/vector-icons';

class OwnerProperties extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <Ionicons
                    onPress={() => navigation.navigate('addProperty') }
                    style={{marginRight: 16 }}
                    name='md-add' size={ 32 }
                    color="#fff"
                />
            ),
        };
    };

    constructor(props) {
        super(props)
    }
    

    componentDidMount = () => {
        //TODO
    };

    handleRefresh = () => {
        this.props.handleGetAppartementsPotentiels();
    }

    componentWillMount = () => {
        this.props.handleGetAppartementsPotentiels();
    }
    
    showMessages = (buildingId) => {
        //TODO
        let location = this.props.properties.filter(location => location.buildingId == buildingId)[0];
        console.log('todo', buildingId, location);

        this.props.navigation.navigate('messagesLogements', {
            title:      location.title, 
            owner:      location.ownerApiDto,
            buildingId: location.buildingId
        })
    }

    getPropertyItem = (property) => {

        //les images sont contenus dans buildingPictureInformationApiDtos. Si buildingPictureInformationApiDtos est null (cela est lié à l'ajout d'un appartement dans redux, on retourne un tableau vide)
        let images = property.item.buildingPictureInformationApiDtos ? property.item.buildingPictureInformationApiDtos.map( picture => {
            return <LocationImage pictureId={ picture.buildingPictureId } /> 
        }) : [];

        return (
            <View  style={ styles.propertyContainer }>
                <LinearGradient colors={['rgba(0,0,0,0)','rgba(0,0,0,0.1)', 'rgba(0,0,0, 0.6 )', ]} style={ styles.titlePropertContainer } start={[0, 1]} end={[0, 0]}>
                    <Text style={ styles.title }>{ property.item.title }</Text>
                    <TouchableOpacity onPress={ () => { this.showMessages(property.item.buildingId) } } >
                        <Ionicons color='#fff' name='ios-chatbubbles' size={32} />
                    </TouchableOpacity>
                </LinearGradient>
                { (images.length > 0)
                    ? <Carousel images={ images }/>
                    : <Image source={ require('../assets/no_building.png') }  />
                }
                
            </View>
        );   
    }

    render() {
        return (
            <FlatList
                data={this.props.properties}
                keyExtractor={item => `${item.buildingId}`}
                renderItem={(property) =>  this.getPropertyItem(property)}
                refreshing={ this.props.loadingGetAppartementsPotentiels }
                onRefresh={() => this.handleRefresh() }
                onEndReached={() => console.log('loadNext') }
                style={ styles.container }
            />
        );
    }
}

const mapToProps = state => ({
    loadingGetAppartementsPotentiels :  state.logements.loadingGetAppartementsPotentiels,
    properties:                         state.logements.appartementsPotentiels,
    message_error:                      state.logements.message_error
});

const mapDispatchToProps = dispatch => ({
    handleGetAppartementsPotentiels:     () => dispatch(handleGetAppartementsPotentiels()),
});
  
export default connect(
    mapToProps,
    mapDispatchToProps
)(OwnerProperties);


const styles = StyleSheet.create({
    container: {
        flex:           1,
        margin:         8
    },
    propertyContainer: {
        aspectRatio:     1.8,
        justifyContent: 'center',
        alignItems:     'center',
        borderRadius:   8,
        overflow:       'hidden',
        marginBottom:   8,
    },
    titlePropertContainer: {
        position:       'absolute',
        top:            0,
        right:          0,
        left:           0,
        height:         100,
        zIndex:         2,
        padding:        8,
        flexDirection:  'row',
        justifyContent: 'space-between',
        alignItems:     'flex-start',
    },
    title: {
        color:          '#fff',
        fontFamily:     'open-sans-light', 
        fontSize:       12,

    }
})