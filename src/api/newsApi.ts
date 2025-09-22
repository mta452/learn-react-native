import axios from 'axios';

const NEWS_API_KEY = '16de4a919c274a4ca5fce63408a79b75';
const BASE_URL = 'https://newsapi.org/v2';

export interface Article {
  id: string;
  source: { id: string; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsApiResponse {
  status: string;
  totalResults?: number;
  articles?: Article[];
  code?: string;
  message?: string;
}

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getTopHeadlines = async (
  country: string = 'us',
  category: string = '',
  pageSize: number = 20,
  page: number = 1
): Promise<NewsApiResponse> => {
  const response = await apiClient.get<NewsApiResponse>('/top-headlines', {
    params: {
      country,
      category: category || undefined,
      pageSize,
      page,
      apiKey: NEWS_API_KEY
    }
  });

  return response.data;
}

export const getEverything = async (
  query: string,
  sortBy: string = 'publishedAt',
  pageSize: number = 20,
  page: number = 1
): Promise<NewsApiResponse> => {
  const response = await apiClient.get<NewsApiResponse>('/everything', {
    params: {
      q: query,
      sortBy,
      pageSize,
      page,
      apiKey: NEWS_API_KEY
    }
  });

  return response.data;
}
