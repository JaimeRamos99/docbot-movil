import React from 'react';
import { View, Text, Image, TextInput, Platform } from 'react-native';

export class BackgroundImage extends React.Component {

    render() {
        return (
            <Image source={require('../../assets/geometry-background.png')}
            style={styles.backgroundImage}>
                    
                    {this.props.children}
                    
            </Image>
        )
    }
    
}
const styles = {
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    }
};
