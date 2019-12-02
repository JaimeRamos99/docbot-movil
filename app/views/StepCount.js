import React from "react";
import { Pedometer } from "expo-sensors";
import { StyleSheet, Text, View, WebView } from "react-native";
import { Header, Icon } from 'react-native-elements';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import moment from 'moment';
import { connect } from 'react-redux';
import { UpdatePatient, UpdatePatientWeight, UpdateGoal } from '../services/api.js';
import GoogleFit, { Scopes } from 'react-native-google-fit'

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

class StepCount extends React.Component {
  /*static navigationOptions = {
		drawerIcon: () => <Icon name='md-walk' type='ionicon' color='#000' />
  }*/

  static navigationOptions = {
    title: 'Contador de pasos',
  };

  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0
  };

  Steps(){
    const options = {
      startDate: "2019-01-01T00:00:17.971Z", // required ISO8601Timestamp
      endDate: new Date().toISOString() // required ISO8601Timestamp
    };
     
    GoogleFit.getDailyStepCountSamples(options)
     .then((res) => {
         console.log('Daily steps >>> ', res)
     })
     .catch((err) => {console.warn(err)})
  }

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
    user = this.props.loggedInUser;
    user.steps = (user.steps*1 + this.state.currentStepCount).toString();
    UpdatePatient(user.id, user.name, user.lastName, user.age, user.height, user.avatar, user.steps, user.email);
    this.props.saveUser(user);
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
    //this.Steps();
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
    console.log(this.props.loggedInUser)
    return (
      <View style={{ height: '100%', backgroundColor: '#f4f6f8' }}>
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
      flexWrap: 'wrap',
      textAlign: 'center',
      color: '#77cff2'
  },
  goal: {
      color: '#77cff2'
  }
});

function mapStateToProps(state){
	return{
        loggedInUser: state.loggedInUser,
	}
}

function mapDispatchToProps(dispatch){
	return{
		saveUser : (user) => dispatch({type:'Save_User', payload: user}),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StepCount);

/*<Header
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
        />*/ 
