import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Notifications } from 'expo';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@expo/ex-navigation';
import { FontAwesome } from '@expo/vector-icons';

// import BackgroundGeolocation from "react-native-background-geolocation"
// import BackgroundTimer from 'react-native-background-timer'

import { myUserId } from '../common/const'

import TimerMixin from 'react-timer-mixin'
import { MapView, Constants, Location, Permissions } from 'expo'

import { getRequest, postRequest } from '../common/helper'

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import registerForPushNotificationsAsync
  from '../api/registerForPushNotificationsAsync';

export default class RootNavigation extends React.Component {
    componentDidMount() {
        // this._notificationSubscription = this._registerForPushNotifications();

        TimerMixin.setInterval(this._getLocationAsync, 5000)
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
                if (res != "" && res != null) {
                    this.props.navigator.showLocalAlert(
                        `You have received a drop`,
                        Alerts.notice
                    )
                    setTimeout(() => {
                        this.props.navigator.push(
                            'viewDrop', { dropId: dropId }
                    )} , 10000);
                }
            })
            .catch(r => {
                console.log(r.message)
        })
    }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();

    // console.log(BackgroundGeolocation)
    // BackgroundGeolocation.on('location', this.handleBgLocation)
  }

        //           onPress={ (tabItemOnPress, event) => {
        //       tabItemOnPress()
        //       this.props.navigation.performAction(({tabs, stacks}) => {
        //           stacks('home').popToTop('home')
        //       })
        //   }}

  render() {
    return (
      <TabNavigation tabBarHeight={56} initialTab="dropper" navigatorUID="main">
        <TabNavigationItem
          id="dropper"
          renderIcon={isSelected => this._renderIcon('tint', isSelected)}
        >
          <StackNavigation initialRoute="dropContentPick" />
        </TabNavigationItem>

        <TabNavigationItem
          id="explorer"
          renderIcon={isSelected => this._renderIcon('book', isSelected)}>
          <StackNavigation initialRoute="exploreHomeScreen" />
        </TabNavigationItem>

        <TabNavigationItem
          id="bag"
          renderIcon={isSelected => this._renderIcon('shopping-bag', isSelected)}>
          <StackNavigation initialRoute="bag" />
        </TabNavigationItem>

        <TabNavigationItem
          id="settings"
          renderIcon={isSelected => this._renderIcon('cog', isSelected)}> 
          <StackNavigation initialRoute="settings" />
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  _renderIcon(name, isSelected) {
    return (
      <FontAwesome
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({ origin, data }) => {
    this.props.navigator.showLocalAlert(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`,
      Alerts.notice
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectedTab: {
    color: Colors.tabIconSelected,
  },
});
