# E-commerce Backend Server

This is the backend server for the e-commerce application built with Node.js, Express, and MongoDB.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

3. Update the `.env` file with your MongoDB connection string and other configuration values.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Start the production server:
   ```bash
   npm start
   ```

## Testing

Run tests:
```bash
npm test
```

## API Endpoints

### Health Check
- `GET /api/health` - Server health check

## Environment Variables

- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production/test)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `JWT_EXPIRE` - JWT expiration time

## Project Structure

```
server/
├── config/          # Configuration files
├── controllers/     # Route controllers
├── middleware/      # Custom middleware
├── models/          # Database models
├── routes/          # API routes
├── services/        # Business logic services
├── tests/           # Test files
├── .env             # Environment variables
├── .env.example     # Environment variables template
└── server.js        # Main server file
```