import React, { Component } from 'react';
import {View, SafeAreaView, SegmentedControlIOS, } from 'react-native'
import { withNavigation } from 'react-navigation';

class MatchesHeader extends Component {
    render() {
        return (
            <View style= {{ backgroundColor: '#fff' }}>
                <SafeAreaView style= {{ alignContent: 'center', justifyContent:'center' }}>
                    <SegmentedControlIOS 
                        values={['Colocataires', 'Locations']} 
                        selectedIndex={0} 
                        tintColor='#ff8f00' 
                        style={{margin:8}} 
                        onValueChange={(value) => { 
                            this.props.navigation.navigate((value === 'Locations') ? 'matchesLocations' : 'matchesRoomers')
                        }}
                    />
                </SafeAreaView>
            </View>
        );
    }
}

export default withNavigation(MatchesHeader);