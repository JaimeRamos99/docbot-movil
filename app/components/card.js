import React from 'react';
import {View} from 'react-native';

export class Card extends React.Component {
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
		borderBottomWidth: 0,
		elevation: 0,
		marginLeft: 5,
		marginRight: 5,
		marginTop: 10
	}
};
