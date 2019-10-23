import React, { useDebugValue } from 'react';
import { Image, ImageBackground, Dimensions, ScrollView, StyleSheet, Text, View, ToastAndroid, KeyboardAvoidingView } from 'react-native';
import { Left, Right, Input, Card, Root, CardItem, Fab } from 'native-base';
import { Button, Header, Icon, Overlay } from 'react-native-elements';
import { CardSection } from '../components/cardsection';
import { Hoshi } from 'react-native-textinput-effects';
import { connect } from 'react-redux';
import { UpdatePatient, UpdatePatientWeight, UpdateGoal } from '../services/api.js';

const images = {
  womanBD: require('../resources/Avatar-F-B-D.png'),
  womanBN: require('../resources/Avatar-F-B-N.png'),
  womanBG: require('../resources/Avatar-F-B-G.png'),
  womanBMG: require('../resources/Avatar-F-B-MG.png'),

  womanTD: require('../resources/Avatar-F-T-D.png'),
  womanTN: require('../resources/Avatar-F-T-N.png'),
  womanTG: require('../resources/Avatar-F-T-G.png'),
  womanTMG: require('../resources/Avatar-F-T-G.png'),

  womanND: require('../resources/Avatar-F-N-D.png'),
  womanNN: require('../resources/Avatar-F-N-N.png'),
  womanNG: require('../resources/Avatar-F-N-G.png'),
  womanNMG: require('../resources/Avatar-F-N-MG.png'),


  manBD: require('../resources/Avatar-M-B-D.png'),
  manBN: require('../resources/Avatar-M-B-N.png'),
  manBG: require('../resources/Avatar-M-B-G.png'),
  manBMG: require('../resources/Avatar-M-B-MG.png'),

  manTD: require('../resources/Avatar-M-T-D.png'),
  manTN: require('../resources/Avatar-M-T-N.png'),
  manTG: require('../resources/Avatar-M-T-G.png'),
  manTMG: require('../resources/Avatar-M-T-MG.png'),

  manND: require('../resources/Avatar-M-N-D.png'),
  manNN: require('../resources/Avatar-M-N-N.png'),
  manNG: require('../resources/Avatar-M-N-G.png'),
  manNMG: require('../resources/Avatar-M-N-MG.png'),
}

userGlobal = '';
avatarModel = images.womanBD;
womenAvatarBase = ['Avatar-F-B-N.png', 'Avatar-F-T-N.png', 'Avatar-F-N-N.png'];
menAvatarBase = ['Avatar-M-B-N.png', 'Avatar-M-T-N.png', 'Avatar-M-N-N.png'];
womenAvatarBaseModel = [images.womanBN, images.womanTN, images.womanNN];
menAvatarBaseModel = [images.manBN, images.manTN, images.manNN];

class Profile extends React.Component {
  static navigationOptions = {
		drawerIcon: () => <Icon name='md-person' type='ionicon' color='#000' />
  }

  state = {
      nombre: this.props.loggedInUser.name,
      apellido: this.props.loggedInUser.lastName,
      edad: this.props.loggedInUser.age,
      estatura: this.props.loggedInUser.height,
      peso: this.props.loggedInUser.weight[this.props.loggedInUser.weight.length - 1].value,
      avatar: this.props.loggedInUser.avatar,
      editModeNombre: this.props.loggedInUser.name,
      editModeApellido: this.props.loggedInUser.lastName,
      editModeEdad: this.props.loggedInUser.age,
      editModeEstatura: this.props.loggedInUser.height,
      editModePeso: this.props.loggedInUser.weight[this.props.loggedInUser.weight.length - 1].value.toString(),
      changeAvatar: false,
      avatarModeEdit: images.womenNN,
      avatarIndex: this.getAvatarBaseIndex(),
      metas: [],
      isPedometerAvailable: "checking",
      pastStepCount: 0,
      currentStepCount: 0,
      editmode: false,
    }

    editUser() {
      userGlobal = this.props.loggedInUser;
      userGlobal.name = this.state.editModeNombre;
      userGlobal.lastName = this.state.editModeApellido;
      userGlobal.age = this.state.editModeEdad;
      userGlobal.height = this.state.editModeEstatura;
      userGlobal.avatar = this.state.avatar;
      UpdatePatient(userGlobal.id, userGlobal.name, userGlobal.lastName, userGlobal.age, userGlobal.height, userGlobal.avatar);
      UpdateGoal(this.props.goals[this.props.goals.length - 1]._id, ((this.props.goals[this.props.goals.length - 1].quantity*1)).toString(), '1', this.props.goals[this.props.goals.length - 1].nMessages*1+1, this.props.goals[this.props.goals.length - 1].dueDate)
      if (this.state.editModePeso*1 != this.state.peso) {
        add = userGlobal.weight[0];
        add.value = this.state.editModePeso*1;
        userGlobal.weight.push(add);
        UpdatePatientWeight(userGlobal.id, this.state.editModePeso*1)
      }
      this.props.saveUser();
      this.setState((state) => ({ editmode: false, 
                      nombre: state.editModeNombre,
                      apellido: state.editModeApellido, 
                      edad: state.editModeEdad, 
                      estatura: state.editModeEstatura, 
                      peso: state.editModePeso*1}));
      
      ToastAndroid.show('Guardado', ToastAndroid.SHORT);
  }

  getAvatarBaseIndex(){
    let i = 0;
    if (this.props.loggedInUser.sex == 'f') {
      while(i < womenAvatarBase.length){
        if(this.props.loggedInUser.avatar == womenAvatarBase[i]){
          return i;
        }
        i++;
      }
    }else{
      while(i < menAvatarBase.length){
        if(this.props.loggedInUser.avatar == menAvatarBase[i]){
          return i;
        }
        i++;
      }
    }
  }

