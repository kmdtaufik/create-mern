#!/usr/bin/env node
//every thing will be executed in this file

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import os from "os";
import readline from "readline";
import { execSync } from "child_process";
import chalk from "chalk";
import ora from "ora";
import { showMenu } from "./lib/menu.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Ascii banner
const mern_banner = `
███╗   ███╗███████╗██████╗ ███╗   ██╗
████╗ ████║██╔════╝██╔══██╗████╗  ██║
██╔████╔██║█████╗  ██████╔╝██╔██╗ ██║
██║╚██╔╝██║██╔══╝  ██╔══██╗██║╚██╗██║
██║ ╚═╝ ██║███████╗██║  ██║██║ ╚████║
╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝
`;
console.log(chalk.green(mern_banner));
console.log(chalk.blue("Welcome to MERN Stack Scaffolder!\n"));

// Start the application
async function main() {
  try {
    await showMenu();
  } catch (error) {
    console.error(chalk.red("Error:", error.message));
    process.exit(1);
  }
}

main();
