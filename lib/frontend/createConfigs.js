import fs from "fs";
import path from "path";
import ora from "ora";
export async function createFrontendConfigs(projectName, targetDir) {
  const originalDir = process.cwd();
  const spinner = ora("Installing frontend dependencies...").start();

  try {
    if (targetDir !== ".") {
      process.chdir(targetDir);
    }

    // Create App component with welcome message
    const appJsxContent = `import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [welcomeMessage, setWelcomeMessage] = useState('')

  useEffect(() => {
    // Fetch welcome message from backend
    fetch('http://localhost:5000/api/welcome')
      .then(res => res.json())
      .then(data => {
        console.log('🎉 Welcome to MERN Stack Development Environment! 🚀💻✨🔥')
        setWelcomeMessage(data.message)
      })
      .catch(err => {
        console.log('🎉 Welcome to MERN Stack Development Environment! 🚀💻✨🔥')
        setWelcomeMessage('🎉 Welcome to MERN Stack Development Environment! 🚀')
      })
  }, [])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>MERN Stack App</h1>
      <div className="welcome-message">
        <p>{welcomeMessage}</p>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
`;

    // Create enhanced CSS
    const appCssContent = `#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.welcome-message {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  font-size: 1.2rem;
  font-weight: bold;
}

.read-the-docs {
  color: #888;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  color: white;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
    color: #213547;
  }
}
`;

    // Write files
    fs.writeFileSync("src/App.jsx", appJsxContent);
    fs.writeFileSync("src/App.css", appCssContent);

    if (targetDir !== ".") {
      process.chdir(originalDir);
    }

    spinner.succeed("Successfully modified App.");
  } catch (error) {
    spinner.fail("Failed to create frontend configs");
    throw error;
  }
}
