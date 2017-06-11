import React from 'react'
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native'

import { getLocationAsync } from '../common/helper'
import { MapView, Constants, Location, Permissions } from 'expo'

import { sharedStyles } from '../common/const'

export default class DropLocationPickScreen extends React.Component {
    static route = {
        navigationBar: {
        visible: true,
        },
    };

    state = {
        location: null,
        errorMessage: null
    }

    componentWillMount() {
        // const locData = getLocationAsync()
        // if (locData.success) {
        //     this.setState({
        //         location: locData.location
        //     })
        // }
        this._getLocationAsync()
    }

    renderMap() {
        if (this.state.location != null) {
            return (
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: this.state.location.coords.latitude,
                        longitude: this.state.location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <MapView.Marker
                        coordinate={{
                            latitude: this.state.location.coords.latitude,
                            longitude: this.state.location.coords.longitude,
                        }}
                        title={'title'}
                        description={'description'}
                    />
                </MapView>
            )
        } else {
            console.log('There is no location')
            return null
        }
    }

    render() {
        const { dropInfo } = this.props.route.params
        Object.assign(dropInfo, { 
            location: this.state.location
        })

        return (
            <View style={styles.container}>
                <View style={sharedStyles.title} >
                    <Text style={sharedStyles.fontMainBig}>
                        Select Location
                    </Text>
                </View>
                <View style={{ height: 400}}>
                    { this.renderMap() }
                </View>
                
                <View style={{marginTop:'auto', marginBottom: 35}}>
                    <Button
                        color='#C42E34'
                        title="Continue >"
                        onPress={ () => {
                            this.props.navigator.push('dropTimePick', { dropInfo: dropInfo }) 
                        }}
                    />
                </View>
            </View>
        )
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
    };

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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

});
