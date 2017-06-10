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
  TouchableHighlight,
  ImageEditor,
  ImageStore
} from 'react-native';

import { ImagePicker, Permissions } from 'expo'
import { Constants, Svg } from 'expo';

import { sharedStyles } from '../common/const'

export default class DropContentPickScreen extends React.Component {
    static route = {
        navigationBar: {
        visible: false,
        },
    }

    constructor(props) {
      super(props)
      this.state = {
          image: null,
          data: ""
      }
  }

  render() {
      let { image } = this.state
    return (
      <View style={sharedStyles.container}>
        {/*<View style={{ width:'100%', height: 45, flexDirection:'row', justifyContent:'flex-start', paddingLeft:10, marginTop:10 }}>
          <Button
            color='#C42E34'
            title="< Back"
            onPress={() => this.props.navigator.push(
                'dropLocationPick',
                {
                    dropInfo: {
                        content: 'Yo me'
                    }
                }
            )}
          />
        </View>*/}

        {image &&
            <View style={{flexDirection:'row', justifyContent:'center', marginTop:84, marginBottom:10}}>
              <Text style={sharedStyles.fontMainBig}>
                You've Selected
              </Text>
            </View>
          }

        <View style={{ flex:1, flexDirection:'column', justifyContent:'center',alignItems:'center' }}>
          { !image &&
          <View style={{ flex:1, flexDirection:'column', justifyContent:'center',alignItems:'center' }}>
            <View style={{ height: 85, width: 85, marginTop:15 }}>
              <TouchableHighlight 
                onPress={this._pickImage}
                underlayColor='#F7F7F7'
                >
                {/*<Svg height={85} width={85}>
                  <Svg.Circle
                    cx={42.5}
                    cy={42.5}
                    r={40}
                    strokeWidth={1.5}
                    stroke="#9B9B9B"
                    fill="#white"
                  />
                  <Svg.Rect
                    x={35}
                    y={12.5}
                    width={15}
                    height={60}
                    strokeWidth={0}
                    stroke="rgba (0,0,0,0)"
                    fill="#9B9B9B"
                  />
                  <Svg.Rect
                    x={12.5}
                    y={35}
                    width={60}
                    height={15}
                    strokeWidth={0}
                    stroke="rgba (0,0,0,0)"
                    fill="#9B9B9B"
                  />
                </Svg>*/}
                <Image
                  style={styles.AddImageButton}
                  source={require('./AddImageButton.png')}
                />
              </TouchableHighlight>
            </View>
            <View style={{marginTop: 5 }}>
              <Text style={sharedStyles.fontGrey}>
                Add Image to drop
              </Text>
            </View> 
          </View> }

          {image &&
          <View style={{ flexDirection:'column', justifyContent:'center' }}>
            <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
            <View style={{ width:300, flexDirection:'row', justifyContent:'flex-start', marginLeft:-10 }}>
              {/*<FontAwesome
                name={name}
                size={32}
                color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
              />*/}
              <Button
              color='#4990E2'
              title="Change image"
              onPress={this._pickImage}
              />
            </View>
          </View>
          }
        </View>

        {/*<View>
          <Button
              color='#9B9B9B'
              title="Add Image to drop"
              onPress={this._pickImage}
          />
          {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>*/}

        {/*<View>
          <Text>
              "Content Stuff"
          </Text>
        </View>*/}

        <View style={{marginTop:'auto', marginBottom: 35}}>
          <Button
            color='#C42E34'
            title="Continue >"
            onPress={() => this.props.navigator.push(
                'dropLocationPick',
                {
                    dropInfo: {
                        content: 'Yo me'
                    }
                }
            )}
          />
        </View>
      </View>
    );
  }

  _pickImage = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    throw new Error('Location permission not granted');
  } else {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result)
    const cropData = {
        size: { width: result.width, height: result.height }
    }

    if (!result.cancelled) {
        ImageEditor.cropImage(result.uri, cropData, (imageURI) => {
            ImageStore.getBase64ForTag(imageURI, (base64Data) => {
                // base64Data contains the base64string of the image
                this.setState({ image: result.uri, data: base64Data, res: result })
            }, (reason) => console.error(reason));
        }, (reason) => console.error(reason));
    }
  }
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  AddImageButton: {
    width: 85,
  },
});
