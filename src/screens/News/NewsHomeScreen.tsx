import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/Store';
import { resetCurrentPage, setSearchQuery, setSelectedCategory } from '../../redux/NewsSlice';
import { fetchTopHeadlines, NEWS_CATEGORIES } from '../../redux/actions/newsActions';
import NewsCard from '../../components/NewsCard';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NewsStackParamList } from '../../navigation/Navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import PrimaryButton from '../../components/PrimaryButton';

type HomeNavigationProp = NativeStackNavigationProp<
  NewsStackParamList,
  'NewsHome'
>;

const NewsHomeScreen = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const navigation = useNavigation<HomeNavigationProp>();
  const dispatch = useAppDispatch();
  const { currentPage, articles, loading, error, selectedCategory } = useAppSelector(state => state.news);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    loadNews();
  }, [selectedCategory]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  const loadNews = async (page: number = 1) => {
    await dispatch(fetchTopHeadlines({ 
      category: selectedCategory,
      country: 'us',
      pageSize: 12,
      page: page
    }));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(resetCurrentPage());
    await loadNews();
    setRefreshing(false);
  };

  const handleLoadMore = async () => {
    if (!refreshing && !loadingMore && articles.length !== 0) {
      setLoadingMore(true);
      await loadNews(currentPage);
      setLoadingMore(false);
    }
  }

  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading news...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>News Headlines</Text>
        <PrimaryButton
          title={'Search'}
          onPress={() => {
            navigation.navigate('NewsSearch')
          }}
        />
      </View>
      
      <FlatList
        data={NEWS_CATEGORIES}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === item.value ? styles.selectedCategoryButton : {},
            ]}
            onPress={() => {
              dispatch(setSelectedCategory(item.value));
            }}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === item.value ? styles.selectedCategoryText : {}
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.value}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
        contentContainerStyle={styles.categoryListContent}
      />

      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <NewsCard
            article={item}
            onPress={() => {
              navigation.navigate('ArticleDetail', { article: item });
            }}
          />
        )}
        keyExtractor={(item, index) => item.url + index}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
          />
        }
        contentContainerStyle={styles.newsList}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.3}
        onEndReached={handleLoadMore}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryList: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    minHeight: 64,
    maxHeight: 64
  },
  categoryListContent: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  categoryButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    justifyContent: 'center'
  },
  selectedCategoryButton: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    color: '#666',
    fontWeight: '600',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  newsList: {
    padding: 16
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
});

export default NewsHomeScreen;
