import React, { Component } from 'react';
import { ImageBackground, Text, SafeAreaView, View, StatusBar} from 'react-native';
import TabContent from '../Components/TabContent';

class Home extends Component {
    render() {
        return (
            <TabContent>
                <Text style={[{ flex:1,color: '#000' }]}>
                    Home
                </Text>
            </TabContent>
        );
    }
}

export default Home;