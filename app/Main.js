import React from 'react';
import { Image, ImageBackground, StyleSheet, SafeAreaView, Text, View, ScrollView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { Button, Icon } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons';
import { Home } from './views/Home.js';
import  Profile  from './views/Profile.js';
import { Chat } from './views/Chat.js';
import Goals from './views/Goals.js';
import { Avatar } from './views/Avatar.js';
import ClinicalHistory from './views/ClinicalHistory.js'
import { StepCount } from './views/StepCount.js';
import { Logout } from './components/Logout.js'
import { connect } from 'react-redux';

loggedInUserName = '';
avatar = '';
avatarModel = require('./resources/Avatar-F-B-D.png');

const images = {
  womanBD: require('./resources/Avatar-F-B-D.png'),
  womanBN: require('./resources/Avatar-F-B-N.png'),
  womanBG: require('./resources/Avatar-F-B-G.png'),
  womanBMG: require('./resources/Avatar-F-B-MG.png'),

  womanTD: require('./resources/Avatar-F-T-D.png'),
  womanTN: require('./resources/Avatar-F-T-N.png'),
  womanTG: require('./resources/Avatar-F-T-G.png'),
  womanTMG: require('./resources/Avatar-F-T-G.png'),

  womanND: require('./resources/Avatar-F-N-D.png'),
  womanNN: require('./resources/Avatar-F-N-N.png'),
  womanNG: require('./resources/Avatar-F-N-G.png'),
  womanNMG: require('./resources/Avatar-F-N-MG.png'),


  manBD: require('./resources/Avatar-M-B-D.png'),
  manBN: require('./resources/Avatar-M-B-N.png'),
  manBG: require('./resources/Avatar-M-B-G.png'),
  manBMG: require('./resources/Avatar-M-B-MG.png'),

  manTD: require('./resources/Avatar-M-T-D.png'),
  manTN: require('./resources/Avatar-M-T-N.png'),
  manTG: require('./resources/Avatar-M-T-G.png'),
  manTMG: require('./resources/Avatar-M-T-MG.png'),

  manND: require('./resources/Avatar-M-N-D.png'),
  manNN: require('./resources/Avatar-M-N-N.png'),
  manNG: require('./resources/Avatar-M-N-G.png'),
  manNMG: require('./resources/Avatar-M-N-MG.png'),
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
      <Button
        title="Cerrar Sesión"
        onPress={() => props.navigation.navigate('Au<th')}
        type='clear'
      />
    </SafeAreaView>
  </ScrollView>
);

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