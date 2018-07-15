import React, { Component } from 'react';
import { 
    FlatList,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import TabContent from '../Components/TabContent';
import { connect } from 'react-redux';
import ItemRowLocalisationSwipe from '../Components/Profile/ItemRowLocalisationSwipe';
import ItemRowLocalisationAdd from '../Components/Profile/ItemRowLocalisationAdd';
import { Ionicons } from '@expo/vector-icons';
import { handleSearchLocalisation, handleGetConnectedUserLocalisations, handleAddConnectedUserTargetLocation, handleDeleteConnectedTargetLocation } from '../actions/localisations';
import { empty } from '../utils/check';
import { cleanAccent } from '../utils/clean';

class UpdateLocalisations extends Component {

    constructor(props) {
        super(props)
        this.state = {
            recherche: ''
        }
    }

    handleSearchChange = (text) => {
        this.setState({ 
            recherche: text
        })
        if (!empty(text)) {
            text = cleanAccent(text);


            let isPostalCode = (Number.isInteger(Number.parseInt(text)) || (text.search(/2[ABab]/g) == 0))
            

            this.props.handleSearchLocalisation(
                (!isPostalCode) ? text : '', 
                isPostalCode    ? text : '');
        }
    }

    //Méthode permettant de rendre les lignes de la flat list
    getLocalisationItem = (props) => {

        if (this.state.recherche) {
            addInProgress = (this.props.loadingAddLocalisation.indexOf(props.item) >= 0);
            addDone =   (this.props.localisations.filter(targetLocation => 
                            (targetLocation.city == props.item.libelle) && (targetLocation.city2 == props.item.libelle2) && (targetLocation.postalCode == props.item.postalCodeId)
                        ).length > 0);

            return <ItemRowLocalisationAdd {...props} handleAdd={ this.handleAddLocalisation }  addInProgress={ addInProgress } addDone={ addDone }/>
        } else {
            deleteInProgress = (this.props.loadingDeleteTargetLocation.indexOf(props.item.targetLocationId) >= 0);

            return <ItemRowLocalisationSwipe {...props} handleDelete={ this.handleDeleteLocalisation }  deleteInProgress={deleteInProgress}   />
        }
    }

    handleDeleteLocalisation = (item) => {
        this.props.handleDeleteConnectedTargetLocation(item);
    }

    handleAddLocalisation = (item) => {
        this.props.handleAddConnectedUserTargetLocation(item);
    }

    handleClearSearch = () => {
        this.setState({
            recherche:  ''
        })
    }

    getSearchBar = () => {

        //TODO Transformer en composant
        return (
            <View style={styles.searchContainer} >
                { this.props.loadingSearchLocalisation 
                    ? <ActivityIndicator size="small" color='#ff8f00' style={ styles.loadinSearchIcon } /> 
                    : <Ionicons style={ styles.searchIcon } size={24} name='ios-search' /> 
                }
                <TextInput
                    style={styles.searchInput}
                    underlineColorAndroid="transparent"
                    value= { this.state.recherche }
                    placeholder='Nom de ville ou code postal à ajouter'
                    onChangeText= { this.handleSearchChange }
                />
                { this.state.recherche  
                    ? <TouchableOpacity onPress={ this.handleClearSearch }><Ionicons style={ styles.stopIcon } size={32} name='ios-close-outline' /></TouchableOpacity> 
                    : null 
                }
            </View>)
    }

    getData =() => {
        return (!this.state.recherche) ? this.props.localisations : this.props.searchLocalisations;
    }

    render() {
        return (
            <FlatList
                data={ this.getData() }
                keyExtractor={ (item, index) => item.targetLocationId ? `targetLocationId-${item.targetLocationId }` : `postalCode-${item.id }`  }
                ItemSeparatorComponent={ () => <View style={ styles.separator } /> }
                renderItem={(localisation) =>  this.getLocalisationItem(localisation)}
                refreshing={ this.props.loadingConversations }
                onRefresh={() => this.handleRefresh() }
                refreshing= { false }
                ListHeaderComponent={ this.getSearchBar }
            />

        );
    }
}

const mapStateToProps = state => ({
    loadingGetLocalisations:            state.localisations.loadingGetLocalisations,
    loadingSearchLocalisation:          state.localisations.loadingSearchLocalisation,
    localisations:                      state.localisations.localisations,
    searchLocalisations:                state.localisations.searchLocalisations,
    loadingAddLocalisation:             state.localisations.loadingAddLocalisation,
    loadingDeleteTargetLocation:        state.localisations.loadingDeleteTargetLocation,
});

const mapDispatchToProps = dispatch => ({
    handleGetConnectedUserLocalisations:    () => dispatch(handleGetConnectedUserLocalisations()),
    handleSearchLocalisation:               (city, postalCode) => dispatch(handleSearchLocalisation(city, postalCode)),
    handleAddConnectedUserTargetLocation:   (localisation) => dispatch(handleAddConnectedUserTargetLocation(localisation)),
    handleDeleteConnectedTargetLocation:    (localisation) => dispatch(handleDeleteConnectedTargetLocation(localisation))
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateLocalisations);


const styles = StyleSheet.create({
    searchContainer: {
        flexDirection:      'row',
        justifyContent:     'flex-start',
        alignItems:         'center',
        margin:             8,
        backgroundColor:    '#fff',
        borderRadius:       4,      
        height:             50,  
    },
    searchInput: {
        color:              '#000',
        fontFamily:         'open-sans-regular', 
        fontSize:           16,
        flex:               1,
        marginRight:        8,
        marginLeft:         8,
    },
    searchIcon: {
        paddingRight:       0,
        paddingLeft:        16,
        color:              '#000',
    },
    loadinSearchIcon: {
        paddingRight:       0,
        paddingLeft:        16,
    },
    stopIcon: {
        paddingLeft:        0,
        paddingRight:       16,
        color:              '#000',
    },
    separator: {
        height:             1, 
        backgroundColor:    '#efefef', 

    }
})