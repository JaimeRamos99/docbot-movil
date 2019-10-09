import React from 'react';
import { StyleSheet, Dimensions, View, StatusBar, ImageBackground, ScrollView } from 'react-native';
import { Left, Right, Icon, Text, Card, CardItem, Body } from 'native-base';
import { Header } from 'react-native-elements';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { CardSection } from '../components/cardsection';


export class Goals extends React.Component{
    static navigationOptions = {
		drawerIcon: () => <Icon name='md-trophy' type='ionicon' color='#000' />
  }
    
    state = {
      metas: []
    }
    
  calcularScoreTotal = (array) => {
        if (array.length >= 3 && this.state.score === 0) {
            var score = 0;
            var cont = 0;
            array.forEach(element => {
                score += element["score"];
                cont++;
            });
            score = score / cont;
            this.setState({ score: score });
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
                          onPress={() => this.props.navigation.openDrawer()}/>
                      }
                    centerComponent={{ text: 'Inicio', style: { color: '#fff' } }}
                    containerStyle={{
                        backgroundColor: '#1438A6',
                    }}
                />
                <ScrollView>
                    <Card transparent>
                        <CardItem header>
                            <Text style={{fontSize: 20}}>Comer verduras</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>1/5 porciones</Text>
                                <ProgressBarAnimated
                                    width={Dimensions.get('window').width*0.8}
                                    value={20}
                                    maxValue={100}
                                    backgroundColorOnComplete="#6CC644"
                                />
                            </Body>
                        </CardItem>
                    </Card>
                    <Card transparent>
                        <CardItem header>
                            <Text style={{fontSize: 20}}>Tomar 10 vasos de agua</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>10/10 vasos</Text>
                                <ProgressBarAnimated
                                    width={Dimensions.get('window').width*0.8}
                                    value={100}
                                    maxValue={100}
                                    backgroundColorOnComplete="#6CC644"
                                />
                            </Body>
                        </CardItem>
                    </Card>
                </ScrollView>
            </View>
          );
      }
}
