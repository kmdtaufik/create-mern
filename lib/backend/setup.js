import fs from "fs";
import path from "path";
import { installBackendPackages } from "./installPkgs.js";
import ora from "ora";

export async function setupBackend(projectName, packageManager, targetDir) {
  const spinner = ora("Setting up Express + MongoDB backend...").start();

  try {
    // Change to target directory
    const originalDir = process.cwd();
    if (targetDir !== ".") {
      process.chdir(targetDir);
    }
    // Install packages
    await installBackendPackages(packageManager);
    // Create backend project structure
    modifyBackendStructure(projectName);

    // Go back to original directory
    if (targetDir !== ".") {
      process.chdir(originalDir);
    }

    spinner.succeed("Backend setup completed!");
  } catch (error) {
    spinner.fail("Backend setup failed");
    throw error;
  }
}

function modifyBackendStructure(projectName) {
  //Edit package.json
  const packageJsonPath = path.join(process.cwd(), "package.json");
  const packageJsonContent = fs.readFileSync(packageJsonPath, "utf-8");
  const parsedPackageJson = JSON.parse(packageJsonContent);

  parsedPackageJson.scripts = {
    ...parsedPackageJson.scripts,
    start: "node server.js",
    dev: "nodemon server.js",
    test: 'echo "Error: no test specified" && exit 1',
  };

  parsedPackageJson.type = "module"; // Set type to module for ESM support
  parsedPackageJson.name = `${projectName}-backend`; // Set project name
  parsedPackageJson.description = `Backend for ${projectName}`; // Set project description
  fs.writeFileSync(packageJsonPath, JSON.stringify(parsedPackageJson, null, 2));

  // Create server.js
  const serverJs = `import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
cosnt __dirname = path.resolve();

// Middleware
if (process.env.NODE_ENV !== "production") {
app.use(cors());
}
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/${projectName}')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!', timestamp: new Date().toISOString() });
});

//Production 
if (process.env.NODE_ENV === 'production') {
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get('*', (req, res) => {
res.semdFile(path.join(__dirname,"../frontend/","dist","index.html"));
})
}
// Demo welcome endpoint
app.get('/api/welcome', (req, res) => {
  res.json({
    message: '🎉 Welcome to MERN Stack Development Environment! 🚀',
    emoji: '💻✨🔥',
    status: 'success',
    timestamp: new Date().toISOString()
  });
});

// Sample route
app.get('/api/users', (req, res) => {
  res.json({ users: [], message: 'Users endpoint working' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
`;
  fs.writeFileSync("server.js", serverJs);

  // Create .env template
  const envContent = `PORT=5000
MONGODB_URI=mongodb://localhost:27017/${projectName}
NODE_ENV=development
`;
  fs.writeFileSync(".env", envContent);

  // Create  directories
  fs.mkdirSync("routes", { recursive: true });
  fs.mkdirSync("models", { recursive: true });
  fs.mkdirSync("controllers", { recursive: true });
  fs.mkdirSync("config", { recursive: true });

  // Create README
  const readmeContent = `# ${projectName} Backend

Express.js backend with MongoDB for ${projectName}.

## Setup

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Copy environment variables:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

3. Update MongoDB URI in .env file

4. Start the server:
   \`\`\`bash
   npm run dev
   \`\`\`

## API Endpoints

- \`GET /api/health\` - Health check
- \`GET /api/users\` - Get all users
- \`POST /api/users\` - Create a new user

## Features

- Express.js server
- MongoDB with Mongoose
- CORS enabled
- Environment configuration
`;

  fs.writeFileSync("README.md", readmeContent);
}
