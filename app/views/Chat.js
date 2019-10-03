import React from 'react';
import { View } from 'react-native'
import { Header, Icon } from 'react-native-elements';
import Chatbot from 'react-native-chatbot';


export class Chat extends React.Component {
  static navigationOptions = {
		drawerIcon: () => <Icon name='md-chatboxes' type='ionicon' color='#000' />
  }

  chatbot(){
    const steps = [
      {
        id: '0',
        message: 'Hola, soy el bot que te ayudará en tu proceso de tener una forma de vida mas saludable',
        trigger: '1',
      },
      {
        id: '1',
        message: 'Mi nombre es (inserte nombre del bot)',
        trigger: '2',
      },
      {
        id: '2',
        message: 'Aún no estoy funcionando pero pronto el administrador de la app me pondrá en funcionamiento',
        trigger: '3',
      },
      {
        id: '3',
        message: 'Nos vemos, bye',
        end: true,
      },
    ];
    return(
      <Chatbot 
        steps ={steps} 
        botBubbleColor='#3F51B5' 
        />
    );
  }

  render(){
    return(
      <View>
        {
          this.chatbot()
        }
      </View>
    );
  }
}
