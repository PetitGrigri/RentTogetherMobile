import React, { Component } from 'react';
import { ImageBackground, StyleSheet, View, Image } from 'react-native';
import Text from '../Components/Text';
import TabContent from '../Components/TabContent';
import RoomerCard from '../Components/RoomerCard';
import SwipeCards from 'react-native-swipe-cards'
import { Foundation, MaterialCommunityIcons} from '@expo/vector-icons';

const roomers = 
[{
    name: "DEADPOOL",
    pourcentage:    84,
    age:            30,
    description:    "Deadpool est un psychopathe et un mégalomane, complètement imprévisible et très arrogant. Il est également capable d'une grande cruauté physique et mentale. Pendant un temps, il n'hésita pas à séquestrer une vieille aveugle dans sa maison, Al, pour qu'elle lui serve d'esclave, de confidente, d'oreille attentive (et inoffensive) à ses tourments, ainsi qu'à son goût pour les blagues douteuses.",
    image:          require("../assets/tests/deadpool.jpg"),
    characteristics: [{
        icon:               <Foundation name='guide-dog' />,
        value:              3,
        fractions:          5,
    } , {
        icon:               <MaterialCommunityIcons name='smoking' />,
        value:              4,
        fractions:          5,
    } , {
        icon:               <MaterialCommunityIcons name='broom' />,
        value:              3,
        fractions:          5,
    }]
}, {
    name: "IRON MAN",
    pourcentage: 95,
    age: 53,
    description: "Tony Stark, playboy, milliardaire, n'est pas seulement l'héritier des usines d'armement de son père (la Stark Industries), c'est également un inventeur de génie. Alors qu'il est en déplacement en Afghanistan afin de présenter sa dernière création, le missile Jéricho, il est enlevé par des terroristes de l'organisation « Les Dix Anneaux ». Gravement blessé lors de l'attaque, il ne survit que grâce à l'aide d'un scientifique, le professeur Yinsen, qui lui greffe à la poitrine un électro-aimant alimenté par une batterie de voiture afin d’empêcher des éclats d’obus d’atteindre son cœur.",
    image: require("../assets/tests/iron_man.jpg"),
    characteristics: [{
        icon:               <Foundation name='guide-dog' />,
        value:              1,
        fractions:          5,
    } , {
        icon:               <MaterialCommunityIcons name='smoking' />,
        value:              4,
        fractions:          5,
    } , {
        icon:               <MaterialCommunityIcons name='broom' />,
        value:              3,
        fractions:          5,
    }]
}, {
    name: "DOCTEUR STRANGE ",
    pourcentage: 95,
    age: 54,
    description: "Diplômé en médecine et en chirurgie, Stephen Strange est un médecin hors-pair, même si son accident de voiture l’empêche de mener à bien une opération chirurgicale. Grâce à son serviteur et ami Wong (en), il s’est aussi entrainé aux arts martiaux et sait se défendre sans utiliser sa magie. C’est aussi quelqu’un de très intelligent, de très sage et un excellent leader et stratège, en témoigne son rôle de chef au sein des Défenseurs.",
    image: require("../assets/tests/docteur_strange.jpg"),
    characteristics: [{
        icon:               <Foundation name='guide-dog' />,
        value:              0,
        fractions:          5,
    } , {
        icon:               <MaterialCommunityIcons name='smoking' />,
        value:              0,
        fractions:          5,
    } , {
        icon:               <MaterialCommunityIcons name='broom' />,
        value:              5,
        fractions:          5,
    }]
}, 
];

class Roomers extends Component {

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
                cards={ roomers }
                stack={false}
                renderCard={(roomer) => <RoomerCard {...roomer} />}
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

export default Roomers;