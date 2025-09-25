import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Linking,
  Alert
} from 'react-native';
import { NewsStackParamList } from '../../navigation/Navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import FastImage from '@d11/react-native-fast-image';
import PrimaryButton from '../../components/PrimaryButton';

type NavigationProp = NativeStackNavigationProp<NewsStackParamList, 'ArticleDetail'>;

type DetailScreenProps = {
  route: RouteProp<NewsStackParamList, 'ArticleDetail'>;
};

const ArticleDetailScreen: React.FC<DetailScreenProps> = ({ route }) => {
  const { article } = route.params;
  const navigation = useNavigation<NavigationProp>();
  const safeAreaInsets = useSafeAreaInsets();
  
  const handleOpenFullArticle = () => {
    if (article.url) {
      Linking.openURL(article.url).catch(_ => {
        Alert.alert('Error', 'Failed to open article');
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingTop: safeAreaInsets.top}}
    >
      {article.urlToImage && (
        <FastImage
          source={{ uri: article.urlToImage }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      
      <View style={styles.content}>
        <Text style={styles.title}>{article.title}</Text>
        
        <View style={styles.metaInfo}>
          <Text style={styles.source}>{article.source?.name}</Text>
          <Text style={styles.date}>
            {article.publishedAt ? formatDate(article.publishedAt) : 'Date not available'}
          </Text>
        </View>
        
        {article.author && (
          <Text style={styles.author}>By {article.author}</Text>
        )}
        
        {article.description && (
          <Text style={styles.description}>{article.description}</Text>
        )}
        
        {article.content && (
          <Text style={styles.articleContent}>{article.content}</Text>
        )}
        
        <PrimaryButton
          style={styles.readFullButton}
          title={'Read Full Article'}
          titleStyle={styles.buttonText}
          onPress={handleOpenFullArticle}
        />

        <PrimaryButton
          style={styles.goBackButton}
          title={'Go Back'}
          titleStyle={styles.buttonText}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    lineHeight: 32,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  source: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 16,
  },
  articleContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginBottom: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  readFullButton: {
    backgroundColor: '#007AFF',
    width: '100%',
  },
  goBackButton: {
    backgroundColor: '#ff3333',
    width: '100%',
    marginTop: 8
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  }
});

export default ArticleDetailScreen;
