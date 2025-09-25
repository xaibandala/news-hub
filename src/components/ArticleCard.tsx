import React from 'react';
import { Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  author?: string;
}

interface ArticleCardProps {
  article: Article;
  onSave?: (article: Article) => void;
  isSaved?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSave,
  isSaved = false,
}) => {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.style.display = 'none';
  };

  return (
    <Card className="news-card group cursor-pointer overflow-hidden h-full">
      {/* Article Image */}
      {article.urlToImage && (
        <div className="relative overflow-hidden h-48">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={handleImageError}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="font-medium text-primary">{article.source.name}</span>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{formatTimeAgo(article.publishedAt)}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {article.title}
        </h3>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
          {article.description}
        </p>
        {article.author && (
          <p className="text-xs text-muted-foreground mt-2">
            By {article.author}
          </p>
        )}
      </CardContent>

      <CardFooter className="flex justify-between items-center pt-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            if (onSave) onSave(article);
          }}
          className={`transition-colors duration-200 ${
            isSaved ? 'text-primary hover:text-primary/80' : 'hover:text-primary'
          }`}
        >
          {isSaved ? 'Saved' : 'Save'}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            window.open(article.url, '_blank', 'noopener,noreferrer');
          }}
          className="hover:text-primary transition-colors duration-200"
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          Read
        </Button>
      </CardFooter>
    </Card>
  );
};