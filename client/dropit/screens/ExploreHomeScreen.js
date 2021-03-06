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

import { MapView, Constants, Location, Permissions } from 'expo';

import { MonoText } from '../components/StyledText';
import { getRequest, postRequest } from '../common/helper'

import { myUserId } from '../common/const'

export default class DropContentPickScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  };

  constructor(props) {
      super(props)
      this.state = {
          dropId: "",
          location: null,
          errorMessage: null
      }
  }

  componentWillMount() {
    this._getLocationAsync()
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>

          <View style={styles.getStartedContainer}>
            <Text style={styles.getStartedText}>
                "Explore!!"
            </Text>
            <Text style={styles.getStartedText}>
                { `Content: ${this.state.dropId}\n` }
                { `Location: ${JSON.stringify(this.state.location)}` }
            </Text>
                { this.state.dropId != ""
                    ? <Button 
                            title="You have picked up a drop!"
                            onPress={() => this.props.navigator.push(
                                'viewDrop', { dropId: this.state.dropId }
                            )}
                      />
                    : null }
          </View>
       </ScrollView>
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

    const params = {
        userId: myUserId,
        lat: location.coords.latitude,
        lng: location.coords.longitude
    }

    console.log(params)

    getRequest('explore', params)
        .then(res => {
            console.log(res)
            const dropId = res
            this.setState({
                dropId: dropId
            })
        })
        .catch(r => {
            console.log(r.message)
        })

    // getRequest('explore', params)
    //     .then(res => {
    //         console.log(res)
    //         const dropId = res
    //         return getRequest(`drops/${dropId}`)
    //     })
    //     .then(res => {
    //         console.log(res)
    //         this.setState({
    //             // content: `ID:${res.userId} -- title: ${res.title}`
    //             // content: JSON.stringify(res)
    //             content: res.image
    //         })
    //     })
    //     .catch(r => {
    //         console.log(r.message)
    //     })
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
