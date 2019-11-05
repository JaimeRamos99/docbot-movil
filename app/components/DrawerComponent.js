import React from 'react';
import { Image, ImageBackground, StyleSheet, SafeAreaView, Text, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';

loggedInUserName = '';
avatar = '';
avatarModelP = require('../resources/profile/PAvatar-F-B-D.png');

const imagesP = {
  womanBDP: require('../resources/profile/PAvatar-F-B-D.png'),
  womanBNP: require('../resources/profile/PAvatar-F-B-N.png'),
  womanBGP: require('../resources/profile/PAvatar-F-B-G.png'),
  womanBMGP: require('../resources/profile/PAvatar-F-B-MG.png'),

  womanTDP: require('../resources/profile/PAvatar-F-T-D.png'),
  womanTNP: require('../resources/profile/PAvatar-F-T-N.png'),
  womanTGP: require('../resources/profile/PAvatar-F-T-G.png'),
  womanTMGP: require('../resources/profile/PAvatar-F-T-G.png'),

  womanNDP: require('../resources/profile/PAvatar-F-N-D.png'),
  womanNNP: require('../resources/profile/PAvatar-F-N-N.png'),
  womanNGP: require('../resources/profile/PAvatar-F-N-G.png'),
  womanNMGP: require('../resources/profile/PAvatar-F-N-MG.png'),


  manBDP: require('../resources/profile/PAvatar-M-B-D.png'),
  manBNP: require('../resources/profile/PAvatar-M-B-N.png'),
  manBGP: require('../resources/profile/PAvatar-M-B-G.png'),
  manBMGP: require('../resources/profile/PAvatar-M-B-MG.png'),

  manTDP: require('../resources/profile/PAvatar-M-T-D.png'),
  manTNP: require('../resources/profile/PAvatar-M-T-N.png'),
  manTGP: require('../resources/profile/PAvatar-M-T-G.png'),
  manTMGP: require('../resources/profile/PAvatar-M-T-MG.png'),

  manNDP: require('../resources/profile/PAvatar-M-N-D.png'),
  manNNP: require('../resources/profile/PAvatar-M-N-N.png'),
  manNGP: require('../resources/profile/PAvatar-M-N-G.png'),
  manNMGP: require('../resources/profile/PAvatar-M-N-MG.png'),
}

class DrawerComponent extends React.Component {
    SelectAvatarP(){
        parts = this.props.loggedInUser.avatar.split('-');
        imc = (this.props.loggedInUser.weight[this.props.loggedInUser.weight.length-1].value)/((this.props.loggedInUser.height*1)*(this.props.loggedInUser.height*1));
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
        this.SelectAvatarP();
        splitName = this.props.loggedInUser.name.split(' ');
        splitLastName = this.props.loggedInUser.lastName.split(' ');
        loggedInUserName = splitName[0] + ' ' + splitLastName[0];
        return(
            <ScrollView>
                <SafeAreaView
                    style={styles.container}
                    forceInset={{ top: 'always', horizontal: 'never' }}
                >
                    <ImageBackground style={{ width: '100%', height: 190, alignItems: 'center', justifyContent: 'center'}} source={require('../resources/background.jpg')}>
                    <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={avatarModelP} style={{ height: 100, width: 100, borderRadius: 60, marginTop: 20, marginBottom: 20 }}></Image>
                        <Text style={{color: '#fff', fontSize: 17}}>{this.props.loggedInUser.name + this.props.loggedInUser.lastName}</Text>
                    </View>
                    </ImageBackground>
                    {this.props.children}
                </SafeAreaView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

function mapStateToProps(state){
	return{
		loggedInUser: state.loggedInUser
	}
}

export default connect(mapStateToProps)(DrawerComponent);