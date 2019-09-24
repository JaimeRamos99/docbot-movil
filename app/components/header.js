import React from 'react';
import {Text, View, AppRegistry} from 'react-native';

export class Header extends React.Component{
	render(){
		return (
			<View style={Styles.viewStyle}>
				<Text style={Styles.textStyle}>{props.headerText}</Text>
			</View>
			);
	}
}

const Styles={
	textStyle:{
		fontSize: 30,
    	color: '#000000'
	},
	viewStyle:{
		justifyContent: 'center',
		alignItems: 'center',
		height:80,
		paddingTop: 30,
		elevation: 0,
		position: 'relative'
	}

};