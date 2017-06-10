import { createRouter } from '@expo/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';
import DropContentPickScreen from '../screens/DropContentPickScreen'
import DropLocationPickScreen from '../screens/DropLocationPickScreen'
import DropTimePickScreen from '../screens/DropTimePickScreen'
import DropSummaryScreen from '../screens/DropSummaryScreen'
import DropSuccessScreen from '../screens/DropSuccessScreen'
import ExploreHomeScreen from '../screens/ExploreHomeScreen'

export default createRouter(() => ({
  home: () => HomeScreen,
  links: () => LinksScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,

  dropContentPick: () => DropContentPickScreen,
  dropLocationPick: () => DropLocationPickScreen,
  dropTimePick: () => DropTimePickScreen,
  dropSummary: () => DropSummaryScreen,
  dropSuccess: () => DropSuccessScreen,
  exploreHomeScreen: () => ExploreHomeScreen,
}));
