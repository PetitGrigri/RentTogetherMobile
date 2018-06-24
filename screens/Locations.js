import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, Image } from 'react-native';
import Text from '../Components/Text';
import TabContent from '../Components/TabContent';
import LocationCard from '../Components/LocationCard';
import { MaterialIcons, FontAwesome} from '@expo/vector-icons';
import SwipeCards from 'react-native-swipe-cards'

const appartments = [{
    description: "Paris MEUBLE 3 pièce(s) - 45 m² - Paris 75013, 7 Allée du test Dans un immeuble moderne avec gardien et ascenseur, Studio meublé situé au 3ème étage comprenant une entrée, une pièce principale avec un coin cuisine équipée, et une salle d'eau avec WC. Calme et lumineux, chauffage collectif.. Loyer: 400 euros /mois et charges incluses.  Disponible à partir du 30 juin.. ",
    images: [
        require("../assets/tests/appartment_01.jpg"),
        require("../assets/tests/appartment_02.jpg"),
    ], 
    characteristics: [{
        icon:               <FontAwesome name='bed' />,
        value:              "2",
    },{
        icon:               <FontAwesome name='cube' />,
        value:              "3",
    },{
        icon:               <FontAwesome name='user' />,
        value:              '1 / 2',
    },{
        icon:               <MaterialIcons name='local-parking' />,
        value:              '1',
    },{
        icon:               <FontAwesome name='wifi' />,
        value:              'fibre',
    },{
        icon:               <FontAwesome name='euro' />,
        value:              '600 / personne',
    }]
}, {
    description: "Paris MEUBLE 3 pièce(s) - 42 m² - Paris 75013, 9 Allée du deuxième test Dans un immeuble hausmanien avec cours intérieure et ascenseur, Studio meublé situé au 4ème étage comprenant une entrée, une pièce principale avec un coin cuisine équipée, et une salle d'eau avec WC. Calme et lumineux, chauffage collectif.. Loyer: 400 euros /mois et charges incluses.  Disponible à partir du 30 juin.. ",
    images: [
        require("../assets/tests/appartment_03.jpg"),
        require("../assets/tests/appartment_04.jpg"),
    ],
    characteristics: [{
        icon:               <FontAwesome name='bed' />,
        value:              "2",
    },{
        icon:               <FontAwesome name='cube' />,
        value:              "3",
    }]
}, {
    description: "Test 3.",
    images: [
        require("../assets/tests/appartment_01.jpg"),
        require("../assets/tests/appartment_02.jpg"),
        require("../assets/tests/appartment_03.jpg"),
        require("../assets/tests/appartment_04.jpg"),
    ],
    characteristics: [{
        icon:               <FontAwesome name='bed' />,
        value:              "3",
    }]
}, 
];

class Locations extends Component {

    handleYup = () => {
        console.log('Oui');
    }

    handleNope = () => {
        console.log('Non');
    }


    render() {
        return (
            <TabContent>
                <SwipeCards
                    cards={ appartments }
                    stack={false}
                    renderCard={(appartement) => <LocationCard {...appartement} />}
                    renderNoMoreCards={() => <View style={{flex:1}}><Text>Terminé</Text></View>}
                    showYup={true}
                    showNope={true}
                    showMaybe={false}
                    yupText='Je te veux !'
                    nopeText='Mmmm non...'
                    handleYup={this.handleYup}
                    handleNope={this.handleNope}
                    dragY={false}
                    onClickHandler={()=>{}}
                /> 
            </TabContent>
        )
    }
}

export default Locations;