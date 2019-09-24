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

var screen = Dimensions.get('window');
export class ClinicalHistory extends React.Component {
    state = {addElementVisible: false, exams: ['Primera toma', 'Segunda toma', 'Primera toma', 'Segunda toma', 'Primera toma', 'Segunda toma', 'Primera toma', 'Segunda toma', 'Primera toma', 'Segunda toma', 'Primera toma', 'Segunda toma', 'Primera toma', 'Segunda toma']}
    
    mostrarMetas(){
        if(this.state.exams == undefined){
            return(
                <Text>No hay paraclinicos agregados</Text>
            );
        }else{
            return(
                <View>
                    { this.state.exams.map((item, key) => (
                        <Card>
                            <CardItem>
                                <Text>{item}</Text>
                            </CardItem>
                            <CardItem>
                                <Text> aslkdmasknajfnaiusnduiasndianuisdnaiusnfiuaniufnsijdnfijsdnvijd fijb djif b</Text>
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
            <View>
                <ScrollView>
                    {
                        this.mostrarMetas()
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
                        <Input placeholder='Medida'/>
                        <Button
                        rounded
                        title="Guardar"
                        onPress={() => this.setState({ addElementVisible: false,  })}
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
/*<Icon
                    reverse
                    name='ios-add'
                    type='ionicon'
                    color='#1438A6'
                    onPress={() => this.setState({addElementVisible: true})}
                    />*/