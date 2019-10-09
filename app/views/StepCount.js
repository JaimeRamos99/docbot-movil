/*import React from 'react';
import { AppRegistry, StyleSheet, Dimensions, Text, View, StatusBar, ImageBackground, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import Pedometer from 'react-native-pedometer';

export  class StepCount extends React.Component {
  static navigationOptions = {
		drawerIcon: () => <Icon name='md-walk' type='ionicon' color='#000' />
  }

    state = {
        startDate: null,
        endDate: null,
        numberOfSteps: 0,
        distance: 0,
        floorsAscended: 0,
        floorsDescended: 0,
        currentPace: 0,
        currentCadence: 0,
      };
  
    componentDidMount() {
      this._startUpdates();
    }
  
    _startUpdates() {
      const today = new Date();
      today.setHours(0,0,0,0);
  
      Pedometer.startPedometerUpdatesFromDate(today.getDate(), (motionData) => {
        console.log("motionData: " + motionData);
        this.setState(motionData);
      });
    }

    render(){
        return(
            <View style={styles.container}>
        <Text style={styles.largeNotice}>
          {this.state.numberOfSteps}
        </Text>
        <Text style={styles.status}>
          You walked {this.state.numberOfSteps} step{this.state.numberOfSteps==1 ? '' : 's'}, or about {this.state.distance} meters.
          </Text>
          <Text style={styles.status}>
          You went up {this.state.floorsAscended} floor{this.state.floorsAscended==1 ? '' : 's'}, and down {this.state.floorsDescended}.
        </Text>
        <Text style={styles.instructions}>
          Just keep your phone in your pocket and go for a walk!
        </Text>
      </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });*/

  //AppRegistry.registerComponent('reactNativePedometer', () => reactNativePedometer);

import React from "react";
import { Pedometer } from "expo-sensors";
import { StyleSheet, Text, View } from "react-native";
import { Header, Icon } from 'react-native-elements';

export class StepCount extends React.Component {
  static navigationOptions = {
		drawerIcon: () => <Icon name='md-walk' type='ionicon' color='#000' />
  }

  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    return (
      <View>
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
        <Text>
          Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}
        </Text>
        <Text>
          Steps taken in the last 24 hours: {this.state.pastStepCount}
        </Text>
        <Text>Walk! And watch this go up: {this.state.currentStepCount}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center"
  }
});
