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
  TextInput,
} from 'react-native';

import { ImagePicker, Permissions } from 'expo'
import { Constants, Svg } from 'expo';

import { sharedStyles } from '../common/const'

export default class DropNamePickScreen extends React.Component {
    static route = {
            navigationBar: {
            visible: false,
        },
    }

    state = {
        name: "",
        amount: ''
    }

    handleNameChange = inputValue => {
        this.setState({ name: inputValue });
    };

    handleAmountChange = inputValue => {
        this.setState({ amount: inputValue });
    };

    render() {
        const { dropInfo } = this.props.route.params
        Object.assign(dropInfo, { 
            name: this.state.name,
            amount: this.state.amount
        })

        return (
            <View style={sharedStyles.container}>
              <View style={{flexDirection:'row', justifyContent:'center', marginTop:84, marginBottom:10}}>
                  <Text style={sharedStyles.fontMainBig}>
                      Name/Amount
                  </Text>
              </View>
              <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
                <View style={{
                    width: 335, 
                    flexDirection:'row', 
                    justifyContent:'center',
                    alignItems:'center', borderBottomWidth:1, 
                    borderColor:'#9B9B9B'}}
                >
                  <TextInput
                      value={this.state.name}
                      placeholder='Name'
                      onChangeText={this.handleNameChange}
                      style={{ width: 335, height: 60, padding: 8 ,fontSize: 16}}
                      color='#9B9B9B'
                  />
                </View>
                <View style={{
                    
                    width: 335, 
                    flexDirection:'row', 
                    justifyContent:'center',
                    alignItems:'center', borderBottomWidth:1, 
                    borderColor:'#9B9B9B'}}
                >
                  <TextInput
                      value={this.state.amount}
                      placeholder='amount'
                      onChangeText={this.handleAmountChange}
                      keyboardType='numeric'
                      style={{ width: 200, height: 60, padding: 8,fontSize: 16  }}
                      color='#9B9B9B'
                  />
                </View>
              </View>
              <View style={{marginTop:'auto', marginBottom: 35}}>
                  <Button
                      color='#C42E34'
                      title="Continue >"
                      onPress={() => this.props.navigator.push('dropLocationPick', { dropInfo: dropInfo }) }
                  />
              </View>
            </View> 
        )
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
    backgroundColor: '#F3F3F3',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  AddImageButton: {
    width: 85,
  },
});
