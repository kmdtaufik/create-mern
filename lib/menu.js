import readline from "readline";
import chalk from "chalk";
import ora from "ora";
import { setupFrontend } from "./frontend/setup.js";
import { setupBackend } from "./backend/setup.js";
import fs from "fs";
import { execSync } from "child_process";
import path from "path";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

export async function showMenu() {
  try {
    // Get project name
    const projectName = await question(chalk.cyan("📦 Enter project name: "));

    if (!projectName.trim()) {
      console.log(chalk.red("❌ Project name is required!"));
      process.exit(1);
    }

    // Check if directory exists
    if (fs.existsSync(projectName)) {
      console.log(chalk.red(`❌ Directory '${projectName}' already exists!`));
      process.exit(1);
    }

    // Get project structure preference
    console.log(chalk.yellow("\n🏗️  Choose project structure:"));
    console.log("1. Full MERN stack (Frontend + Backend)");
    console.log("2. Frontend only (React + Vite)");
    console.log("3. Backend only (Express + MongoDB)");

    const structureChoice = await question(chalk.cyan("Enter choice (1-3): "));

    // Get package manager preference
    console.log(chalk.yellow("\n📦 Choose package manager:"));
    console.log("1. npm");
    console.log("2. pnpm");

    const pmChoice = await question(chalk.cyan("Enter choice (1-2): "));

    const packageManagers = { 1: "npm", 2: "pnpm" };
    const packageManager = packageManagers[pmChoice] || "npm";

    console.log(
      chalk.green(`\n🚀 Creating ${projectName} with ${packageManager}...\n`)
    );

    // Create project directory
    fs.mkdirSync(projectName);
    process.chdir(projectName);

    // Setup based on choice
    switch (structureChoice) {
      case "1":
        await setupFullStack(projectName, packageManager);
        break;
      case "2":
        await setupFrontend(projectName, packageManager, ".");
        break;
      case "3":
        await setupBackend(projectName, packageManager, ".");
        break;
      default:
        await setupFullStack(projectName, packageManager);
    }

    console.log(chalk.green("\n✅ Project created successfully!"));
    console.log(chalk.cyan(`\nNext steps:`));
    console.log(chalk.white(`  cd ${projectName}`));

    if (structureChoice === "1") {
      console.log(
        chalk.white(
          `  # Start frontend: cd frontend && ${packageManager} run dev`
        )
      );
      console.log(
        chalk.white(
          `  # Start backend: cd backend && ${packageManager} run dev`
        )
      );
    } else {
      console.log(chalk.white(`  ${packageManager} run dev`));
    }
  } catch (error) {
    console.error(chalk.red("Error:", error.message));
  } finally {
    rl.close();
  }
}

async function setupFullStack(projectName, packageManager) {
  const spinner = ora("Setting up full MERN stack...").start();

  try {
    // Create frontend
    await setupFrontend(projectName, packageManager, "frontend");

    // Create backend
    fs.mkdirSync("backend");
    await setupBackend(projectName, packageManager, "backend");

    //Create root package.json
    createRootPackageJson(projectName, packageManager);

    // Create root README
    createRootReadme(projectName);

    // Move frontend .gitignore to root
    moveFrontendGitignore();

    spinner.succeed("Full MERN stack setup completed!");
  } catch (error) {
    spinner.fail("Failed to setup full stack");
    throw error;
  }
}

function createRootReadme(projectName) {
  const readmeContent = `# ${projectName}

A MERN stack application created with create-mern.

## Structure

- \`frontend/\` - React + Vite application
- \`backend/\` - Express + MongoDB API

## Getting Started

### Frontend
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

### Backend
\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

## Features

- React with Vite for fast development
- Express.js REST API
- MongoDB with Mongoose
- CORS enabled
- Environment configuration
- Hot reload in development
`;

  fs.writeFileSync("README.md", readmeContent);
}

function createRootPackageJson(projectName, packageManager) {
  // Initialize root package.json
  try {
    execSync(`${packageManager} init`, { stdio: "inherit" });

    //Custom scripts for root package.json
    const installDependencies = {
      frontend: `(cd frontend && ${packageManager} install)`,
      backend: `(cd backend && ${packageManager} install)`,
    };
    const buildCommand = `(cd frontend && ${packageManager} run build)`;

    //Edit package.json
    const packageJsonPath = path.join(process.cwd(), "package.json");
    const packageJsonContent = fs.readFileSync(packageJsonPath, "utf-8");
    const parsedPackageJson = JSON.parse(packageJsonContent);

    parsedPackageJson.scripts = {
      ...parsedPackageJson.scripts,
      "install:dependencies": `${installDependencies.frontend} && ${installDependencies.backend}`,
      "dev:frontend": `cd frontend && ${packageManager} run dev`,
      "dev:backend": `cd backend && ${packageManager} run dev`,
      build: `${installDependencies.frontend} && ${installDependencies.backend} && ${buildCommand}`,
    };
    //Write back to package.json
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(parsedPackageJson, null, 2)
    );

    console.log("✅ Root package.json created successfully!");
  } catch (e) {
    console.log(`❌Error creating root package.json: ${e.message}`);
  }
}

//Move fronend .gitignore to root
function moveFrontendGitignore() {
try {
    const frontendGitignorePath = path.join(process.cwd(), "frontend", ".gitignore");
    const rootGitignorePath = path.join(process.cwd(), ".gitignore");

    if (fs.existsSync(frontendGitignorePath)) {
      fs.renameSync(frontendGitignorePath, rootGitignorePath);
      console.log("✅ Moved frontend .gitignore to root directory.");
    } else {
      console.log("⚠️ No frontend .gitignore found to move.");
    }
  }catch (error) {
    console.error("❌ Error moving frontend .gitignore:", error.message);
  }
}  
