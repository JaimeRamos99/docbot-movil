// Login.js
import React from 'react';
import { View, Text, TextInput, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import { Hoshi } from 'react-native-textinput-effects';
import moment from 'moment';
import { Icon } from 'native-base';

let score = 0;
class RespuestaChatBot extends React.Component {
    state = { respuesta: 0 };

    disabledBtn = false;
    onButtonPress() {
        this.disabledBtn = true;
        var currentDate = new Date();

        currentDate = currentDate.getTime();
        var year = moment().format('YYYY');
        var week = moment().format('WW');
        var day = moment().format('E');

        if (this.props.meta === -1) {
            const { currentUser } = firebase.auth()
            firebase.database()
                .ref('progreso/usuarios/' + currentUser.uid + '/' + year + '/' + week + '/peso')
                .child(currentDate)
                .set({
                    'peso':this.state.respuesta
                })
                .then((data)=>{
                    this.props.triggerNextStep({ trigger: this.props.currentStep + 1 });
                })
        } else {
            if (this.props.menorQueCorrecto === true) {
                score = 1 - (this.state.respuesta / (this.props.correctValue * 2))
                score = score * 100
                if (this.state.respuesta <= this.props.correctValue) {
                    score = 100;
                }
                if (score < 0) score = 0
            } else {
                score = this.state.respuesta / this.props.correctValue;
                score = score * 100;
                if (this.state.respuesta >= this.props.correctValue) {
                    score = 100;
                }
            }


            const { currentUser } = firebase.auth()
            firebase.database()
                .ref('progreso/usuarios/' + currentUser.uid + '/' + year + '/' + week + '/metas/' + this.props.meta)
                .child(currentDate)
                .set({
                    'respuesta': this.state.respuesta,
                    'score': score
                }).then((data) => {
                    //success callback
                    if (this.props.ifIsReuse === false) {
                        if (this.props.menorQueCorrecto === true) {
                            if (this.state.respuesta <= this.props.correctValue) {
                                this.props.triggerNextStep({ trigger: this.props.currentStep + 1 });
                            } else {
                                this.props.triggerNextStep({ trigger: this.props.currentStep + 5 });
                            }
                        }
                        else {
                            if (this.state.respuesta >= this.props.correctValue) {
                                this.props.triggerNextStep({ trigger: this.props.currentStep + 1 });
                            } else {
                                this.props.triggerNextStep({ trigger: this.props.currentStep + 5 });
                            }
                        }
                    } else {
                        this.props.triggerNextStep({ trigger: 'end-reuse' })
                    }



                }).catch((error) => {
                    //error callback
                    if (this.state.respuesta >= this.props.correctValue) {
                        this.props.triggerNextStep({ trigger: this.props.currentStep + 1 });
                    } else {
                        this.props.triggerNextStep({ trigger: this.props.currentStep + 5 });
                    }
                })
        }



    }

    renderButton() {
        return (
            <Button
                rounded
                onPress={this.onButtonPress.bind(this)}
                disabled={this.disabledBtn}
                icon={{ name: 'check' }}
                buttonStyle={{
                    backgroundColor: "#545aa1",
                }}
            />);

    }

    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Hoshi
                    keyboardType='numeric'
                    label={'Respuesta'}
                    value={this.state.respuesta}
                    onChangeText={respuesta => this.setState({ respuesta })}
                    editabled={!this.disabledBtn}
                    style={{ width: '80%' }}
                    borderColor={'#000000'}
                />
                {this.renderButton()}
            </View>
        );
    }
};


export default RespuestaChatBot;
