import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'
import { handleSignIn, handleHideError } from '../actions/connection.js'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login:'',
            password:''
        }
        this.handleSignIn = this.handleSignIn.bind(this);

    }

    //Méthode destinée à la gestion de la connexion
    handleSignIn() {
        console.log(this.state.login, this.state.password);
        //TODO vérifier données du formulaire
        this.props.hangleSignIn(this.state.login, this.state.password);
    }

  render() {

    return (
        <View style={styles.container}>
            
            <ImageBackground
                source={require('../assets/login-screen-mobile.jpg')}
                style={styles.bgImage}
                >
                <KeyboardAvoidingView behavior="padding">
                    <View style={{alignItems: 'center', justifyContent:'center',  flex:1}}>
                        <Image source={require('../assets/logo.png')} style={styles.logo} />
                    </View>
                    
                    <View style={{width: '80%', alignItems: 'center', flex:1}}>
                        <View style={styles.form}>
                            <View style={styles.formInputContainer}>
                                <TextInput
                                    keyboardType='email-address'
                                    placeholder='Email'
                                    style={styles.formInput}
                                    underlineColorAndroid="transparent"
                                    onChangeText={(text) => this.setState({login:text})}
                                    value={this.state.login ||''}
                                    />
                            </View>
                        </View>
                        <View style={styles.form}>
                            <View style={styles.formInputContainer}>
                                <TextInput
                                    placeholder='Mot de passe'
                                    style={styles.formInput}
                                    underlineColorAndroid="transparent"
                                    secureTextEntry
                                    onChangeText={(text) => this.setState({password:text})}
                                    value={this.state.password ||''}
                                    />
                            </View>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={{marginTop:50}}
                            onPress={this.handleSignIn}
                            >
                            <View style={styles.formSubmitButton}>
                                <Text style={styles.formSubmitButtonText}>
                                    Login
                                </Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    );
  }
}



const mapStateToProps = state => ({
    loadingSignIn: state.connection.loadingSignIn, 
    isAuthenticated: state.connection.isAuthenticated, 
    message: state.connection.message,
});

const mapDispatchToProps = dispatch => ({
    hangleSignIn: (login, password) => dispatch(handleSignIn(login, password)),
    handleHideError: () => dispatch(handleHideError())
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);


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
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo:{
    width: SCREEN_WIDTH/4,
    height: SCREEN_WIDTH/4,
  },
  loginView: {
    marginTop: 150,
    backgroundColor: 'transparent',
    width: 250,
    height: 400,
  },
  loginTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  travelText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'bold'
  },
  plusText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'regular'
  },
  loginInput: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerView: {
    marginTop: 20,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: SCREEN_WIDTH*0.80, 
  },
  formInputContainer: {
    height: 40, 
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.50)',
    marginBottom:5,
    marginTop:5,
    elevation:2
  },
  formInput:{
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    color:'#ff6D00',
  }, 
  formSubmitButtonText: {
    color: '#fff'
  },
  formSubmitButton: {
    height: 40, 
    width: SCREEN_WIDTH*0.80,
    borderColor: 'gray', 
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: '#ff8f00',
    elevation: 0,
    alignItems:'center',
    justifyContent: 'center'
  }
});
