import React from 'react';
import { Clock, ExternalLink } from 'lucide-react';
import { Article } from '@/services/newsService';

interface HeroBentoGridProps {
  articles: Article[];
  loading?: boolean;
}

export const HeroBentoGrid: React.FC<HeroBentoGridProps> = ({ 
  articles, 
  loading = false 
}) => {
  // Format time ago helper function
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

  // Take first 6 articles for the bento grid
  const featuredArticles = articles.slice(0, 6);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {[...Array(6)].map((_, index) => {
          const height = index === 0 ? '400px' : index === 3 ? '300px' : '200px';
          const spanClass = index === 0 ? 'md:col-span-2 md:row-span-2' : 
                           index === 3 ? 'md:col-span-2' : '';
          
          return (
            <div
              key={index}
              className={`bg-muted rounded-lg animate-pulse ${spanClass}`}
              style={{ height }}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 auto-rows-[200px]">
      {/* Large featured article - spans 2x2 */}
      {featuredArticles[0] && (
        <div className="md:col-span-2 md:row-span-2 group cursor-pointer overflow-hidden rounded-lg border border-border/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
          <div className="relative h-full">
            <img
              src={featuredArticles[0].urlToImage}
              alt={featuredArticles[0].title}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center gap-2 text-sm text-white/80 mb-2">
                <Clock className="w-4 h-4" />
                <span>{formatTimeAgo(featuredArticles[0].publishedAt)}</span>
                <span>•</span>
                <span>{featuredArticles[0].source.name}</span>
              </div>
              <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                {featuredArticles[0].title}
              </h2>
              <p className="text-white/90 line-clamp-2">
                {featuredArticles[0].description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Medium article - spans 1x1 */}
      {featuredArticles[1] && (
        <div className="group cursor-pointer overflow-hidden rounded-lg border border-border/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
          <div className="relative h-full">
            <img
              src={featuredArticles[1].urlToImage}
              alt={featuredArticles[1].title}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="flex items-center gap-2 text-xs text-white/80 mb-1">
                <Clock className="w-3 h-3" />
                <span>{formatTimeAgo(featuredArticles[1].publishedAt)}</span>
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2">
                {featuredArticles[1].title}
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* Medium article - spans 1x1 */}
      {featuredArticles[2] && (
        <div className="group cursor-pointer overflow-hidden rounded-lg border border-border/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
          <div className="relative h-full">
            <img
              src={featuredArticles[2].urlToImage}
              alt={featuredArticles[2].title}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="flex items-center gap-2 text-xs text-white/80 mb-1">
                <Clock className="w-3 h-3" />
                <span>{formatTimeAgo(featuredArticles[2].publishedAt)}</span>
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2">
                {featuredArticles[2].title}
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* Wide article - spans 2x1 */}
      {featuredArticles[3] && (
        <div className="md:col-span-2 group cursor-pointer overflow-hidden rounded-lg border border-border/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
          <div className="relative h-full">
            <img
              src={featuredArticles[3].urlToImage}
              alt={featuredArticles[3].title}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="flex items-center gap-2 text-sm text-white/80 mb-2">
                <Clock className="w-4 h-4" />
                <span>{formatTimeAgo(featuredArticles[3].publishedAt)}</span>
                <span>•</span>
                <span>{featuredArticles[3].source.name}</span>
              </div>
              <h3 className="font-bold mb-1 group-hover:text-primary transition-colors line-clamp-2">
                {featuredArticles[3].title}
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* Small article - spans 1x1 */}
      {featuredArticles[4] && (
        <div className="group cursor-pointer overflow-hidden rounded-lg border border-border/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
          <div className="relative h-full">
            <img
              src={featuredArticles[4].urlToImage}
              alt={featuredArticles[4].title}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="flex items-center gap-2 text-xs text-white/80 mb-1">
                <Clock className="w-3 h-3" />
                <span>{formatTimeAgo(featuredArticles[4].publishedAt)}</span>
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2">
                {featuredArticles[4].title}
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* Small article - spans 1x1 */}
      {featuredArticles[5] && (
        <div className="group cursor-pointer overflow-hidden rounded-lg border border-border/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
          <div className="relative h-full">
            <img
              src={featuredArticles[5].urlToImage}
              alt={featuredArticles[5].title}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="flex items-center gap-2 text-xs text-white/80 mb-1">
                <Clock className="w-3 h-3" />
                <span>{formatTimeAgo(featuredArticles[5].publishedAt)}</span>
              </div>
              <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2">
                {featuredArticles[5].title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
