import React, { Component } from 'react';
import { TouchableWithoutFeedback, Animated, StyleSheet, Text, View, ImageBackground, Image, Dimensions, KeyboardAvoidingView, Keyboard } from 'react-native';
import { connect } from 'react-redux'
import { handleCreateUser } from '../actions/utilisateurs'
import { Font } from 'expo';
import { Link } from 'react-router-native'
import InputText from '../Components/InputText';
import ButtonSubmit from '../Components/ButtonSubmit';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email:'',
            firstName: '',
            lastName: '',
            password:'',
            fontLoaded:false,
            displayTitle:true,
            isRoomer:true,
            isOwner:false,
        }

        this.roomerTypeStyle = new Animated.Value(SCREEN_WIDTH/4);
        this.ownerTypeStyle = new Animated.Value(SCREEN_WIDTH/6);
    }
    componentDidMount() {
        Font.loadAsync({
            'open-sans-light': require('../assets/fonts/Open_Sans/OpenSans-Light.ttf'),
            'open-sans-regular': require('../assets/fonts/Open_Sans/OpenSans-Regular.ttf'),
        }).then(() => {
            this.setState({fontLoaded: true});
        });

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    keyboardDidShow = () => {
        console.log('SHOW');
        
        this.setState({displayTitle:false});
    }

    keyboardDidHide = () => {
        console.log('HIDE');

        this.setState({displayTitle:true});
    }

    handleClickLocataire = () => {
        console.log('LOCATAIRE');
        this.setState({
            isRoomer: true,
            isOwner: false
        })

        Animated.timing(this.roomerTypeStyle, {
            duration: 300,
            toValue: SCREEN_WIDTH/4,
        }).start();

        Animated.timing(this.ownerTypeStyle, {
            duration: 300,
            toValue: SCREEN_WIDTH/6,
        }).start();
    }

    handleClickProprietaire = () => {
        console.log('PROPRIETAIRE');
        this.setState({
            isRoomer: false,
            isOwner: true
        })

        Animated.timing(this.ownerTypeStyle, {
            duration: 300,
            toValue: SCREEN_WIDTH/4,
        }).start();

        Animated.timing(this.roomerTypeStyle, {
            duration: 300,
            toValue: SCREEN_WIDTH/6,
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
            isRoomer:   this.state.isRoomer,
            isOwner:    this.state.isOwner,
        })
    }

  render() {

    return (
        this.state.fontLoaded 
            ?   <View style={styles.container}>
                    <ImageBackground
                        source={require('../assets/login-screen-mobile.jpg')}
                        style={styles.bgImage}
                        >
                        
                        { this.state.displayTitle 
                            ?   <View style={{alignItems: 'center', justifyContent:'center', flex:1 }}>
                                    <Text style={styles.loginTitle}>Inscription</Text>
                                </View>
                            : null }

                        <View style={{alignItems: 'center', justifyContent:'center', flex:1 }}>
                            <Text style={styles.loginSubTitle}>Qui êtes vous ? </Text>
                        </View>

                        <View style={{alignItems: 'center', justifyContent:'space-evenly', flexDirection:'row', flex:1 }}>
                            <View style={{alignItems: 'center'}}>
                                <TouchableWithoutFeedback onPress={this.handleClickLocataire}>
                                    <Animated.Image source={require('../assets/locataire.png')} style={{width:this.roomerTypeStyle, height:this.roomerTypeStyle}} />
                                </TouchableWithoutFeedback>
                                <Text style={styles.typeText}>Un Propriétaire</Text>
                            </View>
                            <View style={{alignItems: 'center'}}>
                                <TouchableWithoutFeedback onPress={this.handleClickProprietaire}>
                                    <Animated.Image source={require('../assets/proprietaire.png')} style={{width:this.ownerTypeStyle, height:this.ownerTypeStyle}} />
                                </TouchableWithoutFeedback>
                                <Text style={styles.typeText}>Un Locataire</Text>
                            </View>
                        </View>

                        <KeyboardAvoidingView behavior="padding" style={{alignItems: 'center', justifyContent:'center',flex:3}}>
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
                                    onChangeText={(text) => this.setState({password:text}) } 
                                    placeholder='Mot de passe'
                                    secureTextEntry />

                                <ButtonSubmit 
                                    text="S'inscrire"
                                    loading={ this.props.loadingAdd }
                                    onPress={ this.handleRegister }
                                    />
                            </View>
                        </KeyboardAvoidingView>
                    </ImageBackground>
                </View>
            :   null
    );
  }
}



const mapStateToProps = state => ({
    loadingAdd: state.utilisateurs.loadingAdd,
    message_popup_success: state.utilisateurs.message_popup_success,
    message_popup_error: state.utilisateurs.message_popup_error,
});

const mapDispatchToProps = dispatch => ({
    handleCreateUser:  (dataFormulaire) => dispatch(handleCreateUser(dataFormulaire)),
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
    color: '#fff'
  },
  loginSubTitle: {
    fontFamily: 'open-sans-regular', 
    fontSize: 22,
    color: '#ef6c00'
  },

  typeIcon:{
    width: SCREEN_WIDTH/5,
    height: SCREEN_WIDTH/5,
  },
  typeText:{
    fontFamily: 'open-sans-regular', 
    fontSize: 14,
    marginTop:10,
    color: '#ef6c00', 
  },
  form: {
    width: SCREEN_WIDTH*0.80, 
  },
});
