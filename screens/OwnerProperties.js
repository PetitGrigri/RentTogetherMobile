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
import LocationItem from '../Components/LocationItem';

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

    handleRefresh = () => {
        this.props.handleGetAppartementsPotentiels();
    }

    componentWillMount = () => {
        this.props.handleGetAppartementsPotentiels();
    }
    
    showMessages = (buildingId) => {
        let location = this.props.properties.filter(location => location.buildingId == buildingId)[0];

        this.props.navigation.navigate('messagesLogements', {
            title:      location.title, 
            owner:      location.ownerApiDto,
            buildingId: location.buildingId
        })
    }

    handleShowLocation= (item) => {
        this.props.navigation.navigate('locationDetails', {
            location:       item, 
            showMessages :  () => this.showMessages(item),
        });
    }

    getPropertyItem = (property) => {
        return (
            <LocationItem 
                {...property.item} 
                showMessages = { () => this.showMessages(property.item.buildingId) }
                handleShowLocation= { () => this.handleShowLocation(property.item) } />
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