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
import { getRequest, postRequest } from '../common/helper'

export default class ViewDropScreen extends React.Component {
    static route = {
        navigationBar: {
        visible: false,
        },
    };

    constructor(props) {
        super(props)
        this.state = {
            dropInfo: {
                id: "ef075cd2-90c9-4e3c-b395-b5c510971d56",
                name: "Corgi Dog",
                creator: "John Marshall",
                image: "https://facebook.github.io/react/img/logo_og.png"
            },
        }
    }

    componentWillMount() {
        const { dropId } = this.props.route.params
        getRequest(`drops/${dropId}`)
            .then(res => {
                this.setState({
                    id: res.id,
                    name: res.name,
                    creator: res.creator,
                    image: res.image,
                })
            })
            .catch(r => {
                console.log(r.message)
            })
    }

    keepDrop() {
        postRequest('collected-drop', {
            userId: 'u2',
            dropId: this.state.dropInfo.id
        })
            .then(res => {
                if (res.success) {
                    this.props.navigator.push(
                        'keepDropSuccess', {
                            name: this.state.name
                    })
                }
            })
    }

    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.getStartedText}>
                "You have picked up"
            </Text>
            <Text style={styles.getStartedText}>
                { this.state.dropInfo.name }
            </Text>

            <Text style={styles.getStartedText}>
                { `Content: ${this.state.dropId}\n` }
                { `Location: ${JSON.stringify(this.state.location)}` }
            </Text>
                { this.state.content != ""
                    ? <Image source={{ uri: this.state.dropInfo.image }} style={{ width: 200, height: 200 }} />
                    : null }
            <Text style={styles.getStartedText}>
                { `drop by: ${this.state.dropInfo.creator}` }
            </Text>
            <Button 
                title="Discard"
                onPress={() => this.props.navigator.push(
                    'exploreHomeScreen'
                )}
            />
            <Button 
                title="Keep"
                onPress={ this.keepDrop }
            />
        </View>
        );
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
