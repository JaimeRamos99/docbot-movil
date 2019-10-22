import React from 'react';
import { Image, ImageBackground, StyleSheet, SafeAreaView, Text, View, ScrollView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import Ionicons from 'react-native-vector-icons';
import { Home } from './views/Home.js';
import  Profile  from './views/Profile.js';
import { Chat } from './views/Chat.js';
import Goals from './views/Goals.js';
import { Avatar } from './views/Avatar.js';
import ClinicalHistory from './views/ClinicalHistory.js'
import { StepCount } from './views/StepCount.js';
import { connect } from 'react-redux';

loggedInUserName = '';

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <ImageBackground style={{ width: '100%', height: 190, alignItems: 'center', justifyContent: 'center'}} source={require('./resources/background.jpg')}>
        <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('./resources/avatar.png')} style={{ height: 100, width: 100, borderRadius: 60, marginTop: 20, marginBottom: 20 }}></Image>
            <Text style={{color: '#fff', fontSize: 17}}>{loggedInUserName}</Text>
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
  render(){
    loggedInUserName = this.props.loggedInUser.name + ' ' + this.props.loggedInUser.lastName;
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