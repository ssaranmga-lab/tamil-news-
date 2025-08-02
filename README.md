# Tamil News Channel Web Application

A comprehensive web application for a Tamil news channel with modern features and bilingual support.

## Features

### Frontend Features
- **Responsive Design**: Mobile-first responsive design with Bootstrap 5
- **Tamil Language Support**: Full Tamil language support with Noto Sans Tamil font
- **Breaking News Ticker**: Real-time breaking news ticker
- **Category-based Navigation**: News organized by categories
- **Search Functionality**: Search news articles in Tamil and English
- **Article Reading**: Full article view with social features
- **Admin Panel**: Complete admin interface for content management

### Backend Features
- **RESTful API**: Complete REST API for news management
- **User Authentication**: JWT-based authentication system
- **Role-based Access**: Admin, Editor, and Viewer roles
- **File Upload**: Image upload for news articles
- **Database Integration**: MongoDB with Mongoose ODM
- **Security**: Helmet, CORS, and rate limiting

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Bootstrap 5
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Security**: Helmet, CORS, bcryptjs

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NEWS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/tamil-news
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=development
   ```

4. **Install and start MongoDB**
   Make sure MongoDB is installed and running on your system.

5. **Initialize the database**
   ```bash
   node scripts/initDatabase.js
   ```

6. **Start the application**
   ```bash
   npm start
   ```
   
   For development with auto-restart:
   ```bash
   npm run dev
   ```

7. **Access the application**
   Open your browser and go to `http://localhost:3000`

## Default Admin Credentials

After running the database initialization script:
- **Email**: admin@tamilnews.com
- **Password**: admin123

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile

### News
- `GET /api/news` - Get all published news (with pagination)
- `GET /api/news/breaking` - Get breaking news
- `GET /api/news/latest` - Get latest news
- `GET /api/news/category/:slug` - Get news by category
- `GET /api/news/:id` - Get single news article
- `GET /api/news/search/:query` - Search news articles
- `POST /api/news/:id/like` - Like a news article

### Categories
- `GET /api/categories` - Get all active categories
- `GET /api/categories/:slug` - Get category by slug

### Admin (Requires Authentication)
- `POST /api/admin/news` - Create news article
- `PUT /api/admin/news/:id` - Update news article
- `DELETE /api/admin/news/:id` - Delete news article
- `GET /api/admin/news` - Get all news (including unpublished)
- `POST /api/admin/categories` - Create category
- `PUT /api/admin/categories/:id` - Update category
- `DELETE /api/admin/categories/:id` - Delete category
- `GET /api/admin/categories` - Get all categories
- `GET /api/admin/stats` - Get dashboard statistics

## Project Structure

```
NEWS/
├── models/                 # Database models
│   ├── User.js            # User model
│   ├── News.js            # News model
│   └── Category.js        # Category model
├── routes/                # API routes
│   ├── auth.js           # Authentication routes
│   ├── news.js           # News routes
│   ├── categories.js     # Category routes
│   └── admin.js          # Admin routes
├── middleware/            # Custom middleware
│   ├── auth.js           # Authentication middleware
│   └── adminAuth.js      # Admin authorization middleware
├── public/               # Static files
│   ├── css/             # Stylesheets
│   ├── js/              # JavaScript files
│   ├── uploads/         # Uploaded images
│   └── index.html       # Main HTML file
├── scripts/             # Utility scripts
│   └── initDatabase.js  # Database initialization
├── server.js            # Main server file
├── package.json         # Dependencies and scripts
├── .env                 # Environment variables
└── README.md           # This file
```

## Usage

### For Viewers
1. Visit the homepage to see latest news
2. Browse news by categories
3. Search for specific news articles
4. Read full articles with social features

### For Admins
1. Login with admin credentials
2. Access the admin panel
3. Create and manage news articles
4. Manage categories
5. View dashboard statistics

## Features in Detail

### News Management
- Create, edit, and delete news articles
- Support for both Tamil and English content
- Image upload for featured images
- Category assignment
- Breaking news designation
- Publication status control
- Priority-based sorting

### Category Management
- Create and manage news categories
- Bilingual category names
- Color-coded categories
- Icon support
- Category ordering

### User Management
- Role-based access control
- JWT-based authentication
- User registration and login
- Admin and editor roles

### Search and Filtering
- Full-text search in Tamil and English
- Category-based filtering
- Breaking news filtering
- Pagination support

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation and sanitization

## Responsive Design

- Mobile-first approach
- Bootstrap 5 responsive grid
- Touch-friendly interface
- Optimized for all screen sizes

## Tamil Language Support

- Noto Sans Tamil font for proper Tamil rendering
- Bilingual content support
- Tamil-friendly UI elements
- Right-to-left text support where needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team.
