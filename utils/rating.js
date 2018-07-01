import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native'



const styles = StyleSheet.create({
    icon: {
        height: 32, 
        width: 32
    }
});

const
    animaux_actif =     <Image source={ require('../assets/icon/pets_ff8f00.png')} style={ styles.icon}/>,
    animaux_inactif =   <Image source={ require('../assets/icon/pets_aaa.png')} style={ styles.icon}/>,
    fete_actif =        <Image source={ require('../assets/icon/party_ff8f00.png')} style={ styles.icon}/>,
    fete_inactif =      <Image source={ require('../assets/icon/party_aaa.png')} style={ styles.icon}/>,
    fumeur_actif =      <Image source={ require('../assets/icon/smoke_ff8f00.png')} style={ styles.icon}/>,
    fumeur_inactif =    <Image source={ require('../assets/icon/smoke_aaa.png')} style={ styles.icon}/>,
    rangement_actif =   <Image source={ require('../assets/icon/shelf_ff8f00.png')} style={ styles.icon}/>,
    rangement_inactif = <Image source={ require('../assets/icon/shelf_aaa.png')} style={ styles.icon}/>,
    hygiene_actif =     <Image source={ require('../assets/icon/clean_ff8f00.png')} style={ styles.icon}/>,
    hygiene_inactif =   <Image source={ require('../assets/icon/clean_aaa.png')} style={ styles.icon}/>,
    social_actif =      <Image source={ require('../assets/icon/social_ff8f00.png')} style={ styles.icon}/>,
    social_inactif =    <Image source={ require('../assets/icon/social_aaa.png')} style={ styles.icon}/>,

    empty_active_component =   <View />,
    empty_unactive_component = <View />;



export const getImagesFromPersonalReferentialName= (referentialName) => {

    let activeComponent =   empty_active_component
    let unactiveComponent = empty_unactive_component;

    switch(referentialName) {
        case "Animaux":
            activeComponent =   animaux_actif;
            unactiveComponent=  animaux_inactif;
            break;

        case "Fete":
            activeComponent =   fete_actif
            unactiveComponent=  fete_inactif
            break;
        
        case "Fumeur":
            activeComponent =   fumeur_actif;
            unactiveComponent=  fumeur_inactif;
            break;
        
        case "Rangement":
            activeComponent =   rangement_actif;
            unactiveComponent=  rangement_inactif;
            break;

        case "Hygiene":
            activeComponent =   hygiene_actif;
            unactiveComponent=  hygiene_inactif;
            break;

        case "Social":
            activeComponent =   social_actif;
            unactiveComponent=  social_inactif;
            break;
        default: 
            break;
    }

    return {
        activeComponent:    activeComponent,
        unactiveComponent:  unactiveComponent
    }
}