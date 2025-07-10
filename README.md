# Personal Finance Management - Backend API

A comprehensive backend API for personal finance management built with Node.js, Express, and PostgreSQL.

## 🚀 Features

- **User Authentication** - JWT-based auth with secure password hashing
- **Category Management** - User-defined income/expense categories
- **Transaction Management** - Add, view, update, and delete transactions
- **Dashboard Analytics** - Financial summaries and insights
- **Budget Tracking** - Set and monitor budgets
- **Data Visualization** - APIs for charts and analytics

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting
- **Testing**: Jest & Supertest

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd personal-finance-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your database credentials and JWT secret
```

4. **Set up database**
```bash
npm run db:generate
npm run db:migrate
```

5. **Start the server**
```bash
# Development
npm run dev

# Production
npm start
```

## 🗄️ Database Schema

### Users
- id, email, password, name, avatar, isActive
- Relations: categories, transactions, budgets

### Categories
- id, name, type (INCOME/EXPENSE), color, icon, description
- Relations: user, transactions

### Transactions
- id, amount, type, note, date, categoryId, userId
- Relations: user, category

### Budgets
- id, name, amount, period, categoryId, userId, startDate, endDate
- Relations: user

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Categories
- `GET /api/categories` - Get user categories
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Transactions
- `GET /api/transactions` - Get user transactions
- `POST /api/transactions` - Create new transaction
- `GET /api/transactions/:id` - Get transaction by ID
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/transactions/summary` - Get transaction summary

### Dashboard
- `GET /api/dashboard/summary` - Get financial summary
- `GET /api/dashboard/recent-transactions` - Get recent transactions
- `GET /api/dashboard/quick-stats` - Get quick statistics

### Analytics
- `GET /api/analytics/expense-by-category` - Expense breakdown by category
- `GET /api/analytics/income-vs-expense` - Income vs expense trends
- `GET /api/analytics/trends` - Financial trends over time

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 📚 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run db:migrate` - Run database migrations
- `npm run db:generate` - Generate Prisma client
- `npm run db:studio` - Open Prisma Studio

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation with Joi

## 🌍 Environment Variables

```env
DATABASE_URL=postgresql://username:password@localhost:5432/personal_finance_db
JWT_SECRET=your-super-secret-jwt-key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── middleware/     # Custom middleware
│   ├── models/         # Database models
│   ├── modules/        # Feature modules
│   │   ├── auth/
│   │   ├── categories/
│   │   ├── transactions/
│   │   ├── dashboard/
│   │   └── analytics/
│   ├── utils/          # Utility functions
│   └── app.js          # Express app setup
├── prisma/             # Database schema and migrations
├── tests/              # Test files
└── server.js           # Server entry point
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
