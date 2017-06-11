import React from 'react'
import { Image, Linking, Platform, ScrollView, StyleSheet, Text, TextInput, View, Button, DatePickerIOS } from 'react-native'
import moment from 'moment'
import { sharedStyles } from '../common/const'

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
                        date={this.state.fromDate}
                        onDateChange={ d => this.handleDateChange(d, 'from') } 
                        mode='date' 
                    />
                    <Button 
                        color="#9B9B9B"
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
                    <DatePickerIOS 
                        date={this.state.toDate}
                        onDateChange={ d => this.handleDateChange(d, 'to') } 
                        mode='date' 
                    />
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
            <View style={sharedStyles.container}>
                <View style={sharedStyles.title}>
                    <Text style={sharedStyles.fontMainBig}>
                        Select Time
                    </Text>
                </View>

                <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignItems:'center' }}>
                    <View style={{
                        height:60,
                        width: 335, 
                        flexDirection:'row', 
                        justifyContent:'space-between',
                        alignItems:'center', borderBottomWidth:1, 
                        borderColor:'#9B9B9B'}}
                    >
                        <Text style={sharedStyles.fontGreyBig}>
                            From:
                        </Text>
                        <Text 
                        style={sharedStyles.fontGreyBig}
                        onPress={ () => this.showPicker('from') }>
                            { `${moment(this.state.fromDate).format('ddd MMMM DD YYYY')}` }
                        </Text>
                    </View>

                    <View style={{
                        height:60,
                        width: 335, 
                        flexDirection:'row', 
                        justifyContent:'space-between',
                        alignItems:'center', borderBottomWidth:1, 
                        borderColor:'#9B9B9B'}}
                    >
                        <Text style={sharedStyles.fontGreyBig}>
                            To:
                        </Text>
                        <Text
                        style={sharedStyles.fontGreyBig} 
                        onPress={ () => this.showPicker('to') }>
                            { `${moment(this.state.toDate).format('ddd MMMM DD YYYY')}` }
                        </Text>
                    </View>
                </View>

                <View style={{width:'100%'}}>
                    { this.renderPicker() }
                </View>    
                
                <View style={{marginTop:'auto', marginBottom: 35}}>
                    <Button
                        color='#C42E34'
                        title="Continue >"
                        onPress={ () => {
                            this.props.navigator.push('dropSummary', { dropInfo: dropInfo })
                        }}
                    />
                </View>
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

});
