import React from "react";
import { Pedometer } from "expo-sensors";
import { StyleSheet, Text, View } from "react-native";
import { Header, Icon } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const tintColor = "#8BBF71";
const backgroundColor = "#717BA5";
const rotation = 360;

const dayDim = {
  size: 270,
  width: 10
};

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

        <AnimatedCircularProgress
                size={dayDim.size}
                width={dayDim.width}
                fill={0}
                tintColor={tintColor}
                backgroundColor={backgroundColor}
                rotation={rotation}
            >
                {
                    (fill) => (
                        <View>
                          <Icon name='md-walk' type='ionicon' color='#29b8e5' size={50} />
                            <Text style={styles.steps}>
                                {this.state.currentStepCount} Steps
                            </Text>
                            <Text style={styles.goal}>
                                Goal: 10000
                            </Text>
                        </View>
                    )
                }
            </AnimatedCircularProgress>
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
  },
  steps: {
      backgroundColor: 'transparent',
      fontSize: 30,
      textAlign: 'center',
      color: '#29b8e5'
  },
  goal: {
      color: '#29b8e5'
  }
});
