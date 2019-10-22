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
//import { Icon } from 'react-native-vector-icons';
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux';
import { CreateParaclinical } from '../services/api.js';
import { Hoshi } from 'react-native-textinput-effects';

paraclinicals = [];

class ClinicalHistory extends React.Component {
    static navigationOptions = {
		drawerIcon: () => <Icon name='md-clipboard' type='ionicon' color='#000' />
  }

    state = {addElementVisible: false, value: ''}
    
    saveParaclinical(){
        addParaclinicals = this.props.paraclinicals;
        paraclinical = this.props.paraclinicals[0];
        paraclinical.type = 'Glucosa';
        paraclinical.value = this.state.value;
        addParaclinicals.push(paraclinical);
        this.props.saveParaclinicals();
        CreateParaclinical(this.props.loggedInUser.id, 'Glucosa', this.state.value);
        this.setState({value: '', addElementVisible: false});
    }

    showParaclinicals(){
        if(this.props.paraclinicals.length == 0){
            return(
                <Text>No hay paraclinicos agregados</Text>
            );
        }else{
            return(
                <View>
                    { this.props.paraclinicals.map((item, index) => (
                        <Card key={'Paraclinical ' + index}>
                            <CardItem>
                                <Body>
                                <Text style={{fontSize: 15}}>{item.date}</Text>
                                <Text style={{fontSize: 20}}>Nivel de {item.type}</Text>
                                <Text style={{fontSize: 20}}>{item.value}</Text>
                                </Body>
                            </CardItem>
                        </Card>
                        )
                    )}
                </View>
            );
        }
    }

    render(){
        return(
            <View style={{ height: '100%', width:'100%' }}>
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
                <ScrollView>
                    {
                        this.showParaclinicals()
                    }
                </ScrollView>
                <Overlay 
                    isVisible={this.state.addElementVisible}
                    width={Dimensions.get('window').width*0.8}
                    height='auto'
                    borderRadius={10}
                    onBackdropPress={() => this.setState({ addElementVisible: false })}
                >
                    <View>
                        <Text style={{fontSize: 20}}>Glucosa</Text>
                        <Hoshi
                            value={this.state.value}
                            onChangeText={value => this.setState({ value })}
                            label={'Contraseña'}
                            style={{ width: 300 }}
                            borderColor={'#000000'}
					/>
                        <Button
                        rounded
                        title="Guardar"
                        onPress={() => this.saveParaclinical()}
                        buttonStyle={{
                            marginTop: 20,
                            borderRadius: 25,
                            backgroundColor: "#545aa1",
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
                        reverse
                        name='ios-add'
                        type='ionicon'
                        color='#1438A6'
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
                    />*/