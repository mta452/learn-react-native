import axios, { AxiosInstance } from 'axios';

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

class NewsApi {
  private apiClient: AxiosInstance
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.apiClient = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public async fetchTopHeadlines(
    country: string = 'us',
    category: string = '',
    pageSize: number = 20,
    page: number = 1
  ): Promise<NewsApiResponse> {
    const response = await this.apiClient.get<NewsApiResponse>('/top-headlines', {
      params: {
        country,
        category: category || undefined,
        pageSize,
        page,
        apiKey: this.apiKey
      }
    });

    return response.data;
  }

  public async fetchEverything(
    query: string,
    sortBy: string = 'publishedAt',
    pageSize: number = 20,
    page: number = 1
  ): Promise<NewsApiResponse> {
    const response = await this.apiClient.get<NewsApiResponse>('/everything', {
      params: {
        q: query,
        sortBy,
        pageSize,
        page,
        apiKey: this.apiKey
      }
    });

    return response.data;
  }
}

export const newsApi = new NewsApi(NEWS_API_KEY);

export default newsApi;
