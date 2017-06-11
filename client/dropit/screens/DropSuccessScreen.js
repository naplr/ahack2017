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
import { sharedStyles } from '../common/const'

export default class DropSummaryScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  };

  render() {
    return (
      <View style={sharedStyles.container}>
        <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          <Text style={sharedStyles.fontGreyHuge}>
            Successfully Dropped
          </Text>
        </View>  

        <View style={{marginTop:'auto', marginBottom: 35}}>
          <Button
              color='#C42E34'
              title="Done"
              onPress={() => this.props.navigator.push(
                'dropContentPick',
            )}
          />
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

  _handlePress = () => {
      this.props.navigator.push('contentPick', {name: 'Hello People'})
  }
}

const styles = StyleSheet.create({
});
