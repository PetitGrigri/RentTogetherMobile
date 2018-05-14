import React, { Component } from 'react';
import { ScrollView, ActivityIndicator, StyleSheet, Text, View, ImageBackground, Image, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Toucha } from 'react-native';
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
          ? <ImageBackground
                source={require('../assets/login-screen-mobile.jpg')}
                style={styles.bgImage}
                >
                <ScrollView
                    scrollEnabled={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.container}
                    >
                    <KeyboardAvoidingView behavior="position" style={{flex:6, justifyContent: 'center', alignItems: 'center'}}>

                        <View style={{flex:4, justifyContent: 'center', alignItems: 'center'}}>  
                            <Image source={require('../assets/logo.png')} style={styles.logo} />
                            <Text style={styles.loginTitle}>Rent Together</Text>
                        </View>

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
                                style={{marginTop:40}}
                                loading={ this.props.loadingSignIn }
                                onPress={ this.handleSignIn } />
                        </View>
                    </KeyboardAvoidingView>

                    <View style={{flex:1}} />
                    <View style={{alignItems: 'center', justifyContent:'center',  flex:1}}>
                        <Link to='/register' component={TouchableOpacity}>
                            <Text style={styles.footerText}>Créer un nouveau compte</Text>
                        </Link>
                    </View>
                </ScrollView>
            </ImageBackground>
          : null
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
    flex: 1,
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,

  },
  logo:{
    width: SCREEN_WIDTH/4,
    height: SCREEN_WIDTH/4,
  },
  loginTitle: {
    fontFamily: 'open-sans-light', 
    fontSize: 44,
    color: '#e65100'
  },
  footerText: {
    fontFamily: 'open-sans-regular', 
    fontSize: 12,
    color: '#fff'
  },
  form: {
    flex:2,
    width: SCREEN_WIDTH*0.80, 
  },
});
