import React from 'react'
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native'
import { postRequest } from '../common/helper'

import { sharedStyles } from '../common/const'

export default class DropSummaryScreen extends React.Component {
    static route = {
        navigationBar: {
        visible: true,
        },
    };

    state = {
        errorMessage: ""
    }

    _drop(userId, lat, lng, base64img, name, amount) {
        postRequest('users/', {
            userId: 'u123111'
        })
            .then(res => {
                console.log(res)
            })
            .catch(r => {
                console.log(r)
            })
    }

    drop(userId, name, amount, base64img, lat, lng, fromDate, toDate) {
        postRequest('drops.json/', {
            userId: userId,
            lat: lat,
            lng: lng,
            image: base64img,
            name: name,
            total_amount: amount,
            from_date: fromDate.getTime()/1000,
            to_date: toDate.getTime()/1000
        })
            .then(res => {
                console.log(res)
                this.props.navigator.push(
                    'dropSuccess', {
                        status: 'success'
                    }
                )
            })
            .catch(r => {
                console.log(r)
                this.setState({
                errorMessage: r
            })})
    }

    render() {
        const { dropInfo } = this.props.route.params
        console.log(dropInfo)
        return (
            <View style={sharedStyles.container}>
                    <View style={sharedStyles.title}>
                        <Text style={sharedStyles.fontMainBig}>
                            Summary
                        </Text>
                    </View>
                    <View>
                        <View style={{flex:1, flexDirection:'column',justifyContent:'flex-start' }}>
                            <Text style={sharedStyles.fontMain}>
                                {`Content: ${dropInfo.name} + ${dropInfo.amount}\n`}
                            </Text>
                            <View style={{ width:335, flex:1, flexDirection:'row', justifyContent:'space-between' }}>
                                <Text style={sharedStyles.fontMain}>
                                    Location:
                                </Text>
                                <Text style={sharedStyles.fontMain}>
                                    {`${dropInfo.location.coords.latitude}\n`}
                                </Text>
                            </View>
                            <View style={{ width:335, flex:1, flexDirection:'row', justifyContent:'flex-end' }}> 
                                <Text style={sharedStyles.fontMain}>
                                    {`${dropInfo.location.coords.longitude}\n`}
                                </Text>
                            </View>

                            <View style={{ width:335, flex:1, flexDirection:'row', justifyContent:'space-between' }}>
                                <Text style={sharedStyles.fontMain}>
                                    Time:
                                </Text>   
                                <Text style={sharedStyles.fontMain}>
                                    {`${dropInfo.time.from} - ${dropInfo.time.to}\n`}
                                </Text>
                            </View>

                            {/*<Text style={styles.getStartedText}>
                                {`error: ${this.state.errorMessage}\n`}
                            </Text>*/}
                        </View>
                        <Button 
                            title="DROP!!!"
                            onPress={() => this.drop(
                                'u1',
                                'Test Drop',
                                20,
                                dropInfo.content.data,
                                dropInfo.location.coords.latitude,
                                dropInfo.location.coords.longitude,
                                dropInfo.time.from,
                                dropInfo.time.to,
                            )}
                        />
                    </View>

            </View>
        )
    }

    _maybeRenderDevelopmentModeWarning() {
        if (__DEV__) {
        const learnMoreButton = (
            <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
            Learn more
            </Text>
        );

        return (
            <Text style={styles.developmentModeText}>
            Development mode is enabled, your app will run slightly slower but
            you have access to useful development tools. {learnMoreButton}.
            </Text>
        );
        } else {
        return (
            <Text style={styles.developmentModeText}>
            You are not in development mode, your app will run at full speed.
            </Text>
        );
        }
    }
}

const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   developmentModeText: {
//     marginBottom: 20,
//     color: 'rgba(0,0,0,0.4)',
//     fontSize: 15,
//     textAlign: 'center',
//   },
//   contentContainer: {
//     paddingTop: 80,
//   },
//   getStartedContainer: {
//     alignItems: 'center',
//     marginHorizontal: 50,
//   },
//   getStartedText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     lineHeight: 23,
//     textAlign: 'center',
//   },
//   tabBarInfoContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     ...Platform.select({
//       ios: {
//         shadowColor: 'black',
//         shadowOffset: { height: -3 },
//         shadowOpacity: 0.1,
//         shadowRadius: 3,
//       },
//       android: {
//         elevation: 20,
//       },
//     }),
//     alignItems: 'center',
//     backgroundColor: '#fbfbfb',
//     paddingVertical: 20,
//   },
//   tabBarInfoText: {
//     fontSize: 17,
//     color: 'rgba(96,100,109, 1)',
//     textAlign: 'center',
//   },
//   navigationFilename: {
//     marginTop: 5,
//   },
//   helpContainer: {
//     marginTop: 15,
//     alignItems: 'center',
//   },
//   helpLink: {
//     paddingVertical: 15,
//   },
//   helpLinkText: {
//     fontSize: 14,
//     color: '#2e78b7',
//   },
});
