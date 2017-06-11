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
import DropNamePickScreen from '../screens/DropNamePickScreen'
import ExploreHomeScreen from '../screens/ExploreHomeScreen'
import ViewDropScreen from '../screens/ViewDropScreen'
import FoundScreen from '../screens/FoundScreen'
import BagScreen from '../screens/BagScreen'
import KeepDropSuccessScreen from '../screens/KeepDropSuccessScreen'

export default createRouter(() => ({
  home: () => HomeScreen,
  links: () => LinksScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,

  dropContentPick: () => DropContentPickScreen,
  dropNamePick: () => DropNamePickScreen,
  dropLocationPick: () => DropLocationPickScreen,
  dropTimePick: () => DropTimePickScreen,
  dropSummary: () => DropSummaryScreen,
  dropSuccess: () => DropSuccessScreen,
  found: () => FoundScreen,
  bag: () => BagScreen,
  exploreHomeScreen: () => ExploreHomeScreen,
  viewDrop: () => ViewDropScreen,
  keepDropSuccess: () => KeepDropSuccessScreen,
}));
