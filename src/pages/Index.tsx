import React, { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { ArticleGrid } from '@/components/ArticleGrid';
import { HeroBentoGrid } from '@/components/HeroBentoGrid';
import { newsService, Article } from '@/services/newsService';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentCategory, setCurrentCategory] = useState('general');
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const { toast } = useToast();

  // Load saved articles from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedArticles');
    if (saved) {
      setSavedArticles(JSON.parse(saved));
    }
  }, []);

  // Fetch articles when category changes
  useEffect(() => {
    fetchArticles(currentCategory);
  }, [currentCategory]);

  const fetchArticles = async (category: string) => {
    setLoading(true);
    try {
      const fetchedArticles = await newsService.getNewsByCategory(category);
      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast({
        title: "Error",
        description: "Failed to fetch articles. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      fetchArticles(currentCategory);
      return;
    }

    setLoading(true);
    try {
      const searchResults = await newsService.searchNews(query);
      setArticles(searchResults);
      toast({
        title: "Search Results",
        description: `Found ${searchResults.length} articles for "${query}"`,
      });
    } catch (error) {
      console.error('Error searching articles:', error);
      toast({
        title: "Search Error",
        description: "Failed to search articles. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
  };

  const handleSaveArticle = (article: Article) => {
    const isAlreadySaved = savedArticles.some(saved => saved.url === article.url);
    
    if (isAlreadySaved) {
      const updatedSaved = savedArticles.filter(saved => saved.url !== article.url);
      setSavedArticles(updatedSaved);
      localStorage.setItem('savedArticles', JSON.stringify(updatedSaved));
      toast({
        title: "Article Removed",
        description: "Article removed from saved list.",
      });
    } else {
      const updatedSaved = [...savedArticles, article];
      setSavedArticles(updatedSaved);
      localStorage.setItem('savedArticles', JSON.stringify(updatedSaved));
      toast({
        title: "Article Saved",
        description: "Article saved for later reading.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        currentCategory={currentCategory}
      />
      
      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
              Stay Informed
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the latest news from around the world with our beautifully designed, 
              dark-themed news aggregator.
            </p>
          </div>

          {/* Hero Bento Grid */}
          <HeroBentoGrid articles={articles} loading={loading} />

          {/* Articles Grid */}
          <div className="animate-slide-up">
            <ArticleGrid
              articles={articles}
              loading={loading}
              onSaveArticle={handleSaveArticle}
              savedArticles={savedArticles}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/20 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="text-gradient font-bold text-lg">NewsHub</div>
            </div>
            <p className="text-muted-foreground text-sm">
              Powered by NewsAPI • Built with React & Tailwind CSS
            </p>
            <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
