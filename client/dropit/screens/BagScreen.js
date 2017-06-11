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
import moment from 'moment'
import { postRequest, getRequest } from '../common/helper'
import { sharedStyles, BASE_URL } from '../common/const'

import TimerMixin from 'react-timer-mixin'
import { MapView, Constants, Location, Permissions } from 'expo'

import { myUserId } from '../common/const'

export default class BagScreen extends React.Component {
    static route = {
        navigationBar: {
        visible: true,
        },
    };

    state = {
        myDrops: []
    }

    componentWillMount() {
        const params = {
            userId: myUserId,
            filter: 'received'
        }

        getRequest(`get-drops`, params)
            .then(res => {
                this.setState({
                    myDrops: res
                })
            })
            .catch(r => {
                console.log(r.message)
            })
    }

    // componentDidMount() {
    //     // this._notificationSubscription = this._registerForPushNotifications();
    //     TimerMixin.setInterval(this._getLocationAsync, 5000)
    // }


    // _getLocationAsync = async () => {
    //     let { status } = await Permissions.askAsync(Permissions.LOCATION);
    //     if (status !== 'granted') {
    //     this.setState({
    //         errorMessage: 'Permission to access location was denied',
    //     });
    //     }

    //     let location = await Location.getCurrentPositionAsync({});
    //     this.setState({ location });

    //     const params = {
    //         userId: myUserId,
    //         lat: location.coords.latitude,
    //         lng: location.coords.longitude
    //     }

    //     console.log(params)

    //     getRequest('explore', params)
    //         .then(res => {
    //             console.log(res)
    //             const dropId = res
    //             if (res != "" && res != null) {
    //                 this.props.navigator.showLocalAlert(
    //                     `You have received a drop`,
    //                     Alerts.notice
    //                 )
    //                 setTimeout(() => {
    //                     this.props.navigator.push(
    //                         'viewDrop', { dropId: dropId }
    //                 )} , 3000);
    //             }
    //         })
    //         .catch(r => {
    //             console.log(r.message)
    //     })
    // }


    render() {
        return (
            <View style={sharedStyles.container}>
                <View style={sharedStyles.title}>
                    <Text 
                        style={sharedStyles.fontMainBig}
                          onPress={() => {
                            const params = {
                                userId: myUserId,
                                filter: 'received'
                            }

                            getRequest(`get-drops`, params)
                                .then(res => {
                                    this.setState({
                                        myDrops: res
                                    })
                                })
                                .catch(r => {
                                    console.log(r.message)
                            })
                          }}
                        >
                        Your Bag
                    </Text>
                </View>

                <View style={{flex:1, flexDirection:'column',justifyContent:'space-around', width: 335}}>

                    { this.state.myDrops.map(d => {
                        return (
                            <View 
                                style={{width: '100%', flexDirection:'row',justifyContent:'flex-start', marginTop:20,backgroundColor:'#ffffff' } }
                            >
                                <View>
                                { d.image != "" && d.image != null
                                        ?   <Image source={{ uri: `${BASE_URL}${d.image}` }} style={{ width: 120, height: 120 }} />
                                        : null }
                                </View>
                                <View style={{flex: 1, flexDirection:'column',justifyContent:'space-between', padding:10}} >
                                    <View style={{width:150}}>
                                        <Text style={sharedStyles.fontMainBig} onPress={() => {
                                            const dropInfo = {
                                                id: d.id,
                                                name: d.name,
                                                creator: d.creator,
                                                image: d.image
                                            }
                                            this.props.navigator.push('viewDrop', { dropInfo: dropInfo })
                                        }}>
                                            {`${d.name}`}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={sharedStyles.fontGrey}>
                                            {`Picked date: ${moment(d.received).format('ddd MMMM DD YYYY')}`}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={sharedStyles.fontGrey}>
                                            {`Dropped by: ${d.creator}`}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }

    _bakmaybeRenderDevelopmentModeWarning() {
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
