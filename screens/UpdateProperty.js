/**
 * Application : Rent Together
 * Auteur : Griselles Fabien
 * Version 0.9
 */
import React, { Component } from 'react';
import {  View, Text, ScrollView, Keyboard, StyleSheet, Alert, ImageBackground, Switch } from 'react-native';
import ButtonSubmit from '../Components/ButtonSubmit';
import InputTextApplication from '../Components/InputTextApplication';
import InputTextareaApplication from '../Components/InputTextareaApplication';
import { MaterialIcons, Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import { ModalLocalisation, LocationImage } from '../containers';
import { connect } from 'react-redux';
import { handleHideError, handlePutAppartement, handleUploadBuildingMedia } from '../actions/logements';
import { empty } from '../utils/check';
import Carousel from '../Components/Carousel';
import TouchableIcon from '../Components/TouchableIcon';
import { LinearGradient } from 'expo';
import { takeAPhoto}  from '../utils/photo';

const REQUIRED_VALUES=["title", "description", "address", "nbRoom", "nbPiece", "nbRenters", "nbMaxRenters", "area", "price", "city", "localisationResume"];

class UpdateProperty extends Component {

    
    constructor(props) {
        super(props);

        let location = this.props.location;

        this.state = {        
            buildingId:         location.buildingId,
            title:              location.title||'',
            description:        location.description||'',
            address:            location.address||'',
            address2:           location.address2||'',
            nbRoom:             location.nbRoom.toString()||'',
            nbPiece:            location.nbPiece.toString()||'',
            nbRenters:          location.nbRenters.toString()||'',
            nbMaxRenters:       location.nbMaxRenters.toString()||'',
            area:               location.area.toString()||'',
            price:              location.price.toString()||'',
            isRent:             location.isRent||0,
            city:               location.city||'',
            city2:              location.city2||'',
            postalCode:         location.postalCode||'',
            localisationResume: `${location.city||''} ${location.city2||''} (${location.postalCode||''})`||'',
            errorInput:         [],
            footerHeight:       0,
            modalVisible:       false
        }
        this.scrollView = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Si on a une erreur lors de la mise à jour de l'utilisateur
        if (prevProps.loadingPutBuilding && !this.props.loadingPutBuilding && (!empty(this.props.message_error))) {
            Alert.alert(
                'Erreur',
                this.props.message_error,
                [
                    {text: 'OK', onPress: () => this.props.handleHideError()},
                ],
                { cancelable: true }
            );
        }
        // Si l'on n'a pas d'erreur lors de la mise à jour de l'utilisateur
        if (prevProps.loadingPutBuilding && !this.props.loadingPutBuilding && (empty(this.props.message_error))) {
            Alert.alert(
                '',
                "Votre location a été mise à jour",
                [
                    {text: 'OK', onPress: () => this.props.navigation.goBack()},
                ],
                { cancelable: true }
            );
        }
        
        // Si l'on a une erreur lors de l'upload d'une image
        if (prevProps.buildingMediaUploading && !this.props.buildingMediaUploading && (!empty(this.props.message_error))) {
            Alert.alert(
                'Erreur',
                this.props.message_error,
                [
                    {text: 'OK', onPress: () => this.props.handleHideError()},
                ],
                { cancelable: true }
            );
        }
    }

    
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

    updateIsRent(value) {
        this.setState({
            isRent:     value ? 0 : 1
        })
    }

    sumbit = () => {
        // Initialisation de l'appartement
        let building = {
            buildingId:         this.state.buildingId,
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
            isRent:             this.state.isRent,
        }

        if ((this.checkForm()) && (!this.props.loadingPutBuilding)) {
            // Demande de MàJ de l'appartement
            this.props.handlePutAppartement(building);
        } else {
            Alert.alert(
                'Attention',
                "Vous n'avez pas saisi tout les champs nécessaires.",
                [
                    { text: 'OK' }
                ],
                { cancelable: false }
            )
        }

        
    }

    /**
     * Fonction permettant à l'utilisateur de prendre une photo et de l'uploader
     */
    pickAPhoto = async () => {

        let nbImages = (this.props.location.buildingPictureInformationApiDtos ||[]).length;

        if (nbImages >= 3) {
            Alert.alert(
                'Avertissement',
                "Il n'est pas possible d'avoir plus de 3 photos par appartement.",
                [
                  {text: 'OK'}
                ],
                { cancelable: true }
              )
        } else {
            // Réalisation et compression d'une photo
            let uriPhoto = await takeAPhoto();

            if (uriPhoto) {
                //transmission de la photo 
                this.props.handleUploadBuildingMedia(uriPhoto, this.state.buildingId);
            }
        }

    }

    checkForm = () => {
        let checkForm = REQUIRED_VALUES.filter(value => empty(this.state[value]));

        //on ajoute les formulaires erronés
        this.setState({errorInput: checkForm});

        return (checkForm.length <= 0)
    }

    isInputError = (who) => {
        return (this.state.errorInput.filter(name => name === who).length > 0)
    }

    updateValue = (who, val) => {
        if (empty(val)) {
            this.setState({
                [who] :     val
            });
        } else {
            this.setState({
                [who] :     val,
                errorInput: this.state.errorInput.filter(name => ((name !== who)))
            })
        }
    }

    render() {

        let buildingPictureInformationApiDtos = this.props.location.buildingPictureInformationApiDtos;
        
        //les images sont contenus dans buildingPictureInformationApiDtos. Si buildingPictureInformationApiDtos est null (cela est lié à l'ajout d'un appartement dans redux, on retourne un tableau vide)
        let images =  buildingPictureInformationApiDtos? buildingPictureInformationApiDtos.map( picture => {
            return <LocationImage pictureId={ picture.buildingPictureId } /> 
        }) : [];

        return (
            <View style={ styles.container} >
                <ModalLocalisation 
                    modalVisible={ this.state.modalVisible } 
                    handleSelect={ this.localisationSelected } 
                    handleClose={ this.localisationClose }
                />

                <ScrollView scrollEnabled={true} keyboardShouldPersistTaps="handled" ref={ this.scrollView}>

                    <LinearGradient style={ styles.imageHeaderIcons } colors={['rgba(0,0,0,0)', 'rgba(0,0,0, 0.6 )', ]} start={[0, 1]} end={[0, 0]}>
                        <TouchableIcon 
                            action={ this.pickAPhoto } 
                            icon={ <Ionicons color='#fff' name='ios-camera' size={32} /> } 
                            loadingColor='#fff' 
                            loading={ this.props.buildingMediaUploading } />
                    </LinearGradient>

                    <View style={ styles.imageHeader }>
                        { (images.length > 0)
                            ? <Carousel images={ images }/>
                            : <ImageBackground source={ require('../assets/no_building.png') } style={{ width: '100%', height: '100%'}}/>
                        }
                    </View>

                    <View style={ styles.cardBottomTop } />

                    <View style={ styles.containerForm}>
                        <Text h2 style={styles.titleProfile}>Description</Text>

                        <InputTextApplication 
                            onScrollTo={ (yPosition) => this.scrollTo(yPosition) }
                            iconLeft= { <MaterialIcons name='title' size={ 18 } color='#ff8f00' style={styles.iconLeft} /> }
                            onChangeText={(text) => this.updateValue("title", text) } 
                            error={ this.isInputError("title") }
                            value={ this.state.title }
                            keyboardType='default'
                            placeholder='Description courte'/>

                        <InputTextareaApplication 
                            onScrollTo={ (yPosition) => this.scrollTo(yPosition) }
                            iconLeft= { <Entypo name='text' size={ 18 } color='#ff8f00' style={styles.iconLeft}/> }
                            onChangeText={(text) => this.updateValue("description", text) } 
                            error={ this.isInputError("description") }
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
                            onChangeText={(text) => this.updateValue("nbRoom", text) } 
                            error={ this.isInputError("nbRoom") }
                            value={ this.state.nbRoom }
                            keyboardType='numeric'
                            placeholder='Nombre chambre'
                        />

                        <InputTextApplication 
                            onScrollTo={ (yPosition) => this.scrollTo(yPosition) }
                            iconLeft= { <FontAwesome name='cube' size={ 18 } color='#ff8f00' style={styles.iconLeft}/> }
                            onChangeText={(text) => this.updateValue("nbPiece", text) } 
                            error={ this.isInputError("nbPiece") }
                            value={ this.state.nbPiece }
                            keyboardType='numeric'
                            placeholder='Nombre pièce'
                        />


                        <InputTextApplication 
                            onScrollTo={ (yPosition) => this.scrollTo(yPosition) }
                            iconLeft= { <FontAwesome name='user' size={ 18 } color='#ff8f00' style={styles.iconLeft}/> }
                            onChangeText={(text) => this.updateValue("nbRenters", text) } 
                            error={ this.isInputError("nbRenters") }
                            value={ this.state.nbRenters }
                            keyboardType='numeric'
                            placeholder='Nombre colocataires'
                        />

                        <InputTextApplication 
                            onScrollTo={ (yPosition) => this.scrollTo(yPosition) }
                            iconLeft= { <FontAwesome name='users' size={ 18 } color='#ff8f00' style={styles.iconLeft}/> }
                            onChangeText={(text) => this.updateValue("nbMaxRenters", text) } 
                            error={ this.isInputError("nbMaxRenters") }
                            value={ this.state.nbMaxRenters }
                            keyboardType='numeric'
                            placeholder='Nombre de colocataires max'
                        />

                        <InputTextApplication 
                            onScrollTo={ (yPosition) => this.scrollTo(yPosition) }
                            iconLeft= { <Entypo name='resize-full-screen' size={ 18 } color='#ff8f00' style={styles.iconLeft} /> }
                            onChangeText={(text) => this.updateValue("area", text) } 
                            error={ this.isInputError("area") }
                            value={ this.state.area }
                            keyboardType='numeric'
                            placeholder='Surface (m2)'
                        />

                        <InputTextApplication 
                            onScrollTo={ (yPosition) => this.scrollTo(yPosition) }
                            iconLeft= { <FontAwesome name='euro' size={ 18 } color='#ff8f00' style={styles.iconLeft} /> }
                            onChangeText={(text) => this.updateValue("price", text) } 
                            error={ this.isInputError("price") }
                            value={ this.state.price }
                            keyboardType='numeric'
                            placeholder='Prix en euro / personne'
                        />

                        <Text h2 style={styles.titleProfile}>Localisation</Text>

                        <InputTextApplication 
                            onScrollTo={ (yPosition) => this.scrollTo(yPosition) }
                            iconLeft= { <MaterialIcons name='place' size={ 18 } color='#ff8f00' style={styles.iconLeft} /> }
                            onChangeText={(text) => this.updateValue("address", text) } 
                            error={ this.isInputError("address") }
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

                            error={ this.isInputError("localisationResume") }
                            value={ this.state.localisationResume }
                            keyboardType='default'
                            placeholder='Ville'
                        />

                        <View style={styles.containerSwitch} > 
                            <Text style={styles.textSwitch}>Logement disponible</Text>
                            <Switch
                                onValueChange = { value => this.updateIsRent(value) }
                                value = { this.state.isRent ? false : true } 
                                tintColor='#ccc'
                                thumbTintColor={ this.state.isRent ? '#eee':  '#ff8f00' }
                                onTintColor='#ffc985'    
                            />
                        </View>

                        <ButtonSubmit 
                            text="Modifier cet appartement"
                            style={{marginTop:40, marginBottom: 40}}
                            loading={ this.props.loadingPutBuilding }
                            onPress={ this.sumbit }
                        />

                        <View  style={{ height: this.state.footerHeight}} />

                    </View>
                </ScrollView>
            </View>
        );
    }
}



const mapStateToProps = (state, props) => ({
    loadingPutBuilding:     state.logements.loadingPutBuilding,
    message_error:          state.logements.message_error,
    buildingMediaUploading: state.logements.buildingMediaUploading,
    location:               state.logements.appartementsPotentiels.filter(building => building.buildingId === props.navigation.getParam('buildingId'))[0]
});

const mapDispatchToProps = dispatch => ({
    handlePutAppartement:       (building) => dispatch(handlePutAppartement(building)),
    handleHideError:            () => dispatch(handleHideError()),
    handleUploadBuildingMedia:  (uri, buildingId) => dispatch(handleUploadBuildingMedia(uri, buildingId)),
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateProperty);




const styles = StyleSheet.create({
    container: {
        flex:       1,
        backgroundColor:    '#eee'
    },
    containerForm: {
        margin:    16,
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
    imageHeader: {
        width:          '100%',
        aspectRatio:    1.8,
        justifyContent: 'center',
        alignItems:     'center',
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
        zIndex:             3,
        top:                0,
        left:               0,
        right:              0,
        paddingLeft:        16,
        paddingRight:       16,
        justifyContent:     'flex-end',
        alignItems:         'flex-start',
        flexDirection:      'row',
    }, 
    containerSwitch: {
        flex:               1,
        flexDirection:      'row',
        justifyContent:     'space-between',
        alignItems:         'center',
        padding:            8
    },
    textSwitch: {
        fontFamily:     'open-sans-light',
        fontSize:       16,     
        color:          '#000',
    }
})