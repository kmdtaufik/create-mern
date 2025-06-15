# create-mern

A powerful scaffolder for MERN stack projects with Vite + React frontend and Express + MongoDB backend.

## Features

- 🚀 **Fast Setup** - Create full MERN stack projects in seconds
- ⚡ **Vite + React** - Modern frontend development with hot reload
- 🛠️ **Express + MongoDB** - Robust backend with Mongoose ODM
- 📦 **Package Manager Choice** - Support for npm and pnpm
- 🏗️ **Flexible Structure** - Choose full stack, frontend only, or backend only
- 🔧 **Pre-configured** - CORS, environment variables, and development scripts included

## Usage

```npm
npm create @devsuite/mern@latest
```

or,

```pnpm
pnpm create @devsuite/mern
```

Follow the interactive prompts to:

1. Enter your project name
2. Choose project structure (Full MERN, Frontend only, or Backend only)
3. Select package manager (npm or pnpm)

## Project Structure Options

### 1. Full MERN Stack

Creates a complete MERN application with separate frontend and backend directories:

```
my-project/
├── .gitignore         # Git ignore file
├── frontend/          # React + Vite application
├── backend/           # Express + MongoDB API
├── package.json       # Root package.json with scripts
└── README.md          # Project documentation
```

### 2. Frontend Only

Creates a React + Vite application:

```
my-project/
├── src/               # React components
├── public/            # Static assets
├── package.json       # Frontend dependencies
└── vite.config.js     # Vite configuration
```

### 3. Backend Only

Creates an Express + MongoDB API:

```
my-project/
├── routes/            # API routes
├── models/            # Mongoose models
├── controllers/       # Route controllers
├── config/            # Configuration files
├── server.js          # Main server file
├── .env               # Environment variables
└── package.json       # Backend dependencies
```

## Generated Project Features

### Frontend (React + Vite)

- ⚡ Vite for fast development and building
- 🔄 React Router for navigation
- 📡 Axios for HTTP requests
- 🎨 Modern React setup with JSX

### Backend (Express + MongoDB)

- 🌐 Express.js server with CORS enabled
- 🗄️ MongoDB connection with Mongoose
- 🔐 Environment variable configuration
- 🔄 Nodemon for development hot reload

## Available Scripts (Full Stack)

```bash
# Install all dependencies
npm run install:dependencies

# Start frontend development server
npm run dev:frontend

# Start backend development server
npm run dev:backend

# Build for production
npm run build
```

## Environment Variables

For backend projects, a `.env` file is created with:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/your-project-name
NODE_ENV=development
```

## Requirements

- Node.js >= 16.0.0
- MongoDB/Atlas (for backend/full stack projects)

## Package Managers

Supports both npm and pnpm package managers. Choose your preferred one during project creation.

## Development

To contribute to create-mern:

```bash
git clone https://github.com/kmdtaufik/create-mern.git
cd create-mern
npm install
```

## License

MIT

## Keywords

- MERN stack
- React
- Express
- MongoDB
- Vite
- Scaffolder
- Template
- Full-stack development
