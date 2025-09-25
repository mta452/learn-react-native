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
import NewsHomeScreen from "../screens/News/NewsHomeScreen";
import NewsSearchScreen from "../screens/News/NewsSearchScreen";
import ArticleDetailScreen from "../screens/News/ArticleDetailScreen";
import { Article } from "../api/newsApi";

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

const NewsStack = createNativeStackNavigator({
  initialRouteName: 'NewsHome',
  screenOptions: {
    headerShown: false
  },
  screens: {
    NewsHome: {
      screen: NewsHomeScreen
    },
    NewsSearch: {
      screen: NewsSearchScreen
    },
    ArticleDetail: {
      screen: ArticleDetailScreen
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
    NewsTab: {
      screen: NewsStack,
      options: {
        title: 'News',
        // tabBarIcon: ({ color, size }) => {
        //   return <Image source={require('../../assets/news.png')} style={{ width: size, height: size, tintColor: color }} />;
        // }
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
export type NewsStackParamList = {
  NewsHome: undefined;
  NewsSearch: undefined;
  ArticleDetail: { article: Article };
};

export const Navigation = createStaticNavigation(RootStack);
