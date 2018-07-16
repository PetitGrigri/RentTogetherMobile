/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */
import React, { Component } from 'react';
import { 
    FlatList,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import ItemRowLocalisationSelect from '../Components/ItemRowLocalisationSelect';
import { Ionicons } from '@expo/vector-icons';
import { handleSearchLocalisation, handleGetConnectedUserLocalisations, handleAddConnectedUserTargetLocation, handleDeleteConnectedTargetLocation } from '../actions/localisations';
import { empty } from '../utils/check';
import { cleanAccent } from '../utils/clean';
import PropTypes from 'prop-types';

class ModalLocalisation extends Component {

    static proptTypes = {
        handleSelect:    PropTypes.func.isRequired, 
        handleClose:     PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            recherche:      '',
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
        let addInProgress = false;
        let addDone =       false;

        return <ItemRowLocalisationSelect {...props} handleSelect={ this.props.handleSelect }  addInProgress={ addInProgress } addDone={ addDone }/>

    }

    handleClearSearch = () => {
        if (!empty(this.state.recherche)) {
            this.setState({
                recherche:      ''
            });
        } else {
            this.props.handleClose();
        }
    }

    getSearchBar = () => {

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
                <TouchableOpacity onPress={ this.handleClearSearch }><Ionicons style={ styles.stopIcon } size={32} name='ios-close-outline' /></TouchableOpacity> 
            </View>);
    }

    getData =() => {
        return this.state.recherche ? this.props.searchLocalisations : [];
    }

    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.modalVisible}
                onRequestClose={ this.props.handleClose }>

                <View style={ styles.modalContent}>
                    <Text h2 style={styles.titleProfile}>Sélectionner une localisation</Text>

                    <FlatList
                        data={ this.getData() }
                        keyExtractor={ (item, index) => item.targetLocationId ? `targetLocationId-${item.targetLocationId }` : `postalCode-${item.id }`  }
                        ItemSeparatorComponent={ () => <View style={ styles.separator } /> }
                        renderItem={(localisation) =>  this.getLocalisationItem(localisation)}
                        refreshing={ this.props.loadingConversations }
                        refreshing= { false }
                        ListHeaderComponent={ this.getSearchBar }
                    />
                </View>
            </Modal>
        );
    }
}

const mapStateToProps = state => ({
    loadingSearchLocalisation:          state.localisations.loadingSearchLocalisation,
    searchLocalisations:                state.localisations.searchLocalisations,

});

const mapDispatchToProps = dispatch => ({
    handleSearchLocalisation:               (city, postalCode) => dispatch(handleSearchLocalisation(city, postalCode)),
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalLocalisation);


const styles = StyleSheet.create({
    modalContent: {
        backgroundColor:    '#eee',
        flex:               1, 
        padding:            16
    },
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
    },
    titleProfile: {
        fontFamily: 'open-sans-light', 
        color:      '#e65100',
        fontSize:   24,
    }
})