import React from 'react';
import { Image, ImageBackground, StyleSheet, SafeAreaView, Text, View, ScrollView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { Button, Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons';
import { Home } from './views/Home.js';
import  Profile  from './views/Profile.js';
import Chat from './views/Chat.js';
import Goals from './views/Goals.js';
import ClinicalHistory from './views/ClinicalHistory.js'
import { StepCount } from './views/StepCount.js';
import { Logout } from './components/Logout.js'
import { connect } from 'react-redux';

loggedInUserName = '';
avatar = '';
avatarModelP = require('./resources/Profile/Avatar-F-B-D.png');

const imagesP = {
  womanBDP: require('./resources/Profile/Avatar-F-B-D.png'),
  womanBNP: require('./resources/Profile/Avatar-F-B-N.png'),
  womanBGP: require('./resources/Profile/Avatar-F-B-G.png'),
  womanBMGP: require('./resources/Profile/Avatar-F-B-MG.png'),

  womanTDP: require('./resources/Profile/Avatar-F-T-D.png'),
  womanTNP: require('./resources/Profile/Avatar-F-T-N.png'),
  womanTGP: require('./resources/Profile/Avatar-F-T-G.png'),
  womanTMGP: require('./resources/Profile/Avatar-F-T-G.png'),

  womanNDP: require('./resources/Profile/Avatar-F-N-D.png'),
  womanNNP: require('./resources/Profile/Avatar-F-N-N.png'),
  womanNGP: require('./resources/Profile/Avatar-F-N-G.png'),
  womanNMGP: require('./resources/Profile/Avatar-F-N-MG.png'),


  manBDP: require('./resources/Profile/Avatar-M-B-D.png'),
  manBNP: require('./resources/Profile/Avatar-M-B-N.png'),
  manBGP: require('./resources/Profile/Avatar-M-B-G.png'),
  manBMGP: require('./resources/Profile/Avatar-M-B-MG.png'),

  manTDP: require('./resources/Profile/Avatar-M-T-D.png'),
  manTNP: require('./resources/Profile/Avatar-M-T-N.png'),
  manTGP: require('./resources/Profile/Avatar-M-T-G.png'),
  manTMGP: require('./resources/Profile/Avatar-M-T-MG.png'),

  manNDP: require('./resources/Profile/Avatar-M-N-D.png'),
  manNNP: require('./resources/Profile/Avatar-M-N-N.png'),
  manNGP: require('./resources/Profile/Avatar-M-N-G.png'),
  manNMGP: require('./resources/Profile/Avatar-M-N-MG.png'),
}

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <ImageBackground style={{ width: '100%', height: 190, alignItems: 'center', justifyContent: 'center'}} source={require('./resources/background.jpg')}>
        <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={avatarModel} style={{ height: 100, width: 100, borderRadius: 60, marginTop: 20, marginBottom: 20 }}></Image>
            <Text style={{color: '#fff', fontSize: 17}}>{loggedInUserName}</Text>
        </View>
      </ImageBackground>
      <DrawerNavigatorItems {...props} />
    </SafeAreaView>
  </ScrollView>
);
/*
      <Button
        title="Cerrar Sesión"
        onPress={() => props.navigation.navigate('Au<th')}
        type='clear'
      />*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const MyDrawerNavigator = createDrawerNavigator(
    {
      Home: Home,
      DocBot: Chat,
      Perfil: Profile,
      Metas: Goals,
      Paraclinicos: ClinicalHistory,
      Contador: StepCount,
    },
    {
      initialRouteName: 'Home',
      contentComponent: CustomDrawerContentComponent
    }
  );
  
 const Drawer = createAppContainer(MyDrawerNavigator);

class Main extends React.Component {
  SelectAvatar(){
    parts = this.props.loggedInUser.avatar.split('-');
    imc = (this.props.loggedInUser.weight[this.props.loggedInUser.weight.length-1].peso*1)/((this.props.loggedInUser.height.estatura*1)*(this.props.loggedInUser.height.estatura*1));
    switch (this.props.loggedInUser.sex){
      case 'f':
        switch(parts[2]){
          case 'B':
              switch (true){
                case imc < 18.5:
                  avatarModelP = imagesP.womanBDP;
                  break;
                
                case imc >= 18.5 && imc <= 24.99:
                  avatarModelP = imagesP.womanBNP;
                  break;
          
                case imc > 24.99 && imc < 30:
                  avatarModelP = imagesP.womanBGP;
                  break;
                
                case imc >= 30:
                  avatarModelP = imagesP.womanBMGP;
                  break;
              }
          break;
          
          case 'T':
              switch (true){
                case imc < 18.5:
                  avatarModelP = imagesP.womanTDP;
                  break;
                
                case imc >= 18.5 && imc <= 24.99:
                  avatarModelP = imagesP.womanTNP;
                  break;
          
                case imc > 24.99 && imc < 30:
                  avatarModelP = imagesP.womanTGP;
                  break;
                
                case imc >= 30:
                  avatarModelP = imagesP.womanTMGP;
                  break;
              }
          break

          case 'N':
              switch (true){
                case imc < 18.5:
                  avatarModelP = imagesP.womanNDP;
                  break;
                
                case imc >= 18.5 && imc <= 24.99:
                  avatarModelP = imagesP.womanNNP;
                  break;
          
                case imc > 24.99 && imc < 30:
                  avatarModelP = imagesP.womanNGP;
                  break;
                
                case imc >= 30:
                  avatarModelP = imagesP.womanNMGP;
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
                    avatarModelP = imagesP.manBDP;
                    break;
                  
                  case imc >= 18.5 && imc <= 24.99:
                    avatarModelP = imagesP.manBNP;
                    break;
            
                  case imc > 24.99 && imc < 30:
                    avatarModelP = imagesP.manBGP;
                    break;
                  
                  case imc >= 30:
                    avatarModelP = imagesP.manBMGP;
                    break;
                }
            break;
            
            case 'T':
                switch (true){
                  case imc < 18.5:
                    avatarModelP = imagesP.manTDP;
                    break;
                  
                  case imc >= 18.5 && imc <= 24.99:
                    avatarModelP = imagesP.manTNP;
                    break;
            
                  case imc > 24.99 && imc < 30:
                    avatarModelP = imagesP.manTGP;
                    break;
                  
                  case imc >= 30:
                    avatarModelP = imagesP.manTMGP;
                    break;
                }
            break
  
            case 'N':
                switch (true){
                  case imc < 18.5:
                    avatarModelP = imagesP.manNDP;
                    break;
                  
                  case imc >= 18.5 && imc <= 24.99:
                    avatarModelP = imagesP.manNNP;
                    break;
            
                  case imc > 24.99 && imc < 30:
                    avatarModelP = imagesP.manNGP;
                    break;
                  
                  case imc >= 30:
                    avatarModelP = imagesP.manNMGP;
                    break;
                }
              break;
          }
        break;
    }
  };

  render(){
    this.SelectAvatar();
    splitName = this.props.loggedInUser.name.split(' ');
    splitLastName = this.props.loggedInUser.lastName.split(' ');
    loggedInUserName = splitName[0] + ' ' + splitLastName[0];
    return (
      <Drawer />
    );
  }
}

function mapStateToProps(state){
	return{
		loggedInUser: state.loggedInUser
	}
}

export default connect(mapStateToProps)(Main);