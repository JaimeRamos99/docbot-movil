import React from 'react';
import { Image, ImageBackground, Dimensions, ScrollView, StyleSheet, Text, View, ToastAndroid, KeyboardAvoidingView } from 'react-native';
import { Left, Right, Input, Card, Root, CardItem, Fab } from 'native-base';
import { Button, Header, Icon, Overlay } from 'react-native-elements';
import { CardSection } from '../components/cardsection';
import { Hoshi } from 'react-native-textinput-effects';
import { connect } from 'react-redux';

userGlobal = '';

class Profile extends React.Component {
  static navigationOptions = {
		drawerIcon: () => <Icon name='md-person' type='ionicon' color='#000' />
  }

  state = {
      nombre: this.props.loggedInUser.name + ' ' + this.props.loggedInUser.lastName,
      edad: this.props.loggedInUser.age,
      estatura: this.props.loggedInUser.height,
      peso: this.props.loggedInUser.weight,
      editModeNombre: this.props.loggedInUser.name + ' ' + this.props.loggedInUser.lastName,
      editModeEdad: this.props.loggedInUser.age,
      editModeEstatura: this.props.loggedInUser.height,
      editModePeso: this.props.loggedInUser.weight,
      changeAvatar: false,
      womenAvatar: ['Avatar-F-B-N.png', 'Avatar-F-T-N.png', 'Avatar-F-N-N.png'],
      menAvatar: ['Avatar-M-B-N.png', 'Avatar-M-T-N.png', 'Avatar-M-N-N.png'],
      avatarIndex: 0,
      metas: [],
      isPedometerAvailable: "checking",
      pastStepCount: 0,
      currentStepCount: 0,
      editmode: false,
    }

    editUser() {
      this.setState((state) => ({ editmode: false, 
                      nombre: state.editModeNombre, 
                      edad: state.editModeEdad, 
                      estatura: state.editModeEstatura, 
                      peso: state.editModePeso}));
      userGlobal = this.props.loggedInUser;
      userGlobal.name = this.state.nombre;
      userGlobal.age = this.state.edad;
      userGlobal.height = this.state.estatura;
      userGlobal.weight = this.state.peso;
      this.props.saveUser();
      ToastAndroid.show('Guardado', ToastAndroid.SHORT);
  }

  renderAvatar(){
    imc = (this.state.peso*1)/((this.state.estatura*1)*(this.state.estatura*1));
    switch (imc){
      case imc < 18.5:
        console.log('delgado');
        break;
      
      case imc >= 18.5 && 24.99:
        console.log('normal');
        break;

      case imc > 24.99 && imc < 30:
        console.log('obeso');
        break;
      
      case imc >= 30:
        console.log('muy obeso');
        break;
    }
  };

    userInfo() {
    if (this.state.editmode === true) {
      return (
        <View>
          <Overlay 
                    isVisible={this.state.changeAvatar}
                    width={Dimensions.get('window').width*0.8}
                    height='auto'
                    borderRadius={10}
                    onBackdropPress={() => this.setState({ changeAvatar: false })}
                >
                    <View>
                        <Text style={{fontSize: 20}}>Cambio de avatar</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                          <Icon
                            name='md-arrow-dropleft-circle'
                            type='ionicon'
                            color='#1438A6'
                            size={50}
                          />
                          <Image source={require('../resources/Avatar-F-T-N.png')} style={{ height: 260, width: 120}}></Image>
                          <Icon
                            name='md-arrow-dropright-circle'
                            type='ionicon'
                            color='#1438A6'
                            size={50}
                          />
                        </View>
                        
                        <Button
                        rounded
                        title="Guardar"
                        onPress={() => this.setState({ changeAvatar: false,  })}
                        buttonStyle={{
                            marginTop: 20,
                            borderRadius: 25,
                            backgroundColor: "#1438A6",
                            width: '50%',
                          }}
                        />
                        <Button
                        rounded
                        title="Cancelar"
                        onPress={() => this.setState({ changeAvatar: false })}
                        buttonStyle={{
                            marginTop: 20,
                            borderRadius: 25,
                            backgroundColor: "#545aa1",
                            width: '50%',
                          }}
                        />
                    </View>
                </Overlay>
          <ImageBackground style={{ width: '100%', height: 290 }} source={require('../resources/background.jpg')}>
              <View style={{ height: 290, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../resources/Avatar-F-T-N.png')} style={{ height: 260, width: 120}}></Image>
                <Fab
                    style={{ backgroundColor: '#1438A6' }}
                    onPress={() => this.setState({changeAvatar: true})}
                >
                    <Icon
                        reverse
                        name='create'
                        type='material'
                        color='#1438A6'
                    />
                </Fab>
              </View>
            </ImageBackground>
          <Hoshi value={this.state.editModeNombre} borderColor={'#000000'} label={'Nombre'} onChangeText={editModeNombre => this.setState({ editModeNombre })} />
          <Hoshi value={this.state.editModeEdad} borderColor={'#000000'} keyboardType='numeric' label={'Edad'} onChangeText={editModeEdad => this.setState({ editModeEdad })} />
          <Hoshi value={this.state.editModeEstatura} borderColor={'#000000'} keyboardType='numeric' label={'Estatura'} onChangeText={editModeEstatura => this.setState({ editModeEstatura })} />
          <Hoshi value={this.state.editModePeso} borderColor={'#000000'} keyboardType='numeric' label={'Peso'} onChangeText={editModePeso => this.setState({ editModePeso })} />
          <Button
            rounded
            title="Guardar"
            onPress={() => {this.editUser()}}
            buttonStyle={{
              marginTop: 20,
              backgroundColor: "#1438A6",
              width: '100%'
            }} />
          <Button
            rounded
            title="Cancelar"
            onPress={() => { this.setState((state) => ({ editmode: false, 
                                              editModeNombre: state.nombre, 
                                              editModeEdad: state.edad, 
                                              editModeEstatura: state.estatura, 
                                              editModePeso: state.peso})) }}
            buttonStyle={{
              marginTop: 20,
              backgroundColor: "#545aa1",
              width: '100%'
            }} />
        </View>
      )
    } else {
      return (
        <View>
          <ImageBackground style={{ width: '100%', height: 290 }} source={require('../resources/background.jpg')}>
              <View style={{ height: 290, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../resources/Avatar-F-T-N.png')} style={{ height: 260, width: 120}}></Image>
              </View>
            </ImageBackground>
          <Card>
            <CardItem bordered>
              <Text style={{ fontWeight: 'bold' }}>Nombre </Text><Text style={{ fontSize: 16 }}> {this.state.nombre}</Text>
            </CardItem>
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
              backgroundColor: "#1438A6",
              width: '100%',
            }} />
        </View>
      )
    }
  }

  render(){
    return(
      <KeyboardAvoidingView
        behavior='padding'
      >
        <View style={{ height: '100%', width:'100%' }}>
          <Header
            placement='left'
            leftComponent={
              <Icon 
                name='md-menu' 
                type='ionicon' 
                color='#fff' 
                onPress={() => this.props.navigation.openDrawer()}/>
            }
            centerComponent={{ text: 'Inicio', style: { color: '#fff' } }}
            containerStyle={{
              backgroundColor: '#1438A6',
            }}
          />
          <ScrollView style={{ height: '100%', paddingBottom: 30, marginBottom: 20 }}>
            {this.userInfo()}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
        
    );
  }
}

function mapStateToProps(state){
	return{
		loggedInUser: state.loggedInUser
	}
}

function mapDispatchToProps(dispatch){
	return{
		saveUser : () => dispatch({type:'Save_User', payload: userGlobal})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);