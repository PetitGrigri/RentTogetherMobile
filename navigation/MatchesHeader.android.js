import React, { Component } from 'react';
import {View, StatusBar, Text, TouchableNativeFeedback, StyleSheet, Animated} from 'react-native'
import { withNavigation } from 'react-navigation';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0;

const tabs = [{
    title:  'Colocataires',
    screen: 'matchesRoomers'
}, {
    title:  'Locations',
    screen: 'matchesLocations'
}];

class MatchesHeader extends Component {

    constructor(props) {
        super(props);
        this.state={
            translation:    new Animated.Value(0),
            tabsInfo:      [],
        }
    }
    changeTab = (index) => {
        
        Animated.timing(
            this.state.translation,
            {
                duration: 100,
                toValue: this.state.tabsInfo[index].x,
                useNativeDriver: true
            }
        ).start();
        this.props.navigation.navigate(tabs[index].screen);
        
    }

    getTabWidth = (nativeEvent, index) => {
        let tabsInfo = Object.assign({}, this.state.tabsInfo);
        tabsInfo[index] = {
            width:  nativeEvent.layout.width ,
            x:      nativeEvent.layout.x
        }
        this.setState({
            tabsInfo: tabsInfo
        });
    }

    render() {
        return (
            <View style={[{ marginTop: statusBarHeight }, styles.mainWrapper]}>
                <View style={styles.tabWrapper}>
                    { tabs.map((tab, index) => 
                        <TouchableNativeFeedback
                            key={index}
                            onLayout={ (event) => this.getTabWidth(event.nativeEvent, index) }
                            onPress={() =>this.changeTab(index)}
                            style={styles.tab}
                            background={TouchableNativeFeedback.SelectableBackground()} 
                            >
                            <View style={styles.tab}>
                                <Text>{tab.title.toUpperCase()}</Text>
                            </View>
                        </TouchableNativeFeedback>)}
                    
                </View>
                <View style={styles.tabBorder} >
                        <Animated.View style={ [styles.tabBorderSelected, { transform: [{ translateX: this.state.translation }] } ]} />
                </View>
            </View>
        );
    }
}

export default withNavigation(MatchesHeader);


const styles = StyleSheet.create({
    mainWrapper: {
        elevation:          3,
        backgroundColor:    '#fff'
    },
    tabWrapper: { 
        height:             44, 
        width:              '100%', 
        flexDirection:      'row', 
        backgroundColor:    '#fff',
    },
    tab: {
        flex:               1, 
        backgroundColor:    '#fff',
        justifyContent:     'center',
        alignItems:         'center',
    },
    tabBorder: {
        height:             3,
        width:              '100%',
        position:           'absolute',
        backgroundColor:    'rgba(255,255,255,0)',
        bottom:             0,
    },
    tabBorderSelected: {
        height:             3,
        width:              '50%',
        backgroundColor:    '#ff8f00'
    }
})