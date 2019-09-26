import React from 'react';
import { Image, ImageBackground, StyleSheet, SafeAreaView, Text, View, ScrollView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import Ionicons from 'react-native-vector-icons';
import { Home } from './views/Home.js';
import { Profile } from './views/Profile.js';
import { Chat } from './views/Chat.js';
import { Goals } from './views/Goals.js';
import { Avatar } from './views/Avatar.js';
import { ClinicalHistory } from './views/ClinicalHistory.js'
import { StepCount } from './views/StepCount.js';
import { reactNativePedometer } from './views/StepCountPrueba';

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <ImageBackground style={{ width: '100%', height: 190, alignItems: 'center', justifyContent: 'center'}} source={require('./resources/background.jpg')}>
        <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('./resources/avatarMan.jpg')} style={{ height: 100, width: 100, borderRadius: 60, marginTop: 20, marginBottom: 20 }}></Image>
            <Text style={{color: '#fff', fontSize: 17}}>Ricardo Andres Corcho Carranza</Text>
        </View>
      </ImageBackground>
      <DrawerNavigatorItems {...props} />
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
      Inicio: Home,
      Perfil: Profile,
      Metas: Goals,
      Paraclinicos: ClinicalHistory,
      Contador: StepCount,
    },
    {
      initialRouteName: 'Inicio',
      contentComponent: CustomDrawerContentComponent
    }
  );
  
const Drawer = createAppContainer(MyDrawerNavigator);

export class Main extends React.Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: '#1438A6',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
  render(){
    return (
      <Drawer />
    );
  }
}