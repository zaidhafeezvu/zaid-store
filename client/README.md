# E-Commerce Frontend

Modern React 19 application built with Vite, featuring a complete authentication system and e-commerce functionality.

## 🚀 Features

- **React 19** - Latest React version with modern features
- **Vite** - Fast build tool and development server
- **Redux Toolkit** - Modern Redux state management
- **React Router v6** - Client-side routing
- **Bootstrap 5** - Modern UI framework
- **Reactstrap** - Bootstrap components for React
- **Authentication System** - Complete login/register/profile management
- **Protected Routes** - Route-level authentication
- **Form Validation** - Client-side validation with ValidatorJS
- **Notifications** - User feedback system
- **Responsive Design** - Mobile-first approach

## 🛠️ Tech Stack

- **Frontend Framework:** React 19
- **Build Tool:** Vite 6
- **State Management:** Redux Toolkit
- **Routing:** React Router v6
- **UI Framework:** Bootstrap 5 + Reactstrap
- **Styling:** SCSS
- **HTTP Client:** Axios
- **Form Validation:** ValidatorJS
- **Icons:** Font Awesome + Simple Line Icons

## 📦 Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🏗️ Project Structure

```
client/
├── app/                    # Application source code
│   ├── containers/         # React containers/pages
│   │   ├── Authentication/ # Auth system components
│   │   ├── Application/    # Main app container
│   │   ├── Homepage/       # Landing page
│   │   ├── Dashboard/      # User dashboard
│   │   └── ...            # Other containers
│   ├── contexts/          # React contexts
│   ├── styles/            # Global styles
│   ├── utils/             # Utility functions
│   ├── app.js             # Main app component
│   ├── store.js           # Redux store configuration
│   └── index.jsx          # Application entry point
├── public/                # Static assets
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies and scripts
```

## 🔐 Authentication System

The application includes a complete authentication system with:

- **User Registration** - Create new accounts with validation
- **User Login** - Secure authentication with JWT tokens
- **Profile Management** - Update user information and addresses
- **Protected Routes** - Automatic redirection for unauthenticated users
- **Admin Routes** - Role-based access control
- **Token Persistence** - Automatic login state restoration
- **Logout** - Secure session termination

### Authentication Components

- `LoginForm` - User login interface
- `RegisterForm` - User registration interface
- `ProfileForm` - Profile management interface
- `AuthStatus` - Navigation authentication status
- `ProtectedRoute` - Route protection wrapper

## 🎨 Styling

The application uses a modern design system with:

- **Bootstrap 5** for responsive layout and components
- **Custom SCSS** for enhanced styling
- **Gradient backgrounds** for visual appeal
- **Responsive design** for all screen sizes
- **Consistent color scheme** throughout the app

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

### Environment Variables

Create a `.env` file in the client directory for environment-specific configuration:

```env
VITE_API_URL=http://localhost:5000/api
```

### API Integration

The frontend is configured to work with a backend API running on `http://localhost:5000`. The Vite development server includes a proxy configuration for seamless API integration.

## 🚀 Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

3. **Configure your server** to serve the `index.html` file for all routes (SPA routing)

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Use meaningful commit messages
3. Test your changes thoroughly
4. Update documentation as needed

## 📝 Notes

- This application has been upgraded from React 16 to React 19
- Migrated from Webpack to Vite for improved development experience
- Uses modern Redux Toolkit instead of legacy Redux patterns
- Implements React Router v6 with the latest routing patterns
- All dependencies have been updated to their latest stable versions