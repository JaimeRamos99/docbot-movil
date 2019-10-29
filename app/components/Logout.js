import React from 'react';
import { View } from 'react-native';

export class Logout extends React.Component {
    logout(){
        throw 'LOGOUT'
    }
    render(){
        return(
            <View>
                {this.logout()}
            </View>
        );
    }
}