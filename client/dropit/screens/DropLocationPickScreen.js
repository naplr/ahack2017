import React from 'react';
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
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { getLocationAsync } from '../common/helper'
import { MapView, Constants, Location, Permissions } from 'expo';

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
          console.log('in here')
          console.log(this.state.location.coords.latitude)
          console.log(this.state.location.coords.longitude)
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
          console.log('but here')
          return null
      }
  }

  render() {
    const { dropInfo } = this.props.route.params
    console.log(this.state.location)
    return (
      <View style={styles.container}>
          <View style={{ height: 400 }}>
            { this.renderMap()}
        </View>
          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>
                { dropInfo.content }
            </Text>
            <Button 
                title="Pick Location"
                onPress={() => this.props.navigator.push(
                    'dropTimePick',
                    {
                        dropInfo: Object.assign(
                            dropInfo, 
                            { location: 'my location' }
                        )
                    }
                )}
            />
          </View>
      </View>
    );
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

  _handlePress = () => {
      this.props.navigator.push('contentPick', {name: 'Hello People'})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 15,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 80,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 140,
    height: 38,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 23,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
