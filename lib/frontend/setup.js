import fs from "fs";
import path from "path";
import { createViteProject } from "./Vite.js";
import { installFrontendPackages } from "./installPkgs.js";
import { createFrontendConfigs } from "./createConfigs.js";
import ora from "ora";

//All Options and functions related to the frontend setup will be here

export async function setupFrontend(projectName, packageManager, targetDir) {
  const spinner = ora("Setting up React + Vite frontend...").start();

  try {
    // Create Vite project structure
    await createViteProject(projectName, packageManager);

    // Install packages
    await installFrontendPackages(packageManager, targetDir);

    // Create config files
    await createFrontendConfigs(projectName, targetDir);

    spinner.succeed("Frontend setup completed!");
  } catch (error) {
    spinner.fail("Frontend setup failed");
    throw error;
  }
}
