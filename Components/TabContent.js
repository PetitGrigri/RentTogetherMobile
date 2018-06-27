import React, { Component } from 'react';
import{
    StatusBar,
    SafeAreaView,
    Platform,
    View,
    StyleSheet
} from 'react-native'; 


const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0;

class TabContent extends Component {
    render() {
        return (
            <SafeAreaView style={[ styles.container, {marginTop:statusBarHeight }]}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#fff"
                    translucent
                    barStyle={ Platform.OS === 'ios'? 'dark-content' : 'light-content' }
                />
                <View style={[styles.container, this.props.style]}>
                    { this.props.children }
                </View>
            </SafeAreaView>
        );
    }
}

export default TabContent;


const styles = StyleSheet.create({
    container: { 
        flex:               1,
        backgroundColor:    '#eee',
    },
    
  });