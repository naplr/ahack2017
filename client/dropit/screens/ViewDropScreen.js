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
import { sharedStyles, myUserId } from '../common/const'

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
            userId: myUserId,
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
                <Text style={{fontSize: 20, color: '#9B9B9B'}} >
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
              <View style={{ flexDirection:'row', justifyContent:'flex-start', marginTop: 5}}>
                <Text style={sharedStyles.fontGrey}>
                    Dropped by: 
                </Text>
                <Text style={sharedStyles.fontMain}>
                    { `${this.state.dropInfo.creator}` }
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

});
