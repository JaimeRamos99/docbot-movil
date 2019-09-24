import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform, Alert } from 'react-native';
import { Button } from 'react-native-elements';
class ReUse extends React.Component {

    handlePress(e, meta) {
        switch (meta) {
            case 1:
                this.props.triggerNextStep({ trigger: 'reuse1-1' });
                break;
            case 2:
                this.props.triggerNextStep({ trigger: 'reuse2-1' });
                break;
            case 3:
                this.props.triggerNextStep({ trigger: 'reuse3-1' });
                break;
            case 4:
                this.props.triggerNextStep({ trigger: 'reuse4-1' });
                break;
            case 5:
                this.props.triggerNextStep({ trigger: 'reuse5-1' });
                break;
            case 6:
                this.props.triggerNextStep({ trigger: 'reuse6-1' });
                break;
            case 7:
                this.props.triggerNextStep({ trigger: 'reuse7-1' });
                break;
            case 8:
                this.props.triggerNextStep({ trigger: 'reuse8-1' });
                break;
            case 9:
                this.props.triggerNextStep({ trigger: 'reuse9-1' });
                break;
            case 10:
                this.props.triggerNextStep({ trigger: 'reuse10-1' });
                break;
            case 11:
                this.props.triggerNextStep({ trigger: 'reuse11-1' });
                break;
            case 12:
                this.props.triggerNextStep({ trigger: 'reuse12-1' });
                break;
            default:
                this.props.triggerNextStep({ trigger: 'end-reuse' });
                break;
        }
    }
    render() {
        return (
            <View>
                {
                    this.props.metas.map((meta) => {
                        return <Button rounded
                            onPress={(event) => this.handlePress(event, meta)}
                            title={meta}
                            buttonStyle={{
                                backgroundColor: "#545aa1",
                                marginBottom:3
                            }}
                        />
                    })
                }
            </View>
        )
    }
}

export default ReUse