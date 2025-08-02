const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const sampleData = require('./scripts/createSampleData');
const enhancedData = require('./scripts/enhancedDemoData');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// In-memory data storage (temporary solution)
let categories = [...sampleData.categories, {
  _id: '507f1f77bcf86cd799439015',
  name: 'Business',
  nameTamil: 'வணிகம்',
  slug: 'business',
  color: '#6f42c1',
  icon: 'fas fa-chart-line',
  isActive: true,
  order: 5
}, {
  _id: '507f1f77bcf86cd799439016',
  name: 'Health',
  nameTamil: 'சுகாதாரம்',
  slug: 'health',
  color: '#20c997',
  icon: 'fas fa-heartbeat',
  isActive: true,
  order: 6
}];
let news = [...sampleData.news, ...enhancedData.enhancedNews];
let users = [{
  _id: '507f1f77bcf86cd799439001',
  username: 'admin',
  email: 'admin@tamilnews.com',
  role: 'admin'
}];

// Mock authentication middleware
const mockAuth = (req, res, next) => {
  req.user = { userId: '507f1f77bcf86cd799439001', role: 'admin' };
  next();
};

// API Routes

// Categories
app.get('/api/categories', (req, res) => {
  res.json(categories.filter(cat => cat.isActive));
});

app.get('/api/categories/:slug', (req, res) => {
  const category = categories.find(cat => cat.slug === req.params.slug && cat.isActive);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }
  res.json(category);
});

// News
app.get('/api/news', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const category = req.query.category;
  const breaking = req.query.breaking;

  let filteredNews = news.filter(item => item.isPublished);
  
  if (category) {
    filteredNews = filteredNews.filter(item => item.category._id === category);
  }
  
  if (breaking === 'true') {
    filteredNews = filteredNews.filter(item => item.isBreaking);
  }

  // Sort by priority and date
  filteredNews.sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    return new Date(b.publishedAt) - new Date(a.publishedAt);
  });

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedNews = filteredNews.slice(startIndex, endIndex);

  res.json({
    news: paginatedNews,
    totalPages: Math.ceil(filteredNews.length / limit),
    currentPage: page,
    total: filteredNews.length
  });
});

app.get('/api/news/breaking', (req, res) => {
  const breakingNews = news.filter(item => item.isPublished && item.isBreaking)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, 5);
  res.json(breakingNews);
});

app.get('/api/news/latest', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const latestNews = news.filter(item => item.isPublished)
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, limit);
  res.json(latestNews);
});

app.get('/api/news/category/:slug', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  
  const category = categories.find(cat => cat.slug === req.params.slug);
  if (!category) {
    return res.status(404).json({ message: 'Category not found' });
  }

  const categoryNews = news.filter(item => 
    item.category._id === category._id && item.isPublished
  ).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedNews = categoryNews.slice(startIndex, endIndex);

  res.json({
    news: paginatedNews,
    category,
    totalPages: Math.ceil(categoryNews.length / limit),
    currentPage: page,
    total: categoryNews.length
  });
});

app.get('/api/news/search/:query', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const query = req.params.query.toLowerCase();

  const searchResults = news.filter(item => 
    item.isPublished && (
      item.title.toLowerCase().includes(query) ||
      item.titleTamil.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query) ||
      item.contentTamil.toLowerCase().includes(query)
    )
  ).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedResults = searchResults.slice(startIndex, endIndex);

  res.json({
    news: paginatedResults,
    totalPages: Math.ceil(searchResults.length / limit),
    currentPage: page,
    total: searchResults.length,
    query: req.params.query
  });
});

app.get('/api/news/:id', (req, res) => {
  const newsItem = news.find(item => item._id === req.params.id);
  if (!newsItem || !newsItem.isPublished) {
    return res.status(404).json({ message: 'News article not found' });
  }

  // Increment views
  newsItem.views += 1;
  res.json(newsItem);
});

app.post('/api/news/:id/like', (req, res) => {
  const newsItem = news.find(item => item._id === req.params.id);
  if (!newsItem) {
    return res.status(404).json({ message: 'News article not found' });
  }

  newsItem.likes += 1;
  res.json({ message: 'News liked successfully', likes: newsItem.likes });
});

// Auth routes (mock)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'admin@tamilnews.com' && password === 'admin123') {
    res.json({
      message: 'Login successful',
      token: 'mock-jwt-token',
      user: {
        id: '507f1f77bcf86cd799439001',
        username: 'admin',
        email: 'admin@tamilnews.com',
        role: 'admin'
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/api/auth/me', (req, res) => {
  res.json({
    user: {
      id: '507f1f77bcf86cd799439001',
      username: 'admin',
      email: 'admin@tamilnews.com',
      role: 'admin'
    }
  });
});

// Admin routes (mock)
app.get('/api/admin/stats', mockAuth, (req, res) => {
  const totalNews = news.length;
  const publishedNews = news.filter(item => item.isPublished).length;
  const draftNews = news.filter(item => !item.isPublished).length;
  const breakingNews = news.filter(item => item.isBreaking && item.isPublished).length;

  res.json({
    stats: {
      totalNews,
      publishedNews,
      draftNews,
      breakingNews,
      totalCategories: categories.length,
      totalUsers: users.length
    },
    recentNews: news.slice(0, 5),
    popularNews: news.sort((a, b) => b.views - a.views).slice(0, 5)
  });
});

// Serve static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🎉 Tamil News Channel (DEMO MODE) running on port ${PORT}`);
  console.log(`📱 Access your app at: http://localhost:${PORT}`);
  console.log(`🔑 Demo Admin Login: admin@tamilnews.com / admin123`);
  console.log(`📊 Enhanced demo data loaded: ${categories.length} categories, ${news.length} news articles with images`);
  console.log(`⚠️  Note: Using in-memory data (no database required)`);
});

module.exports = app;
