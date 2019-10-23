import React from 'react';
import { StyleSheet, Dimensions, View, StatusBar, ImageBackground, ScrollView } from 'react-native';
import { Left, Right, Text, Card, CardItem, Body } from 'native-base';
import { Header, Icon } from 'react-native-elements';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { CardSection } from '../components/cardsection';
import { GetGoals } from '../services/api.js';
import { connect } from 'react-redux';


class Goals extends React.Component{
    static navigationOptions = {
		drawerIcon: () => <Icon name='md-trophy' type='ionicon' color='#000' />
  }
    ShowGoals(){
        if(this.props.goals == undefined){
            return(
                <Text>No hay metas agregados</Text>
            );
        }else{
            return(
                <View>
                    { this.props.goals.map((item, index) => (
                        <Card transparent key={'Goal ' + index}>
                            <CardItem header>
                                <Text style={{fontSize: 20}}>{item.description}</Text>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Text>{item.progress + '/' + item.quantity}</Text>
                                    <ProgressBarAnimated
                                        width={Dimensions.get('window').width*0.8}
                                        value={((item.progress*1)/(item.quantity*1))*100}
                                        maxValue={100}
                                        backgroundColorOnComplete="#6CC644"
                                    />
                                </Body>
                            </CardItem>
                        </Card>
                    ))}
                </View>
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
                          onPress={() => this.props.navigation.openDrawer()}/>
                      }
                    centerComponent={{ text: 'Inicio', style: { color: '#fff' } }}
                    containerStyle={{
                        backgroundColor: '#1438A6',
                    }}
                />
                <ScrollView>
                    {
                        this.ShowGoals()
                    }
                </ScrollView>
            </View>
          );
      }
}

function mapStateToProps(state){
	return{
        loggedInUser: state.loggedInUser,
        goals: state.goals
	}
}

export default connect(mapStateToProps)(Goals);

/*
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
                    </Card>*/