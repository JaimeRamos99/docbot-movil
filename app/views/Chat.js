import React from 'react';
import { Image, KeyboardAvoidingView, View } from 'react-native'
import { Button, Header, Icon, Input } from 'react-native-elements';
import Chatbot from 'react-native-chatbot';
import { UpdateGoal } from '../services/api.js';
import { connect } from 'react-redux';
import RespuestaChatBot from '../components/RespuestaChatBot.js';
/*
class RespuestaChatBot extends React.Component {
  state = { advance: 0 };
  disabledBtn = false;
 
  onButtonPress() {
    if (this.state.advance == 0){
    }else{
      this.disabledBtn = true;
      goalsU = this.props.goals;
      console.log(this.props.positionUpdate)
      pos = this.props.positionUpdate;
      if(goalsU[pos].progress*1 + this.state.advance*1 >= goalsU[pos].quantity*1){
        UpdateGoal(goalsU[pos]._id, goalsU[pos].quantity, '1', ((goalsU[pos].nMessages*1)+1).toString(), (new Date()).toString());
      }else{
        UpdateGoal(goalsU[pos]._id, (goalsU[pos].progress*1 + this.state.advance*1).toString(), goalsU[pos].state, ((goalsU[pos].nMessages*1)+1).toString(), goalsU[pos].complianceDate);
      }
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
};*/

class Chat extends React.Component {
  /*static navigationOptions = {
		drawerIcon: () => <Icon name='md-chatboxes' type='ionicon' color='#000' />
  }*/

  static navigationOptions = {
    title: 'DocBot',
  };

  steps = [];

  constructor(props) {
    super(props);
    this.GetMessages();
  }

  

  SelectEmoji(type, pos){
    if(type == 'happy'){
      return(
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('../resources/emoji-feliz.png')} style={{width: 50, height: 50}} />
          </View>
      );
    }else{
      UpdateGoal(this.props.goals[pos]._id, this.props.goals[pos].progress, this.props.goals[pos].state, ((this.props.goals[pos].nMessages*1)+1).toString(), this.props.goals[pos].complianceDate);
      return(
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('../resources/emoji-triste.png')} style={{width: 50, height: 50}} />
          </View>
      );
    }
  }

  GetMessages(){
    //this.props.botMessages[0].length == 0
    if (this.props.botMessages[0].length == 0) {
      this.steps.push({
        id: '0',
        message: 'Hola ' + this.props.loggedInUser.name + ' tu doctor aún no te ha asignado ninguna meta',
        trigger: '1',
      });
      this.steps.push({
        id: '1',
        message: 'Vuelve mas tarde a ver si ya tienes metas asignadas, ten un buen dia',
        end: true,
      });
    }else{
      triggerId = 1;
      this.steps.push({
        id: (triggerId-1).toString(),
        message: this.props.botMessages[3].description,
        trigger: triggerId.toString(),
      });
      triggerId++;
      for(let i = 0; i < this.props.botMessages[0].length; i++){
        position = 0;
        for(let j = 0; j < this.props.goals.length; j++){
          if(this.props.goals[j]._id == (this.props.botMessages[0])[i].idmeta){
            position = j;
          }
        }
        this.steps.push({
          id: (triggerId-1).toString(),
          message: (this.props.botMessages[0])[i].pregunta,
          trigger: triggerId.toString(),
        });
        triggerId++;
        this.steps.push({
          id: (triggerId-1).toString(),
          options: [
            { value: 1, label: 'No', trigger: triggerId.toString() },
            { value: 2, label: 'Si', trigger: (triggerId+2).toString() },
          ],
        });
        triggerId++;
        this.steps.push({
          id: (triggerId-1).toString(),
          component: this.SelectEmoji('sad', position),//component<Emoji type='sad'/>
          trigger: triggerId.toString(),
        });
        triggerId++;
        this.steps.push({
          id: (triggerId-1).toString(),
          message: (this.props.botMessages[1])[i].RespuestaNegativa,
          trigger: (triggerId+4).toString(),
        });
        triggerId++;
        this.steps.push({
          id: (triggerId-1).toString(),
          message: '¿Cuanto has avanzado?',
          trigger: triggerId.toString()//triggerId.toString(),
        });
        triggerId++;
        this.steps.push({
          id: (triggerId-1).toString(),
          component: <RespuestaChatBot goals={this.props.goals} positionUpdate={position} nextStep={triggerId.toString()} />,
          waitAction: true
        });
        triggerId++;
        this.steps.push({
          id: (triggerId-1).toString(),
          component: this.SelectEmoji('happy', position),//componente<Emoji type='happy'/>
          trigger: triggerId.toString(),
        });
        triggerId++;
        this.steps.push({
          id: (triggerId-1).toString(),
          message: (this.props.botMessages[2])[i].RespuestaPositiva,
          trigger: triggerId.toString(),
        });
        triggerId++;
        if (i == this.props.botMessages[0].length-1) {
          this.steps.push({
            id: (triggerId-1).toString(),
            message: this.props.botMessages[4].description,
            end: true,
          });
        }
      }
    }
  }

  render(){
    return(
      <KeyboardAvoidingView
        behavior='padding'
      >
        <Chatbot
          steps={this.steps} 
          botBubbleColor='#3F51B5'
          botFontColor='#fff'
          optionBubbleColor='#3F51B5'
          optionFontColor='#fff'
          userBubbleColor='#1438A6'
          userFontColor='#fff'
        />
      </KeyboardAvoidingView>
    );
  }
}

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
    saveGoals : (goals) => dispatch({type:'save_goals', payload: goals}),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);

/*{
      id: '0',
      message: 'Hola, ' + this.props.loggedInUser + ' soy DocBot',
      trigger: '1',
    },
    {
      id: '1',
      message: 'Por ordenes de mas arriba **coff coff** Profesores **coff coff* lo siento hasta los bots tenemos tos, en fin quien me programó me obliga a pedir que me comentes como quieres que te trate',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: 1, label: 'Formal', trigger: '3' },
        { value: 2, label: 'Informal', trigger: '8' },
      ],
    },
    {
      id: '3',
      message: 'Muy bien, como usted desee',
      trigger: '4',
    },
    {
      id: '4',
      message: 'Ahora, ¿podría decirme cuántas veces desea que le recuerde sobre tomar sus medicamentos?',
      trigger: '5',
    },
    {
      id: '5',
      user: true,
      validator: (value) => {
        if (isNaN(value)) {
          return 'Por favor, el valor debe ser numérico';
        }
        return true;
      },
      trigger: '6',
    },
    {
      id: '6',
      message: 'Muchas gracias señor/a ' + this.props.loggedInUser + ' así se hará',
      trigger: '7',
    },
    {
      id: '7',
      message: 'Hasta luego y que tenga un excelente dia',
      end: true,
    },
    {
      id: '8',
      message: 'Muy bien, así será',
      trigger: '9',
    },
    {
      id: '9',
      message: '¿Cuántas veces deseas que te recuerde tomar los medicamentos?',
      trigger: '10',
    },
    {
      id: '10',
      user: true,
      validator: (value) => {
        if (isNaN(value)) {
          return 'El valor debe ser numérico';
        }
        return true;
      },
      trigger: '11',
    },
    {
      id: '11',
      message: 'Ok, lo tendré en cuenta',
      trigger: '12',
    },
    {
      id: '12',
      message: 'Hasta luego',
      end: true,
    },*/