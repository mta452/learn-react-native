/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStaticNavigation, StaticParamList } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image } from "react-native";
import CounterScreen from "../screens/Counter";
import LearningScreen from "../screens/Learning";
import LoginScreen from "../screens/Login";
import ProfileScreen from "../screens/Profile";
import ScheduleScreen from "../screens/Schedule";
import SettingsScreen from "../screens/Settings";

const ProfileStack = createNativeStackNavigator({
  initialRouteName: 'Profile',
  screenOptions: {
    headerShown: false
  },
  screens: {
    Profile: {
      screen: ProfileScreen
    },
    Learning: {
      screen: LearningScreen
    },
    Schedule: {
      screen: ScheduleScreen
    }
  }
});

const RootTabs = createBottomTabNavigator({
  initialRouteName: 'HomeTab',
  detachInactiveScreens: false,
  screenOptions: {
    headerShown: false
  },
  screens: {
    HomeTab: {
      screen: CounterScreen,
      options: {
        title: 'Home',
        tabBarIcon: ({ color, size }) => {
          return <Image source={require('../../assets/home.png')} style={{ width: size, height: size, tintColor: color }} />;
        }
      }
    },
    ProfileTab: {
      screen: ProfileStack,
      options: {
        title: 'Profile',
        tabBarIcon: ({ color, size }) => {
          return <Image source={require('../../assets/user.png')} style={{ width: size, height: size, tintColor: color }} />;
        }
      }
    },
    SettingsTab: {
      screen: SettingsScreen,
      options: {
        title: 'Settings',
        tabBarIcon: ({ color, size }) => {
          return <Image source={require('../../assets/settings.png')} style={{ width: size, height: size, tintColor: color }} />;
        }
      }
    }
  }
});

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Login',
  screenOptions: {
    headerShown: false
  },
  screens: {
    Login: {
      screen: LoginScreen
    },
    Main: {
      screen: RootTabs
    }
  }
});

export type RootStackParamList = StaticParamList<typeof RootStack>;
export type RootTabsParamList = StaticParamList<typeof RootTabs>;
export type ProfileStackParamList = StaticParamList<typeof ProfileStack>;

export const Navigation = createStaticNavigation(RootStack);
