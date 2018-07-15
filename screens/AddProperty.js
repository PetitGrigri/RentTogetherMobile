import React, { Component } from 'react';
import {  View, Text, ScrollView, Keyboard, StyleSheet, Alert } from 'react-native';
import ButtonSubmit from '../Components/ButtonSubmit';
import InputTextApplication from '../Components/InputTextApplication';
import InputTextareaApplication from '../Components/InputTextareaApplication';
import { MaterialIcons, Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import { ModalLocalisation } from '../containers';
import { connect } from 'react-redux';
import { handlePostAppartement, handleHideError } from '../actions/logements';
import { empty } from '../utils/check';

class AddProperty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title:              '',
            description:        '',
            address:            '',
            address2:           '',
            nbRoom:             '',
            nbPiece:            '',
            nbRenters:          '',
            nbMaxRenters:       '',
            area:               '',
            price:              '',
            city:               '',
            city2:              '',
            postalCode:         '',
            localisationResume: '',
            footerHeight:       0,
            modalVisible:       false
        }
        this.scrollView = React.createRef();
    }

    componentDidUpdate = (prevProps, prevState) => {
        //si l'on a un message d'erreur qui est transmis pour la tentative de connexion, on affiche un message d'erreur
        if (prevProps.loadingPostBuilding && !this.props.loadingPostBuilding && (empty(this.props.message_error))) {
            Alert.alert(
                'Logement créé',
                "Votre logement vient d'être créé vous pouvez maintenant, ajouter des photos de ce dernier et le rendre disponible à la location.",
                [
                    { text: 'OK', onPress: () => this.props.navigation.navigate('properties') }
                ],
                { cancelable: false }
            )
        }
        //si l'on a un message d'erreur qui est transmis pour la tentative de connexion, on affiche un message d'erreur
        if (prevProps.loadingPostBuilding && !this.props.loadingPostBuilding && (!empty(this.props.message_error)))  {
            Alert.alert(
                'Erreur',
                this.props.message_error,
                [
                    { text: 'OK', onPress: () => this.props.handleHideError() },
                ],
                { cancelable: false }
            )
        }
    };
    
    componentDidMount = () => {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',  this.keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',  this.keyboardDidHide);
    }

    componentWillUnmount () {
        // On arrête l'écoute du clavier
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    keyboardDidShow = (event) => {
        this.setState({
            footerHeight: event.endCoordinates.height
        })
    }

    keyboardDidHide = (event) => {
         this.setState({
            footerHeight: 0
        })
    }

    scrollTo = (yPosition) => {
        this.scrollView.current.scrollTo({x: 0, y: yPosition, animated: true});
    }

    localisationSelected = (item) => {
        console.log(item);

        this.setState({
            city:               item.libelle,
            city2:              item.libelle2,
            postalCode:         item.postalCodeId,
            localisationResume: `${item.libelle} ${item.libelle2} (${item.postalCodeId})`
        });

        this.localisationClose();
    }

    localisationClose= () => {
        this.setState({
            modalVisible:false
        });
    }

    sumbit = () => {
        // Initialisation de l'appartement
        let building = {
            title:              this.state.title,
            description:        this.state.description,
            address:            this.state.address,
            address2:           this.state.address2,
            nbRoom:             this.state.nbRoom,
            nbPiece:            this.state.nbPiece,
            nbRenters:          this.state.nbRenters,
            nbMaxRenters:       this.state.nbMaxRenters,
            area:               this.state.area,
            price:              this.state.price,
            city:               this.state.city,
            city2:              this.state.city2,
            postalCode:         this.state.postalCode,
            isRent:             0
        }

        // Demande de création de l'appartement
        this.props.handlePostAppartement(building);
    }

    render() {
        return (
            <View styles={ styles.container}>

                <ModalLocalisation 
                    modalVisible={ this.state.modalVisible } 
                    handleSelect={ this.localisationSelected } 
                    handleClose={ this.localisationClose }
                />

                <ScrollView scrollEnabled={true} keyboardShouldPersistTaps="handled" style={ styles.container } ref={ this.scrollView}>

                    <Text h2 style={styles.titleProfile}>Description</Text>

                    <InputTextApplication 
                        onScrollTo={ (yPosition) => this.scrollTo(yPosition) }
                        iconLeft= { <MaterialIcons name='title' size={ 18 } color='#ff8f00' style={styles.iconLeft} /> }
                        onChangeText={(text) => this.setState({ title: text }) } 
                        value={ this.state.title }
                        keyboardType='default'
                        placeholder='Description courte'/>

                    <InputTextareaApplication 
                        onScrollTo={ (yPosition) => this.scrollTo(yPosition) }
                        iconLeft= { <Entypo name='text' size={ 18 } color='#ff8f00' style={styles.iconLeft}/> }
                        onChangeText={(text) => this.setState({ description: text }) } 
                        value={ this.state.description }
                        multiline={true}
                        numberOfLines={10}
                        keyboardType='default'
                        placeholder='Description longue'
                    />
                
                    <Text h2 style={styles.titleProfile}>Caractéristiques</Text>

                    <InputTextApplication 
                        onScrollTo={ (yPosition) => this.scrollTo(yPosition) }
                        iconLeft= { <FontAwesome name='bed' size={ 18 } color='#ff8f00' style={styles.iconLeft}/> }
                        onChangeText={(text) => this.setState({ nbRoom: text }) } 
                        value={ this.state.nbRoom }
                        keyboardType='numeric'
                        placeholder='Nombre chambre'
                    />

                    <InputTextApplication 
                        onScrollTo={ (yPosition) => this.scrollTo(yPosition) }
                        iconLeft= { <FontAwesome name='cube' size={ 18 } color='#ff8f00' style={styles.iconLeft}/> }
                        onChangeText={(text) => this.setState({ nbPiece: text }) } 
                        value={ this.state.nbPiece }
                        keyboardType='numeric'
                        placeholder='Nombre pièce'
                    />


                    <InputTextApplication 
                        onScrollTo={ (yPosition) => this.scrollTo(yPosition) }
                        iconLeft= { <FontAwesome name='user' size={ 18 } color='#ff8f00' style={styles.iconLeft}/> }
                        onChangeText={(text) => this.setState({ nbRenters: text }) } 
                        value={ this.state.nbRenters }
                        keyboardType='numeric'
                        placeholder='Nombre colocataires'
                    />

                    <InputTextApplication 
                        onScrollTo={ (yPosition) => this.scrollTo(yPosition) }
                        iconLeft= { <FontAwesome name='users' size={ 18 } color='#ff8f00' style={styles.iconLeft}/> }
                        onChangeText={(text) => this.setState({ nbMaxRenters: text }) } 
                        value={ this.state.nbMaxRenters }
                        keyboardType='numeric'
                        placeholder='Nombre de colocataires max'
                    />

                    <InputTextApplication 
                        onScrollTo={ (yPosition) => this.scrollTo(yPosition) }
                        iconLeft= { <Entypo name='resize-full-screen' size={ 18 } color='#ff8f00' style={styles.iconLeft} /> }
                        onChangeText={(text) => this.setState({ area: text }) } 
                        value={ this.state.area }
                        keyboardType='numeric'
                        placeholder='Surface (m2)'
                    />

                    <InputTextApplication 
                        onScrollTo={ (yPosition) => this.scrollTo(yPosition) }
                        iconLeft= { <FontAwesome name='euro' size={ 18 } color='#ff8f00' style={styles.iconLeft} /> }
                        onChangeText={(text) => this.setState({ price: text }) } 
                        value={ this.state.price }
                        keyboardType='numeric'
                        placeholder='Prix en euro / personne'
                    />

                    <Text h2 style={styles.titleProfile}>Localisation</Text>

                    <InputTextApplication 
                        onScrollTo={ (yPosition) => this.scrollTo(yPosition) }
                        iconLeft= { <MaterialIcons name='place' size={ 18 } color='#ff8f00' style={styles.iconLeft} /> }
                        onChangeText={(text) => this.setState({ address: text }) } 
                        value={ this.state.address }
                        placeholder='Adresse'
                    />

                    <InputTextApplication 
                        onScrollTo={ (yPosition) => this.scrollTo(yPosition) }
                        iconLeft= { <View style={{ width: 40, height: 16 }} /> }
                        onChangeText={(text) => this.setState({ address2: text }) } 
                        value={ this.state.address2 }
                        keyboardType='default'
                        placeholder='Adresse (complément)'
                    />

                    <InputTextApplication 
                        iconLeft= { <Ionicons style={ styles.iconLeft } size={18} name='ios-search' />  }
                        onScrollTo={ (yPosition) => this.scrollTo(yPosition) }
                        onFocus={ () => this.setState({modalVisible:true}) }
                        value={ this.state.localisationResume }
                        keyboardType='default'
                        placeholder='Ville'
                    />

                    <ButtonSubmit 
                        text="Ajouter cet appartement"
                        onScrollTo={ (yPosition) => this.scrollTo(yPosition) }
                        style={{marginTop:40, marginBottom: 40}}
                        loading={ this.props.loadingPostBuilding }
                        onPress={ this.sumbit }
                    />
                    <View  style={{ height: this.state.footerHeight}} />
                </ScrollView>
            </View>
        );
    }
}



const mapToProps = state => ({
    loadingPostBuilding :   state.logements.loadingPostBuilding,
    message_error:          state.logements.message_error
});

const mapDispatchToProps = dispatch => ({
    handlePostAppartement:  (building) => dispatch(handlePostAppartement(building)),
    handleHideError:        () => dispatch(handleHideError())
});
  
export default connect(
    mapToProps,
    mapDispatchToProps
)(AddProperty);




styles = StyleSheet.create({
    container: {
        padding:    16
        
    },
    containerForm: {
        flex:   1,
        flexDirection: 'row',
    },
    columnRight:{
        flex: 1,
        paddingLeft:8,
    },
    columnLeft:{
        flex: 1,
        paddingRight:8,
    },
    iconLeft: {
        paddingRight:       8,
        paddingLeft:        16,
        color:              '#000',
    },
    titleProfile: {
        fontFamily: 'open-sans-light', 
        color:      '#e65100',
        flex:       1,
        fontSize:   24,
    },
})