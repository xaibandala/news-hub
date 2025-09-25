import React from 'react';
import { ArticleCard } from './ArticleCard';
import { Article } from '@/services/newsService';

interface ArticleGridProps {
  articles: Article[];
  loading?: boolean;
  onSaveArticle?: (article: Article) => void;
  savedArticles?: Article[];
}

const SkeletonCard = () => (
  <div className="news-card animate-pulse">
    <div className="h-48 bg-muted rounded-t-lg"></div>
    <div className="p-6 space-y-3">
      <div className="flex justify-between items-center">
        <div className="h-4 bg-muted rounded w-20"></div>
        <div className="h-4 bg-muted rounded w-16"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-full"></div>
        <div className="h-4 bg-muted rounded w-3/4"></div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-muted rounded w-full"></div>
        <div className="h-3 bg-muted rounded w-2/3"></div>
      </div>
    </div>
    <div className="px-6 pb-6">
      <div className="flex justify-between">
        <div className="h-8 bg-muted rounded w-16"></div>
        <div className="h-8 bg-muted rounded w-16"></div>
      </div>
    </div>
  </div>
);

export const ArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  loading = false,
  onSaveArticle,
  savedArticles = [],
}) => {
  const isArticleSaved = (article: Article) => {
    return savedArticles.some(saved => saved.url === article.url);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📰</div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search terms or category selection.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <div
          key={`${article.url}-${index}`}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <ArticleCard
            article={article}
            onSave={onSaveArticle}
            isSaved={isArticleSaved(article)}
          />
        </div>
      ))}
    </div>
  );
};