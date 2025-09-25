# NewsHub - Modern News Aggregator

A beautifully designed, dark-themed news aggregator built with React, TypeScript, and Tailwind CSS. Stay informed with the latest news from around the world in a sleek, modern interface.

## Features

- **Real-time News**: Fetches the latest news articles from various sources
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Theme**: Easy on the eyes with a modern dark interface
- **Bento Grid Layout**: Unique and visually appealing article presentation
- **Search Functionality**: Find news articles by keywords
- **Category Filtering**: Browse news by different categories
- **Article Cards**: Clean, card-based design for easy reading

## How It Works

NewsHub uses the NewsAPI to fetch and display news articles. The application features:

1. **Hero Section**: A bento grid layout showcasing featured articles with different sizes and prominence
2. **Article Grid**: A responsive grid of news articles with images, titles, and descriptions
3. **Navigation**: Easy access to different news categories and search functionality
4. **Loading States**: Smooth loading animations while fetching news data
5. **Error Handling**: Graceful handling of API errors and missing images

## Getting Started Locally

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/xaibandala/news-hub.git
   cd news-hub
   ```

2. **Install dependencies**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory and add your NewsAPI key:
   ```env
   VITE_NEWS_API_KEY=your_news_api_key_here
   ```
   
   To get a NewsAPI key, visit [NewsAPI.org](https://newsapi.org/) and sign up for a free API key.

4. **Start the development server**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application in action.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## Technologies Used

- **React 18** - Frontend JavaScript library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Lucide React** - Modern icon library
- **NewsAPI** - News data source

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── ArticleCard.tsx # Individual article component
│   ├── ArticleGrid.tsx # Grid of articles
│   ├── HeroBentoGrid.tsx # Featured articles bento grid
│   └── Navigation.tsx  # Navigation component
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
├── services/           # API services
│   └── newsService.ts  # NewsAPI integration
└── assets/             # Static assets
```
