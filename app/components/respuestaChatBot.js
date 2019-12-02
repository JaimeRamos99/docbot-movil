import React from 'react';
import { Image, KeyboardAvoidingView, Text, View } from 'react-native'
import { Button, Header, Icon, Input } from 'react-native-elements';
import Chatbot from 'react-native-chatbot';
import { UpdateGoal } from '../services/api.js';
import { connect } from 'react-redux';
import moment from 'moment';

goalsU = [];

class RespuestaChatBot extends React.Component {
    state = { advance: '' , error: ''};
    
    disabledBtn = false;
   
    onButtonPress() {
      this.setState({ error: '' });
        if (!this.state.advance.includes(",") && !this.state.advance.includes(".")) {
            if (this.state.advance*1 != NaN) {
                if (this.state.advance*1 >= 0) {
                  if (this.state.advance*1 == 0 || this.state.advance == null){
                    this.props.triggerNextStep({ trigger: (this.props.nextStep*1 - 4).toString()});
                  }else{
                    this.disabledBtn = true;
                    goalsU = this.props.goals;
                    pos = this.props.positionUpdate;
                    nProgress = goalsU[pos].progress.length - 1;
                    date = moment().format('DD/MM/YYYY');
                    if(goalsU[pos].progress[nProgress].value + this.state.advance*1 >= goalsU[pos].quantity*1){
                      
                      UpdateGoal(goalsU[pos]._id, goalsU[pos].quantity, date, '1', ((goalsU[pos].nMessages*1)+1).toString(), date);
                    }else{
                      UpdateGoal(goalsU[pos]._id, goalsU[pos].progress[nProgress].value + this.state.advance*1, date, goalsU[pos].state, ((goalsU[pos].nMessages*1)+1).toString(), goalsU[pos].complianceDate);
                    }
                    this.props.saveGoals(goalsU);
                    this.setState({error: ''});
                    this.props.triggerNextStep({ trigger: this.props.nextStep });
                  }
                }else{
                    this.setState({ error: 'Dato erroneo' });    
                }
            }else{
                this.setState({ error: 'Debe introducir un numero' });
            }
        }else{
            this.setState({ error: 'El numero no puede ser un decimal' });
        }
      
    }
  
    render() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center' }}>
                <View style={{width : '80%'}}>
                <Text style={{ color: 'red' }}>{this.state.error}</Text>
                <Input
                  keyboardType='numeric'
                  label={'Avance'}
                  placeholder='   Ej: 4'
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