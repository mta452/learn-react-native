import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Article } from '../api/newsApi';

interface NewsCardProps {
  article: Article;
  onPress: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, onPress }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Date not available';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.fullContent}>
        {article.urlToImage && (
          <Image
            source={{ uri: article.urlToImage }}
            style={styles.image}
            resizeMode='cover'
          />
        )}

        <Text
          style={styles.title}
          numberOfLines={0}
          ellipsizeMode='tail'
        >
          {article.title}
        </Text>
        
        {article.description && (
          <Text style={styles.description} numberOfLines={4}>
            {article.description}
          </Text>
        )}

        <View style={styles.metaInfo}>
          <Text style={styles.source}>{article.source?.name || 'Unknown Source'}</Text>
          <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fullContent: {
    padding: 16,
    gap: 8
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  source: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  description: {
    fontSize: 14,
    color: '#666'
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10
  },
});

export default NewsCard;