  showChangeAvatarModel(){
    if (this.props.loggedInUser.sex == 'f') {
      return(
        <Image source={womenAvatarBaseModel[this.state.avatarIndex]} style={{ height: 260, width: 120}}></Image>
      );
    }else{
      return(
        <Image source={menAvatarBaseModel[this.state.avatarIndex]} style={{ height: 260, width: 120}}></Image>
      );
    }
  }

  changeAvatarModel(move){
    switch(move){
      case 'left':
        if(this.state.avatarIndex == 0){
          this.setState({avatarIndex: 2});
        }else{
          this.setState((state) => ({avatarIndex: state.avatarIndex - 1}));
        }

      case 'right':
          if(this.state.avatarIndex == 2){
            this.setState({avatarIndex: 0});
          }else{
            this.setState((state) => ({avatarIndex: state.avatarIndex + 1}));
          }
    }
  }

  EditAvatar(){
    if (this.props.loggedInUser.sex == 'f') {
      this.setState((state) => ({ changeAvatar: false, avatar: womenAvatarBase[state.avatarIndex] }));
    }else{
      this.setState((state) => ({ changeAvatar: false, avatar: menAvatarBase[state.avatarIndex] }));
    }
  }

  SelectAvatar(){
    parts = this.state.avatar.split('-');
    imc = (this.state.peso*1)/((this.state.estatura*1)*(this.state.estatura*1));
    switch (this.props.loggedInUser.sex){
      case 'f':
        switch(parts[2]){
          case 'B':
              switch (true){
                case imc < 18.5:
                  avatarModel = images.womanBD;
                  break;
                
                case imc >= 18.5 && imc <= 24.99:
                  avatarModel = images.womanBN;
                  break;
          
                case imc > 24.99 && imc < 30:
                  avatarModel = images.womanBG;
                  break;
                
                case imc >= 30:
                  avatarModel = images.womanBMG;
                  break;
              }
          break;
          
          case 'T':
              switch (true){
                case imc < 18.5:
                  avatarModel = images.womanTD;
                  break;
                
                case imc >= 18.5 && imc <= 24.99:
                  avatarModel = images.womanTN;
                  break;
          
                case imc > 24.99 && imc < 30:
                  avatarModel = images.womanTG;
                  break;
                
                case imc >= 30:
                  avatarModel = images.womanTMG;
                  break;
              }
          break

          case 'N':
              switch (true){
                case imc < 18.5:
                  avatarModel = images.womanND;
                  break;
                
                case imc >= 18.5 && imc <= 24.99:
                  avatarModel = images.womanNN;
                  break;
          
                case imc > 24.99 && imc < 30:
                  avatarModel = images.womanNG;
                  break;
                
                case imc >= 30:
                  avatarModel = images.womanNMG;
                  break;
              }
            break;
        }
        break;
        
      case 'm':
          switch(parts[2]){
            case 'B':
                switch (true){
                  case imc < 18.5:
                    avatarModel = images.manBD;
                    break;
                  
                  case imc >= 18.5 && imc <= 24.99:
                    avatarModel = images.manBN;
                    break;
            
                  case imc > 24.99 && imc < 30:
                    avatarModel = images.manBG;
                    break;
                  
                  case imc >= 30:
                    avatarModel = images.manBMG;
                    break;
                }
            break;
            
            case 'T':
                switch (true){
                  case imc < 18.5:
                    avatarModel = images.manTD;
                    break;
                  
                  case imc >= 18.5 && imc <= 24.99:
                    avatarModel = images.manTN;
                    break;
            
                  case imc > 24.99 && imc < 30:
                    avatarModel = images.manTG;
                    break;
                  
                  case imc >= 30:
                    avatarModel = images.manTMG;
                    break;
                }
            break
  
            case 'N':
                switch (true){
                  case imc < 18.5:
                    avatarModel = images.manND;
                    break;
                  
                  case imc >= 18.5 && imc <= 24.99:
                    avatarModel = images.manNN;
                    break;
            
                  case imc > 24.99 && imc < 30:
                    avatarModel = images.manNG;
                    break;
                  
                  case imc >= 30:
                    avatarModel = images.manNMG;
                    break;
                }
              break;
          }
        break;
    }
  };

    userInfo() {
      this.SelectAvatar();
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
                            onPress={() => this.changeAvatarModel('left')}
                          />
                          {this.showChangeAvatarModel()}
                          <Icon
                            name='md-arrow-dropright-circle'
                            type='ionicon'
                            color='#1438A6'
                            size={50}
                            onPress={() => this.changeAvatarModel('right')}
                          />
                        </View>
                        
                        <Button
                        rounded
                        title="Guardar"
                        onPress={() => this.EditAvatar()}
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
                <Image source={avatarModel} style={{ height: 260, width: 120}}></Image>
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
          <Hoshi value={this.state.editModeApellido} borderColor={'#000000'} label={'Apellido'} onChangeText={editModeApellido => this.setState({ editModeApellido })} />
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
                <Image source={avatarModel} style={{ height: 260, width: 120}}></Image>
              </View>
            </ImageBackground>
          <Card>
            <CardItem bordered>
              <Text style={{ fontWeight: 'bold' }}>Nombre </Text><Text style={{ fontSize: 16 }}> {this.state.nombre + ' ' + this.state.apellido}</Text>
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
    loggedInUser: state.loggedInUser,
    goals: state.goals
	}
}

function mapDispatchToProps(dispatch){
	return{
		saveUser : () => dispatch({type:'Save_User', payload: userGlobal})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);