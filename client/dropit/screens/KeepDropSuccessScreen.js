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

import { sharedStyles } from '../common/const'

export default class KeepDropSuccessScreen extends React.Component {
    static route = {
        navigationBar: {
            visible: false,
        },
    };

  render() {
        const { name } = this.props.route.params
    return (
      <View style={sharedStyles.container}>
        <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          <View>
            <Text style={sharedStyles.fontGreyBig}>
              Successfully Keep
            </Text>
          </View>
          <View>
            <Text style={sharedStyles.fontMainHuge}>
              { name }
            </Text>
          </View>
        </View>  

        <View style={{marginTop:'auto', marginBottom: 35}}>
          <Button
              color='#C42E34'
              title="Done"
              onPress={() => this.props.navigator.push(
                  'bag'
              )}
          />
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

});
