import { execSync } from "child_process";
import ora from "ora";

export async function installBackendPackages(packageManager) {
  const spinner = ora("Initializing Node.js environment...").start();

  try {
    // Initialize npm project
    execSync(`${packageManager} init`, { stdio: "inherit" });

    // Install common backend packages
    const commonPackages = ["express", "mongoose", "cors", "dotenv"];
    execSync(`${packageManager} install ${commonPackages.join(" ")}`, {
      stdio: "inherit",
    });

    //Install dev dependencies
    const devPackages = ["nodemon"];
    execSync(`${packageManager} install --save-dev ${devPackages.join(" ")}`, {
      stdio: "inherit",
    });

    spinner.succeed("Node.js environment initialized!");
  } catch (error) {
    spinner.fail("Failed to initialize Node.js environment");
    throw error;
  }
}
