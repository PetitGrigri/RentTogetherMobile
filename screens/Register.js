import React, { Component } from 'react';
import { Alert, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Animated, StyleSheet, Text, View, ImageBackground, Image, Dimensions, KeyboardAvoidingView, Keyboard } from 'react-native';
import { connect } from 'react-redux'
import { handleCreateUser, handleHideError } from '../actions/utilisateurs'
import InputText from '../Components/InputText';
import ButtonSubmit from '../Components/ButtonSubmit';
import { empty } from '../utils/check';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email:          '',
            firstName:      '',
            lastName:       '',
            password:       '',
            phoneNumber:    '',
            displayTitle:   true,
            isRoomer:       true,
            isOwner:        false,
        }

        this.roomerTypeStyle = new Animated.Value(SCREEN_WIDTH/6);
        this.ownerTypeStyle = new Animated.Value(SCREEN_WIDTH/8);
    }





    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    keyboardDidShow = () => {
        this.setState({displayTitle:false});
    }

    keyboardDidHide = () => {
        this.setState({displayTitle:true});
    }

    handleClickLocataire = () => {
        this.setState({
            isRoomer: true,
            isOwner: false
        })

        Animated.timing(this.roomerTypeStyle, {
            duration: 300,
            toValue: SCREEN_WIDTH/6,
        }).start();

        Animated.timing(this.ownerTypeStyle, {
            duration: 300,
            toValue: SCREEN_WIDTH/8,
        }).start();
    }

    handleClickProprietaire = () => {
        this.setState({
            isRoomer: false,
            isOwner: true
        })

        Animated.timing(this.ownerTypeStyle, {
            duration: 300,
            toValue: SCREEN_WIDTH/6,
        }).start();

        Animated.timing(this.roomerTypeStyle, {
            duration: 300,
            toValue: SCREEN_WIDTH/8,
        }).start();
    }

    //Méthode destinée à la gestion de la connexion
    handleRegister = ()  => {
        //TODO vérifier données du formulaire

        this.props.handleCreateUser({
            email:      this.state.email,
            firstName:  this.state.firstName,
            lastName:   this.state.lastName,
            password:   this.state.password,
            phoneNumber:this.state.phoneNumber,
            isAdmin:    0,
            isRoomer:   this.state.isRoomer ? 1 : 0,
            isOwner:    this.state.isOwner ? 1 : 0
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //si l'on a un message d'erreur qui est transmis pour la tentative de connexion, on affiche un message d'erreur
        if ((prevProps.loadingAdd != this.props.loadingAdd) && (empty(this.props.message_error))) {
            Alert.alert(
                'Bienvenue',
                "Votre compte utilisateur vient d'être crée. Vous pouvez maintenant vous connecter",
                [
                    { text: 'OK', onPress: () => this.props.navigation.navigate('login') }
                ],
                { cancelable: false }
            )
        }
        //si l'on a un message d'erreur qui est transmis pour la tentative de connexion, on affiche un message d'erreur
        if ((prevProps.loadingAdd != this.props.loadingAdd) && (!empty(this.props.message_error))) {
            Alert.alert(
                'Erreur',
                this.props.message_error,
                [
                    { text: 'OK', onPress: () => this.props.handleHideError() },
                ],
                { cancelable: false }
            )
        }
    }

  render() {

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/login-screen-mobile.jpg')}
                style={styles.bgImage}
                >
                <ScrollView
                    scrollEnabled={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.container}
                    >
                    <KeyboardAvoidingView behavior="position" style={{alignItems: 'center', justifyContent:'center',flex:8}}>
                        <View style={{alignItems: 'center', justifyContent:'flex-end', flex:1 }}>
                            <Text style={styles.loginTitle}>Inscription</Text>
                            <Text style={styles.loginSubTitle}>Qui êtes vous ? </Text>
                        </View>

                        <View style={{alignItems: 'center', justifyContent:'space-around', flexDirection:'row', flex:1 }}>
                            <View style={{alignItems: 'center'}}>
                                <Text style={styles.typeText}>Un locataire</Text> 
                                <TouchableWithoutFeedback onPress={this.handleClickLocataire}>
                                    <Animated.Image source={require('../assets/locataire.png')} style={{width:this.roomerTypeStyle, height:this.roomerTypeStyle}} />
                                </TouchableWithoutFeedback>
                                
                            </View>
                            <View style={{alignItems: 'center'}}>
                                <Text style={styles.typeText}>Un propriétaire</Text>
                                <TouchableWithoutFeedback onPress={this.handleClickProprietaire}>
                                    <Animated.Image source={require('../assets/proprietaire.png')} style={{width:this.ownerTypeStyle, height:this.ownerTypeStyle}} />
                                </TouchableWithoutFeedback>
                                
                            </View>
                        </View>

                    
                        <View style={styles.form}>

                            <InputText 
                                onChangeText={(text) => this.setState({email:text}) } 
                                placeholder='Email' />

                                <InputText 
                                onChangeText={(text) => this.setState({lastName:text}) } 
                                placeholder='Nom' />

                            <InputText 
                                onChangeText={(text) => this.setState({firstName:text}) } 
                                placeholder='Prénom' />

                            <InputText 
                                onChangeText={(text) => this.setState({phoneNumber:text}) } 
                                placeholder='Téléphone' />

                            <InputText 
                                onChangeText={(text) => this.setState({password:text}) } 
                                placeholder='Mot de passe'
                                secureTextEntry />

                            <ButtonSubmit 
                                text="S'inscrire"
                                style={{marginTop:40}}
                                loading={ this.props.loadingAdd }
                                onPress={ this.handleRegister }
                                />
                        </View>
                    </KeyboardAvoidingView>

                    <View style={{alignItems: 'center', justifyContent:'center',  flex:1}}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('login')}>
                            <Text style={styles.footerText}>Se connecter</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
  }
}



const mapStateToProps = state => ({
    loadingAdd:     state.utilisateurs.loadingAdd,
    message_error:  state.utilisateurs.message_error,

});

const mapDispatchToProps = dispatch => ({
    handleCreateUser:  (dataFormulaire) => dispatch(handleCreateUser(dataFormulaire)),
    handleHideError:    () => dispatch (handleHideError()),
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  loginTitle: {
    fontFamily: 'open-sans-light', 
    fontSize: 44,
    color: '#e65100'
  },
  loginSubTitle: {
    fontFamily: 'open-sans-regular', 
    fontSize: 22,
    color: '#fff'
  },

  typeIcon:{
    width: SCREEN_WIDTH/5,
    height: SCREEN_WIDTH/5,
  },
  typeText:{
    fontFamily: 'open-sans-regular', 
    fontSize: 12,
    marginTop:10,
    color: '#e65100', 
  },
  form: {
    width: SCREEN_WIDTH*0.80, 
  },
  footerText: {
    fontFamily: 'open-sans-regular', 
    fontSize: 12,
    color: '#fff'
  },
});
