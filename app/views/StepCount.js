import React from "react";
import { Pedometer } from "expo-sensors";
import { StyleSheet, Text, View, WebView } from "react-native";
import { Header, Icon } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import moment from 'moment';

const tintColor = "#8BBF71";
const backgroundColor = "#717BA5";
const rotation = 360;

const dayDim = {
  size: 270,
  width: 10
};

const today = new Date();
const day = moment(today).format('dddd');
const date = moment(today).format("MMMM D, YYYY");

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

  runJSInBackground (code) {
		this.webView.injectJavaScript(code)
    }
    
	  handleMessage = (e) => {
		const message = e.nativeEvent.data
		console.log('message from webview:', message)
    }
    
  renderStepCountCOmponent(){
    if (true){
        return(
          <AnimatedCircularProgress
            size={dayDim.size}
            width={dayDim.width}
            fill={100}
            tintColor={tintColor}
            backgroundColor={backgroundColor}
            rotation={rotation}
          >
            {
              (fill) => (
                <View>
                  <Icon name='md-walk' type='ionicon' color='#77cff2' size={50} />
                    <Text style={styles.steps}>
                        {this.state.currentStepCount} Pasos
                    </Text>
                </View>
              )
            }
          </AnimatedCircularProgress>
        );
    }else{
      return(
        <AnimatedCircularProgress
          size={dayDim.size}
          width={dayDim.width}
          fill={100}
          tintColor={tintColor}
          backgroundColor={backgroundColor}
          rotation={rotation}
        >
          {
            (fill) => (
              <View>
                <Icon name='md-walk' type='ionicon' color='#77cff2' size={50} />
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
      );
    }
  }

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
              size={30}
              onPress={() => this.props.navigation.openDrawer()}/>
          }
          centerComponent={{ text: 'Contador de pasos', style: { color: '#fff', fontSize: 25 } }}
          containerStyle={{
            backgroundColor: '#1438A6',
          }}
        />
        <View style={{alignItems:'center', justifyContent: 'center', marginTop: 20}}>
          <View>
            <Text style={{fontSize: 30, color: '#3f51b5', margin: 20 }}>
              {day}
            </Text>
            <Text style={{fontSize: 30, color: '#3f51b5', margin: 20 }}>
              {date}
            </Text>
          </View>
          {this.renderStepCountCOmponent()}
        </View>
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
      color: '#77cff2'
  },
  goal: {
      color: '#77cff2'
  }
});
