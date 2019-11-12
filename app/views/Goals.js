import React from 'react';
import { StyleSheet, Dimensions, View, StatusBar, ImageBackground, ScrollView } from 'react-native';
import { Left, Right, Text, Card, CardItem, Body } from 'native-base';
import { Header, Icon } from 'react-native-elements';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { CardSection } from '../components/cardsection';
import { GetGoals } from '../services/api.js';
import { connect } from 'react-redux';


class Goals extends React.Component{
    /*static navigationOptions = {
		drawerIcon: () => <Icon name='md-trophy' type='ionicon' color='#000' />
  }*/
  static navigationOptions = {
    title: 'Metas',
  };

    RenderProgressBar(goal){
        if(goal.state == '1'){
            return(
                <ProgressBarAnimated
                    width={Dimensions.get('window').width*0.8}
                    value={((goal.progress*1)/(goal.quantity*1))*100}
                    maxValue={100}
                    backgroundColor="#6CC644"
                />
            );
        }else{
            return(
                <ProgressBarAnimated
                    width={Dimensions.get('window').width*0.8}
                    value={((goal.progress*1)/(goal.quantity*1))*100}
                    maxValue={100}
                    backgroundColor="#1438A6"
                />
            );
        }
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
                        <Card key={'Goal ' + index}>
                            <CardItem>
                                <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 20}}>{item.description}</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={{ flex: 1, flexWrap: 'wrap'}}>Fecha de inicio: {item.creationDate}</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={{ flex: 1, flexWrap: 'wrap'}}>Fecha de finalización: {item.dueDate}</Text>
                            </CardItem>
                            <CardItem>
                                <Text style={{ marginRight: 10 }}>{item.progress + '/' + item.quantity}</Text>
                                {this.RenderProgressBar(item)}
                            </CardItem>
                        </Card>
                    ))}
                </View>
            );
        }
    }

    render() {
            return (
                <View style={{height: '100%', backgroundColor: '#f4f6f8'}}>
                    <ScrollView>
                        {this.ShowGoals()}
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