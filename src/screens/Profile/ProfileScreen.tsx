/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ProfileStackParamList } from '../../navigation/Navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppSelector } from '../../redux/Store';
import { launchImageLibrary } from 'react-native-image-picker';
import { useState } from 'react';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  'Profile'
>;

export const ProfileScreen: React.FC = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const counter = useAppSelector((state) => state.counter.value);
  const firstName = useAppSelector((state) => state.user.firstName);
  const lastName = useAppSelector((state) => state.user.lastName);
  const description = useAppSelector((state) => state.user.description);
  const yearsOfExperience = useAppSelector((state) => state.user.yearsOfExperience);

  const [imageUri, setImageUri] = useState<string | undefined>();

  const handlePhoto = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1
    });

    if ((result.assets?.length || 0) > 0) {
      setImageUri(result.assets?.at(0)?.uri);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Top Bar */}
      <View style={[styles.topBar, {paddingTop: safeAreaInsets.top}]}>
        <Text style={styles.topBarText}> </Text>
        <Text style={styles.topBarText}>Profile</Text>
        <Text style={styles.topBarText}>{counter}</Text>
      </View>

      {/* Header View */}
      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={handlePhoto}
        >
          <Image
            style={styles.headerImage}
            source={
              imageUri
              ? { uri: imageUri }
              : require('../../../assets/profile.jpg')
            }
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{firstName} {lastName}</Text>
        <Text style={styles.headerSubtitle}>{description}</Text>
      </View>

      {/* Content View */}
      <View style={styles.contentView}>
        {/* Learning Section */}
        <View style={[styles.roundedSection, styles.learningSection]}>
          <View style={styles.learningItem}>
            <Text style={[styles.boldText, styles.blueText]}>{yearsOfExperience.toString()}</Text>
            <Text style={styles.normalText}>Years iOS</Text>
          </View>
          <View style={styles.learningItem}>
            <Text style={[styles.boldText, styles.greenText]}>0</Text>
            <Text style={styles.normalText}>RN Projects</Text>
          </View>
          <View style={styles.learningItem}>
            <Text style={[styles.boldText, styles.orangeText]}>4</Text>
            <Text style={styles.normalText}>Weeks Left</Text>
          </View>
        </View>

        {/* Progress Section */}
        <View style={[styles.roundedSection, styles.progressSection]}>
          <Text style={styles.boldText}>Learning Progress</Text>

          {/* Progress List */}
          <View>
            <View style={styles.progressItem}>
              <Image style={[styles.progressImage, styles.envSetupImage]} />
              <View style={styles.progressItemTextContainer}>
                <Text style={styles.semiBoldText}>Environment Setup</Text>
                <Text style={styles.normalText}>Node.js, CLI, Expo installed</Text>
              </View>
            </View>

            <View style={styles.progressItem}>
              <Image style={[styles.progressImage, styles.jsxImage]} />
              <View style={styles.progressItemTextContainer}>
                <Text style={styles.semiBoldText}>JSX & Components</Text>
                <Text style={styles.normalText}>Currently learning core components</Text>
              </View>
            </View>

            <View style={styles.progressItem}>
              <Image style={[styles.progressImage, styles.flexboxImage]} />
              <View style={styles.progressItemTextContainer}>
                <Text style={styles.semiBoldText}>Flexbox Styling</Text>
                <Text style={styles.normalText}>Next: Layout and styling practice</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonsSection}>
          <TouchableOpacity
            style={styles.fullSize}
            onPress={() => {
              navigation.navigate('Learning');
            }}
          >
            <View style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Start Learning</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.fullSize}
            onPress={() => {
              navigation.navigate('Schedule');
            }}
          >
            <View style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>View Schedule</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Skills Section */}
        <View style={{paddingBottom: safeAreaInsets.bottom}}>
          <Text style={styles.boldText}>Current Skills</Text>
          
          {/* Skills List */}
          <View style={styles.skillList}>
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
  fullSize: {
    flex: 1
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
  blueText: {
    color: '#007AFF'
  },
  greenText: {
    color: '#33C658'
  },
  orangeText: {
    color: '#FF9503'
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingHorizontal: 16,
    width: '100%'
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
  contentView: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    gap: 16
  },
  roundedSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  learningSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 24,
    gap: 8
  },
  learningItem: {
    alignItems: 'center'
  },
  progressSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 12,
    gap: 12
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 12,
    gap: 12
  },
  progressImage: {
    width: 44,
    height: 44,
    borderRadius: 22
  },
  envSetupImage: {
    backgroundColor: '#33C658'
  },
  jsxImage: {
    backgroundColor: '#FF9503'
  },
  flexboxImage: {
    backgroundColor: '#E4E4E9'
  },
  progressItemTextContainer: {
    gap: 4
  },
  buttonsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16
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
  skillList: {
    flexDirection: 'row',
    marginVertical: 12
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
