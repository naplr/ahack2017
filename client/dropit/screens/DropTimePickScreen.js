import React from 'react'
import { Image, Linking, Platform, ScrollView, StyleSheet, Text, TextInput, View, Button, DatePickerIOS } from 'react-native'

export default class DropTimePickScreen extends React.Component {
    static route = {
        navigationBar: {
            visible: true,
        },
    };
  
    state = {
        fromDate: new Date(),
        toDate: new Date(),
        showFromPicker: false,
        showToPicker: false,
    }

    renderPicker() {
        if (this.state.showFromPicker) {
            return (
                <View>
                    <DatePickerIOS 
                        date={ this.state.fromDate } 
                        onDateChange={ d => this.handleDateChange(d, 'from') } 
                        mode='date' 
                    />
                    <Button 
                        title="Select" 
                        onPress={ () => { 
                            this.setState({
                                showFromPicker: false
                            })
                        }} 
                    />
                </View>
            )
        } else if (this.state.showToPicker) {
            return (
                <View>
                    <DatePickerIOS date={ this.state.toDate } onDateChange={ d => this.handleDateChange(d, 'to') } mode='date' />
                    <Button 
                        title="Select" 
                        onPress={ () => {
                            this.setState({
                                showToPicker: false
                            })
                        }} 
                    />
                </View>
            )
        } else {
            return null
        }
    }

    //                 <TextInput
    //     style={{height: 40, borderColor: 'gray', borderWidth: 1}}
    //     onChangeText={(text) => this.setState({text})}
    //     value={this.state.text}
    //   />

    showPicker(type) {
        if (type === 'from') {
            this.setState({ showFromPicker: true })
        } else if (type === 'to') {
            this.setState({ showToPicker: true })
        }
    }

    handleDateChange(d, type) {
        switch (type) {
            case 'from': this.setState({ fromDate: d })
                break
            case 'to': this.setState({ toDate: d })
                break
        }
    }

    render() {
        const { dropInfo } = this.props.route.params
        Object.assign(dropInfo, { 
            time: {
                from: this.state.fromDate,
                to: this.state.toDate
            }
        })

        return (
            <View style={ styles.container }>
                <ScrollView style={ styles.container } contentContainerStyle={ styles.contentContainer }>
                    <View style={ styles.getStartedContainer }>
                        <Text onPress={ () => this.showPicker('from') }>
                            { `From: ${this.state.fromDate}` }
                        </Text>
                        <Text onPress={ () => this.showPicker('to') }>
                            { `To: ${this.state.toDate}` }
                        </Text>
                        <Button 
                            title="Pick Time" 
                            onPress={ () => {
                                this.props.navigator.push('dropSummary', { dropInfo: dropInfo })
                            }}
                        />
                    </View>
                    { this.renderPicker() }
                </ScrollView>
            </View>
        )
    }

    _maybeRenderDevelopmentModeWarning() {
        if (__DEV__) {
            const learnMoreButton = (
            <Text onPress={ this._handleLearnMorePress } style={ styles.helpLinkText }>
              Learn more
            </Text>
            );

            return (
                <Text style={ styles.developmentModeText }>
                  Development mode is enabled, your app will run slightly slower but you have access to useful development tools.
                  { learnMoreButton }.
                </Text>
                );
        } else {
            return (
                <Text style={ styles.developmentModeText }>
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
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
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
