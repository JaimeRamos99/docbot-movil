import React from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Header, Left, Right, Icon, Toast, Input, Card, Root, CardItem } from 'native-base';
import { Button } from 'react-native-elements';
import { CardSection } from '../components/cardsection';
import { Hoshi } from 'react-native-textinput-effects';


export class Profile extends React.Component {
  state = {
      nombre: 'Ricardo Andres Corcho Carranza', edad: '22', peso: '65', currentUser: null, email: 'carranzar@uninorte.edu.co', estatura: '1.73', metas: [],
      isPedometerAvailable: "checking",
      pastStepCount: 0,
      currentStepCount: 0,
      editmode: false,
    }

    editUser() {
    Toast.show({
      text: "Editado correctamente",
      textStyle: { color: "green", fontFamily: "Roboto" },
      buttonText: "Ok",
      duration: 3000
    })


  }

    userInfo() {
    if (this.state.editmode === true) {
      return (
        <ScrollView style={{ height: '100%', paddingBottom: 30, marginBottom: 20 }}>
          <Hoshi value={this.state.nombre} borderColor={'#000000'} label={'Nombre'} onChangeText={nombre => this.setState({ nombre })} />
          <Hoshi value={this.state.estatura} borderColor={'#000000'} keyboardType='numeric' label={'Estatura'} onChangeText={estatura => this.setState({ estatura })} />
          <Hoshi value={this.state.edad} borderColor={'#000000'} keyboardType='numeric' label={'Edad'} onChangeText={edad => this.setState({ edad })} />
          <Button
            rounded
            title="GUARDAR"
            buttonStyle={{
              marginTop: 20,
              backgroundColor: "#00AA00",
              width: '100%'
            }} />
          <Button
            rounded
            title="CANCELAR"
            onPress={() => { this.setState({ editmode: false }) }}
            buttonStyle={{
              marginTop: 20,
              backgroundColor: "#545aa1",
              width: '100%'
            }} />
        </ScrollView>
      )
    } else {
      return (
        <ScrollView style={{ height: '100%', paddingBottom: 30, marginBottom: 20 }}>
          <Card>
            <CardItem bordered>
              <Text style={{ fontWeight: 'bold' }}>Nombre </Text><Text style={{ fontSize: 16 }}> {this.state.nombre}</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={{ fontWeight: 'bold' }}>Email </Text><Text style={{ fontSize: 16 }}>{this.state.email}</Text>
            </CardItem >
            <CardItem bordered>
              <Text style={{ fontWeight: 'bold' }}>Edad </Text><Text style={{ fontSize: 16 }}> {this.state.edad} años</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={{ fontWeight: 'bold' }}>Estatura </Text><Text style={{ fontSize: 16 }}>{this.state.estatura} metros</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={{ fontWeight: 'bold' }}>Peso </Text><Text style={{ fontSize: 16 }}>{this.state.peso} kg</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={{ fontWeight: 'bold' }}>Pasos </Text><Text style={{ fontSize: 16 }}> {this.state.currentStepCount} pasos</Text>
            </CardItem>
          </Card>
          <Button
            rounded
            title="Editar Perfil"
            onPress={() => { this.setState({ editmode: true }) }}
            buttonStyle={{
              marginTop: 20,
              borderRadius: 25,
              backgroundColor: "#545aa1",
              width: '100%',
            }} />
        </ScrollView>
      )
    }
  }

  render(){
    return(

        <Root>
        <View>
          <ImageBackground style={{ width: '100%', height: 150 }} source={require('../resources/background.jpg')}>
            <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
              <Image source={require('../resources/avatarMan.jpg')} style={{ height: 120, width: 120, borderRadius: 60 }}></Image>
            </View>
          </ImageBackground>

            <CardSection>
              {this.userInfo()}
            </CardSection>
        </View>
      </Root>
    );
  }
}
