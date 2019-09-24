import React from 'react';
import {View} from 'react-native';

export class CardSection extends React.Component{
	render(){
		return(
			<View style={styles.containerStyle}>
				{this.props.children}
			</View>
		);
	}
};

const styles={
	containerStyle:{
		padding: 5,
		justifyContent: 'flex-start',
		flexDirection:'row',
		position: 'relative',
		borderColor:'white'
	}
};
