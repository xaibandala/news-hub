import axios from 'axios';

// Use environment variable for News API key
// In Vite, environment variables must be prefixed with VITE_
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || 'your-api-key-here';
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  author?: string;
  content?: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

// Mock data for demonstration
const mockArticles: Article[] = [
  {
    title: "Revolutionary AI Breakthrough Changes Everything We Know About Machine Learning",
    description: "Scientists at leading tech companies have discovered a new neural network architecture that promises to revolutionize artificial intelligence applications across industries.",
    url: "https://example.com/ai-breakthrough",
    urlToImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop",
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    source: { id: "tech-news", name: "TechNews" },
    author: "Dr. Sarah Johnson",
  },
  {
    title: "Global Markets Rally as Economic Indicators Show Strong Growth",
    description: "Stock markets worldwide are experiencing significant gains following the release of positive economic data and corporate earnings reports.",
    url: "https://example.com/markets-rally",
    urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&h=300&fit=crop",
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    source: { id: "business-news", name: "Business Today" },
    author: "Michael Chen",
  },
  {
    title: "Climate Change Summit Reaches Historic Agreement on Carbon Reduction",
    description: "World leaders unite on ambitious climate goals, setting unprecedented targets for carbon neutrality and sustainable energy transition.",
    url: "https://example.com/climate-summit",
    urlToImage: "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?w=500&h=300&fit=crop",
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    source: { id: "environmental-news", name: "Green Planet" },
    author: "Emma Rodriguez",
  },
  {
    title: "Major Tech Company Announces Groundbreaking Quantum Computing Chip",
    description: "The new quantum processor promises to solve complex problems thousands of times faster than traditional computers, opening new possibilities for scientific research.",
    url: "https://example.com/quantum-chip",
    urlToImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    source: { id: "tech-news", name: "TechNews" },
    author: "Alex Kim",
  },
  {
    title: "Healthcare Innovation: New Treatment Shows Promise for Rare Diseases",
    description: "Clinical trials reveal significant improvements in patient outcomes using cutting-edge gene therapy techniques developed by international research teams.",
    url: "https://example.com/healthcare-innovation",
    urlToImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&h=300&fit=crop",
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
    source: { id: "health-news", name: "Medical Journal" },
    author: "Dr. Jennifer Park",
  },
  {
    title: "Space Exploration Milestone: New Mars Mission Reveals Stunning Discoveries",
    description: "The latest Mars rover has uncovered evidence of ancient water systems and potential signs of past microbial life, revolutionizing our understanding of the Red Planet.",
    url: "https://example.com/mars-discovery",
    urlToImage: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=500&h=300&fit=crop",
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    source: { id: "space-news", name: "Space Explorer" },
    author: "Dr. Robert Martinez",
  },
];

class NewsService {
  private async fetchFromAPI(endpoint: string, params: Record<string, string>): Promise<NewsResponse> {
    // Check if API key is set
    if (!NEWS_API_KEY || NEWS_API_KEY === 'your-api-key-here') {
      console.warn('News API key not configured. Please add your API key to the .env file.');
      return this.getMockData(params.category, params.q);
    }

    try {
      const response = await axios.get(`${NEWS_API_BASE_URL}${endpoint}`, {
        params: {
          ...params,
          apiKey: NEWS_API_KEY,
        },
      });
      
      // Check if the response indicates an API key error
      if (response.data.status === 'error' && response.data.code === 'apiKeyInvalid') {
        console.error('Invalid News API key. Please check your API key in the .env file.');
        return this.getMockData(params.category, params.q);
      }
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('News API error:', error.response?.data || error.message);
      } else {
        console.error('Unexpected error fetching news:', error);
      }
      
      console.warn('Falling back to mock data');
      return this.getMockData(params.category, params.q);
    }
  }

  private getMockData(category?: string, query?: string): NewsResponse {
    let filteredArticles = [...mockArticles];

    // Filter by category (simplified logic)
    if (category && category !== 'general') {
      filteredArticles = mockArticles.filter(article =>
        article.source.name.toLowerCase().includes(category) ||
        article.title.toLowerCase().includes(category) ||
        article.description.toLowerCase().includes(category)
      );
    }

    // Filter by search query
    if (query) {
      const searchTerm = query.toLowerCase();
      filteredArticles = filteredArticles.filter(article =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.description.toLowerCase().includes(searchTerm)
      );
    }

    return {
      status: 'ok',
      totalResults: filteredArticles.length,
      articles: filteredArticles,
    };
  }

  async getTopHeadlines(category: string = 'general', country: string = 'us'): Promise<Article[]> {
    const params: Record<string, string> = { country };
    if (category !== 'general') {
      params.category = category;
    }

    const response = await this.fetchFromAPI('/top-headlines', params);
    return response.articles;
  }

  async searchNews(query: string): Promise<Article[]> {
    const response = await this.fetchFromAPI('/everything', {
      q: query,
      sortBy: 'publishedAt',
      pageSize: '20',
    });
    return response.articles;
  }

  async getNewsByCategory(category: string): Promise<Article[]> {
    if (category === 'general') {
      return this.getTopHeadlines();
    }
    return this.getTopHeadlines(category);
  }
}

export const newsService = new NewsService();