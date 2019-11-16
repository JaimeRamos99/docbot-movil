import React from 'react';
import { AppRegistry, 
        Flatlist, 
        StyleSheet, 
        Text, 
        ScrollView,
        View, 
        Image, 
        Alert, 
        Platform, 
        TouchableHighlight, 
        Dimensions, 
        TextInput } from 'react-native';
import { Button, Icon, Input, Overlay, Header } from 'react-native-elements';
import { Left, Right, Card, CardItem, Body, Fab } from 'native-base';
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux';
import { CreateParaclinical } from '../services/api.js';
import { Hoshi } from 'react-native-textinput-effects';
import moment from 'moment';

paraclinicals = [];

class ClinicalHistory extends React.Component {
    /*static navigationOptions = {
		drawerIcon: () => <Icon name='md-clipboard' type='ionicon' color='#000' />
  }*/

  static navigationOptions = {
    title: 'Toma de glucosa',
  };

    state = {addElementVisible: false, value: ''}
    
    saveParaclinical(){
        addParaclinicals = this.props.paraclinicals;//Toma por referencia
        /*paraclinical = this.props.paraclinicals[0];
        paraclinical.type = 'Glucosa';
        paraclinical.value = this.state.value;*/
        paraclinical = {
            __v: 0,
            _id: "5dc26aa0ab3fb10017846912",
            comment: "-.-",
            date: moment().format('DD/MM/YYYY h:mm a'),
            patient: "5db7b48006fd9800178f7222",
            type: "Glucosa",
            value: this.state.value,
          }
        addParaclinicals.push(paraclinical);
        this.props.saveParaclinicals();
        CreateParaclinical(this.props.loggedInUser.id, 'Glucosa', this.state.value, moment().format('DD/MM/YYYY h:mm:ss a'));
        this.setState({value: '', addElementVisible: false});
    }

    showParaclinicals(){
        if(this.props.paraclinicals.length == 0){
            return(
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 20}}>No hay paraclinicos registrados</Text>
                </View>
                );
        }else{
            return(
                <View>
                    { this.props.paraclinicals.map((item, index) => (
                        <View key={'Paraclinical ' + index} style={{
                            marginTop: 5,
                            marginBottom: 5,
                            padding: 10,
                            backgroundColor: "#fff",
                            width: Dimensions.get('window').width*0.95,
                            borderColor: '#000',
                            borderWidth: 1,
                            borderRadius: 10, }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                <Icon name='md-time' type='ionicon' color='#000' size={15} />
                                <Text style={{ fontSize: 15, marginLeft: 5, color: '#000' }}>{item.date}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '50%', flexWrap: 'wrap' }}>
                                    <Text style={{fontSize: 20}}>Nivel de {item.type}</Text>
                                </View>
                                <View style={{ width: '50%', flexWrap: 'wrap', flexDirection: 'row-reverse' }}>
                                    <Text style={{fontSize: 20}}>{item.value}</Text>
                                </View>
                            </View>
                        </View>
                        )
                    )}
                </View>
            );
        }
    }

    render(){
        return(
            <View style={{ height: '100%', width:'100%', alignItems: 'center', backgroundColor: '#f4f6f8' }}>
                <ScrollView>
                    {this.showParaclinicals()}
                </ScrollView>
                <Overlay 
                    isVisible={this.state.addElementVisible}
                    width={Dimensions.get('window').width*0.8}
                    height='auto'
                    borderRadius={10}
                    onBackdropPress={() => this.setState({ addElementVisible: false })}
                >
                    <View>
                        <Text style={{fontSize: 20}}>Medida de glucosa</Text>
                        <Input
                            keyboardType='numeric'
                            placeholder='   Medida'
                            label='Medida'
                            onChangeText={value => this.setState({ value })}
                        />
                        <Button
                        rounded
                        title="Guardar"
                        onPress={() => this.saveParaclinical()}
                        buttonStyle={{
                            marginTop: 20,
                            borderRadius: 25,
                            backgroundColor: "#1438A6",
                            width: '50%',
                          }}
                        />
                        <Button
                        rounded
                        title="Cancelar"
                        onPress={() => this.setState({ addElementVisible: false })}
                        buttonStyle={{
                            marginTop: 20,
                            borderRadius: 25,
                            backgroundColor: "#545aa1",
                            width: '50%',
                          }}
                        />
                    </View>
                </Overlay>
                <Fab
                    style={{ backgroundColor: '#1438A6' }}
                    onPress={() => this.setState({addElementVisible: true})}
                >
                    <Icon
                        name='md-add'
                        type='ionicon'
                        color='#fff'
                    />
                </Fab>
            </View>
        );
    }
}

function mapStateToProps(state){
	return{
        loggedInUser: state.loggedInUser,
        paraclinicals: state.paraclinicals
	}
}

function mapDispatchToProps(dispatch){
	return{
		saveParaclinicals : () => dispatch({type:'save_paraclinicals', payload: paraclinicals}),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ClinicalHistory);
/*<Icon
                    reverse
                    name='ios-add'
                    type='ionicon'
                    color='#1438A6'
                    onPress={() => this.setState({addElementVisible: true})}
                    />
                    
                    
                    <Card key={'Paraclinical ' + index}>
                            <CardItem>
                                <Body>
                                <Text style={{fontSize: 15}}>{item.date}</Text>
                                <Text style={{fontSize: 20}}>Nivel de {item.type}</Text>
                                <Text style={{fontSize: 20}}>{item.value}</Text>
                                </Body>
                            </CardItem>
                        </Card>*/