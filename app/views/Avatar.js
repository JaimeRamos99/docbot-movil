import React from 'react';
import { StyleSheet, Dimensions, View, StatusBar, ImageBackground, ScrollView, Image } from 'react-native';
import { Left, Right, Icon, Text, Card, CardItem, Body } from 'native-base';
import { Header } from 'react-native-elements';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { CardSection } from '../components/cardsection';

export class Avatar extends React.Component{
    render(){
        return(
            <View>
                <Image source={require('../resources/avatar-body.png')} style={{ resizeMode: 'contain', alignSelf: 'center'}} />
            </View>
        );
    }
}