/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { LoginScreen } from './src/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import { CounterScreen } from './src/CounterScreen';
import { ProfileScreen } from './src/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LearningScreen } from './src/LearningScreen';
import { ScheduleScreen } from './src/ScheduleScreen';
import { SettingsScreen } from './src/SettingsScreen';
import { Image } from 'react-native';

const RootTabs = createBottomTabNavigator({
  initialRouteName: 'Home',
  screenOptions: {
    headerShown: false
  },
  screens: {
    Home: {
      screen: CounterScreen,
      options: {
        title: 'Home',
        tabBarIcon: ({ color, size }) => {
          return <Image source={require('./assets/home.png')} style={{ width: size, height: size, tintColor: color }} />;
        }
      }
    },
    Profile: {
      screen: ProfileScreen,
      options: {
        title: 'Profile',
        tabBarIcon: ({ color, size }) => {
          return <Image source={require('./assets/user.png')} style={{ width: size, height: size, tintColor: color }} />;
        }
      }
    },
    Settings: {
      screen: SettingsScreen,
      options: {
        title: 'Settings',
        tabBarIcon: ({ color, size }) => {
          return <Image source={require('./assets/settings.png')} style={{ width: size, height: size, tintColor: color }} />;
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
    },
    Learning: {
      screen: LearningScreen
    },
    Schedule: {
      screen: ScheduleScreen
    }
  }
});

const Navigation = createStaticNavigation(RootStack);

function App() {
  return (
    <Navigation />
  );
}

export default App;
