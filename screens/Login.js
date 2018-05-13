import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ImageBackground, Image, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Toucha } from 'react-native';
import { connect } from 'react-redux'
import { handleSignIn, handleHideError } from '../actions/connection.js'
import { Font } from 'expo';
import { Link } from 'react-router-native';
import InputText from '../Components/InputText';
import ButtonSubmit from '../Components/ButtonSubmit';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login:'',
            password:'',
            fontLoaded:false,
        }
        this.handleSignIn = this.handleSignIn.bind(this);

    }
    componentDidMount() {
        Font.loadAsync({
            'open-sans-light': require('../assets/fonts/Open_Sans/OpenSans-Light.ttf'),
            'open-sans-regular': require('../assets/fonts/Open_Sans/OpenSans-Regular.ttf'),
        }).then(() => {
            this.setState({fontLoaded: true});
        });
    }

    //Méthode destinée à la gestion de la connexion
    handleSignIn() {
        //TODO vérifier données du formulaire
        this.props.hangleSignIn(this.state.login, this.state.password);
    }

  render() {

    return (
        this.state.fontLoaded 
            ?   <View style={styles.container}>
                    <ImageBackground
                        source={require('../assets/login-screen-mobile.jpg')}
                        style={styles.bgImage}
                        >

                        <View style={{alignItems: 'center', justifyContent:'flex-end',  flex:2}}>
                            <Image source={require('../assets/logo.png')} style={styles.logo} />
                        </View>

                        <View style={{alignItems: 'center', justifyContent:'center',  flex:2}}>
                            <Text style={styles.loginTitle}>Rent Together</Text>
                        </View>

                        <KeyboardAvoidingView behavior="padding" style={{flex:3}}>
                            <View style={styles.form}>
                                
                                <InputText 
                                    onChangeText={(text) => this.setState({login:text}) } 
                                    placeholder='Email' />

                                <InputText 
                                    onChangeText={(text) => this.setState({password:text}) } 
                                    placeholder='Mot de passe'
                                    secureTextEntry />

                                <ButtonSubmit 
                                    text='Login'
                                    loading={ this.props.loadingSignIn }
                                    onPress={ this.handleSignIn } />
                            </View>
                        </KeyboardAvoidingView>
                        
                        <View style={{alignItems: 'center', justifyContent:'center',  flex:1}}>
                            <Link to='/register' component={TouchableOpacity}>
                                <Text style={styles.footerText}>Créer un nouveau compte</Text>
                            </Link>
                        </View>
                    </ImageBackground>
                </View>
            :   null
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
  loginTitle: {
    fontFamily: 'open-sans-light', 
    fontSize: 44,
    color: '#fff'
  },
  footerText: {
    fontFamily: 'open-sans-regular', 
    fontSize: 12,
    color: '#fff'
  },
  form: {
    width: SCREEN_WIDTH*0.80, 
  },
});
