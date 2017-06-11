import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Button,
} from 'react-native';

import { MapView, Constants, Location, Permissions } from 'expo';
import { getRequest, postRequest } from '../common/helper'
import { sharedStyles } from '../common/const'

export default class ViewDropScreen extends React.Component {
    static route = {
        navigationBar: {
        visible: false,
        },
    };

    constructor(props) {
        super(props)
        this.state = {
            status: "Loading...",
            dropInfo: {
                id: "",
                name: "",
                creator: "",
                image: ""
            },
        }

        this.keepDrop = this.keepDrop.bind(this)
    }

    componentWillMount() {
        const { dropId } = this.props.route.params
        this.setState({
            status: "Waiting " + dropId
        })

        getRequest(`drops/${dropId}`)
            .then(res => {
                this.setState({
                    // status: "Received " + dropId
                    status: JSON.stringify(res)
                })

                const dif = {
                    id: res.id,
                    name: res.name,
                    creator: res.creator,
                    image: res.image,
                    ok: 'kjkj'
                }

                this.setState({
                    dropInfo: dif,
                    status: dif
                })
            })
            .catch(r => {
                console.log(r.message)
                this.setState({status: ';lkadfsjl;kjflkjafslkafd;kl'})
            })
    }

    keepDrop() {
        this.setState({
            status: JSON.stringify(this.state.dropInfo)
        }) 

        postRequest('collected-drop', {
            userId: 'u2',
            dropId: this.state.dropInfo.id
        })
            .then(res => {
                if (res.success) {
                    this.props.navigator.push(
                        'keepDropSuccess', {
                            name: this.state.dropInfo.name
                    })
                }
            })
    }

    render() {
        /*if (this.state.dropInfo == null) {
            return (
                <View style={styles.container}>
                    <Text>
                        { this.state.status }
                    </Text>
                </View>
            )
        }*/

        return (
          <View style={sharedStyles.container}>
            <View >
              <View style={{ flexDirection:'column', justifyContent:'center',alignItems:'center', marginTop:64, marginBottom:10}} >
                <Text style={{fontSize: 22, color: '#9B9B9B'}} >
                    You have picked up
                </Text>
                <Text style={sharedStyles.fontMainBig}>
                  { this.state.dropInfo.name }
                </Text>
              </View>
            </View>

            <View>
              <View>
                { this.state.dropInfo.image != "" && this.state.dropInfo.image != null
                    ? <Image source={{ uri: this.state.dropInfo.image }} style={{ width: 300, height: 300 }} />
                    : null }
              </View>
              <View>
                <Text style={styles.getStartedText}>
                    { `drop by: ${this.state.dropInfo.creator}` }
                </Text>
              </View>
            </View>

            <View style={{flex:1, flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
              <View style={{flex: 1, flexDirection:'column', justifyContent:'flex-start', alignItems:'center'}}>
                <TouchableHighlight 
                underlayColor='#F7F7F7'
                onPress={() => this.props.navigator.push(
                          'exploreHomeScreen'
                      )}
                >
                  <Image
                    style={styles.AddImageButton}
                    source={require('./trashbutton.png')}
                  />
                </TouchableHighlight> 
                <View style={{marginTop: 5 }}>
                  <Text style={sharedStyles.fontGrey}>
                    discard
                  </Text>
                </View>
              </View> 
              <View style={{ flex:1, flexDirection:'column', justifyContent:'flex-start', alignItems:'center'}}> 
                <TouchableHighlight 
                onPress={ this.keepDrop }
                underlayColor='#F7F7F7'
                >
                  <Image
                    style={styles.AddImageButton}
                    source={require('./downloadbutton.png')}
                  />
                </TouchableHighlight>

                <View style={{marginTop: 5 }}>
                  <Text style={sharedStyles.fontGrey}>
                    keep
                  </Text>
                </View>
              </View> 
            </View> 
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
