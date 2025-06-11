import { execSync } from "child_process";
import ora from "ora";

export async function installFrontendPackages(packageManager, targetDir) {
  const spinner = ora("Installing frontend dependencies...").start();

  try {
    //Change to target directory
    const originalDir = process.cwd();
    if (targetDir !== ".") {
      process.chdir(targetDir);
    }
    //Common frontend packages
    const commonPackages = ["react-router", "axios"];
    execSync(`${packageManager} install ${commonPackages.join(" ")}`, {
      stdio: "inherit",
    });

    // Go back to original directory
    if (targetDir !== ".") {
      process.chdir(originalDir);
    }

    spinner.succeed("Frontend dependencies installed!");
  } catch (error) {
    spinner.fail("Failed to install frontend dependencies");
    throw error;
  }
}
