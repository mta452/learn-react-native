import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { clearSearchResults, setSearchQuery } from '../../redux/NewsSlice';
import { useAppDispatch, useAppSelector } from '../../redux/Store';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NewsStackParamList } from '../../navigation/Navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import NewsCard from '../../components/NewsCard';
import { searchNews } from '../../redux/actions/newsActions';
import PrimaryButton from '../../components/PrimaryButton';

type SearchProps = NativeStackNavigationProp<
  NewsStackParamList,
  'NewsSearch'
>;

const NewsSearchScreen = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const navigation = useNavigation<SearchProps>();
  const dispatch = useAppDispatch();
  const { searchArticles, searchLoading, searchError, searchQuery } = useAppSelector(state => state.news);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSearch = () => {
    if (localSearchQuery.trim()) {
      dispatch(setSearchQuery(localSearchQuery));
      dispatch(searchNews({ 
        query: localSearchQuery,
        pageSize: 20 
      }));
    }
  };

  const handleClearSearch = () => {
    setLocalSearchQuery('');
    dispatch(clearSearchResults());
  };

  if (searchError) {
    Alert.alert('Search Error', searchError);
  }

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      <View style={styles.searchContainer}>
        { !searchQuery && (
          <PrimaryButton
            style={styles.backButton}
            title={'Back'}
            disabled={searchLoading}
            onPress={handleBack}
          />
        )}
        <TextInput
          style={styles.searchInput}
          placeholder="Search for news..."
          value={localSearchQuery}
          onChangeText={setLocalSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <PrimaryButton
          onPress={handleSearch}
          disabled={searchLoading}
          content={
            searchLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>Search</Text>
            )
          }
        />
        {searchQuery && (
          <PrimaryButton
            backgroundColor={'#ff3333'}
            title={'Clear'}
            onPress={handleClearSearch}
          />
        )}
      </View>

      {searchQuery && (
        <Text style={styles.searchInfo}>
          {searchArticles.length} results for "{searchQuery}"
        </Text>
      )}

      {searchLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      ) : (
        <FlatList
          data={searchArticles}
          renderItem={({ item }) => (
            <NewsCard
              article={item}
              onPress={() => {
                navigation.navigate('ArticleDetail', { article: item });
              }}
            />
          )}
          keyExtractor={(item, index) => item.url + index}
          contentContainerStyle={styles.resultsList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            searchQuery ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No results found</Text>
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Enter a search term to find news</Text>
              </View>
            )
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
    gap: 8
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
  },
  backButton: {
    backgroundColor: '#ff3333',
    minWidth: 80
  },
  searchButton: {
    minWidth: 80
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  searchInfo: {
    padding: 16,
    fontSize: 14,
    color: '#666',
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  resultsList: {
    padding: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default NewsSearchScreen;
