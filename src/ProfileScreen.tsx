/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaProvider>
      <ScreenContent />
    </SafeAreaProvider>
  );
}

function ScreenContent() {
  const safeAreaInsets = useSafeAreaInsets();

  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Bar */}
      <View style={[styles.topBar, {paddingTop: safeAreaInsets.top}]}>
        <Text style={styles.topBarText}>Profile</Text>
      </View>

      {/* Header View */}
      <View style={styles.headerView}>
        <Image
          style={styles.headerImage}
          source={require('../assets/profile.jpg')}
          // source={{ uri: 'https://reactnative.dev/docs/assets/p_cat2.png' }}
        />
        <Text style={styles.headerTitle}>John Developer</Text>
        <Text style={styles.headerSubtitle}>iOS Developer transitioning to React Native</Text>
      </View>

      {/* Content View */}
      <View style={styles.contentView}>
        {/* Learning Section */}
        <View style={[styles.roundedSection, {flexDirection: 'row', justifyContent: 'space-around', padding: 24}]}>
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.boldText, {marginBottom: 8, color: '#007AFF'}]}>6</Text>
            <Text style={styles.normalText}>Years iOS</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.boldText, {marginBottom: 8, color: '#33C658'}]}>0</Text>
            <Text style={styles.normalText}>RN Projects</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.boldText, {marginBottom: 8, color: '#FF9503'}]}>4</Text>
            <Text style={styles.normalText}>Weeks Left</Text>
          </View>
        </View>

        {/* Progress Section */}
        <View style={[styles.roundedSection, {marginTop: 16, paddingHorizontal: 24, paddingTop: 24, paddingBottom: 12}]}>
          <Text style={styles.boldText}>Learning Progress</Text>

          {/* Progress List */}
          <View style={{marginTop: 12}}>
            <View style={{flexDirection: 'row', alignItems: 'flex-start', marginVertical: 12}}>
              <Image style={{width: 44, height: 44, borderRadius: 22, backgroundColor: '#33C658'}} />
              <View style={{marginLeft: 12}}>
                <Text style={styles.semiBoldText}>Environment Setup</Text>
                <Text style={[styles.normalText, {marginTop: 4}]}>Node.js, CLI, Expo installed</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'flex-start', marginVertical: 12}}>
              <Image style={{width: 44, height: 44, borderRadius: 22, backgroundColor: '#FF9503'}} />
              <View style={{marginLeft: 12}}>
                <Text style={styles.semiBoldText}>JSX & Components</Text>
                <Text style={[styles.normalText, {marginTop: 4}]}>Currently learning core components</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'flex-start', marginVertical: 12}}>
              <Image style={{width: 44, height: 44, borderRadius: 22, backgroundColor: '#E4E4E9'}} />
              <View style={{marginLeft: 12}}>
                <Text style={styles.semiBoldText}>Flexbox Styling</Text>
                <Text style={[styles.normalText, {marginTop: 4}]}>Next: Layout and styling practice</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Buttons Section */}
        <View style={{flexDirection: 'row', marginTop: 16}}>
          <TouchableOpacity
            style={{flex: 1, marginRight: 16}}
            onPress={() => {
              navigation.navigate('Learning' as never);
            }}
          >
            <View style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Start Learning</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => {
              navigation.navigate('Schedule' as never);
            }}
          >
            <View style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>View Schedule</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Skills Section */}
        <View style={{marginTop: 16, paddingBottom: safeAreaInsets.bottom}}>
          <Text style={styles.boldText}>Current Skills</Text>
          
          {/* Skills List */}
          <View style={{flexDirection: 'row', marginVertical: 12}}>
            <View style={styles.skillContainer}>
              <Text style={styles.skillText}>Swift</Text>
            </View>

            <View style={styles.skillContainer}>
              <Text style={styles.skillText}>UIKit</Text>
            </View>

            <View style={styles.skillContainer}>
              <Text style={styles.skillText}>Javascript</Text>
            </View>

            <View style={styles.skillContainer}>
              <Text style={styles.skillText}>React Native (Learning)</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF'
  },
  topBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topBarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 16
  },
  headerView: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
    backgroundColor: 'yellow'
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  headerSubtitle: {
    fontSize: 18,
    fontWeight: 'semibold',
    color: 'white',
    marginTop: 8
  },
  normalText: {
    fontSize: 15,
    color: '#555'
  },
  semiBoldText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'semibold'
  },
  boldText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold'
  },
  contentView: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16
  },
  roundedSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  primaryButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  },
  secondaryButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#007AFF',
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 18
  },
  skillContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#007AFF',
    height: 40,
    padding: 8,
    marginEnd: 8,
    borderRadius: 20
  },
  skillText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold'
  }
});
