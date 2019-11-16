import React from 'react';
import { Image, KeyboardAvoidingView, View } from 'react-native'
import { Button, Header, Icon, Input } from 'react-native-elements';
import Chatbot from 'react-native-chatbot';
import { UpdateGoal } from '../services/api.js';
import { connect } from 'react-redux';
import moment from 'moment';

goalsU = [];

class RespuestaChatBot extends React.Component {
    state = { advance: 0 };
    
    disabledBtn = false;
   
    onButtonPress() {
      if (this.state.advance == 0 || this.state.advance == null){
        this.props.triggerNextStep({ trigger: (this.props.nextStep*1 - 4).toString()});
      }else{
        this.disabledBtn = true;
        goalsU = this.props.goals;
        pos = this.props.positionUpdate;
        if(goalsU[pos].progress*1 + this.state.advance*1 >= goalsU[pos].quantity*1){
          UpdateGoal(goalsU[pos]._id, goalsU[pos].quantity, '1', ((goalsU[pos].nMessages*1)+1).toString(), moment().format('DD/MM/YYYY'));
        }else{
          UpdateGoal(goalsU[pos]._id, (goalsU[pos].progress*1 + this.state.advance*1).toString(), goalsU[pos].state, ((goalsU[pos].nMessages*1)+1).toString(), goalsU[pos].complianceDate);
        }
        this.props.saveGoals(goalsU);
        this.props.triggerNextStep({ trigger: this.props.nextStep });
      }
    }
  
    render() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center' }}>
                <View style={{width : '80%'}}>
                <Input
                  keyboardType='numeric'
                  label={'Avance'}
                  onChangeText={advance => this.setState({ advance })}
                  editabled={!this.disabledBtn}
                />
                </View>
                <Button
                  rounded
                  onPress={this.onButtonPress.bind(this)}
                  disabled={this.disabledBtn}
                  icon={{ name: 'check' }}
                  buttonStyle={{
                      backgroundColor: "#545aa1",
                  }}
              />
            </View>
        );
    }
  };

  function mapStateToProps(state){
	return{
    loggedInUser: state.loggedInUser,
    botMessages: state.botMessages,
    goals: state.goals
	}
}

function mapDispatchToProps(dispatch){
	return{
    saveUser : () => dispatch({type:'Save_User', payload: userGlobal}),
    saveGoals : () => dispatch({type:'save_goals', payload: goalsU}),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RespuestaChatBot);