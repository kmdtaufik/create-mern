import fs from "fs";
import { execSync } from "child_process";
export async function createViteProject(projectName, pkgManager) {
  //Double dash for npm compatibility
  const doubleDash = pkgManager === "npm" ? "--" : "";
  // Create Vite project using the specified package manager
  const command = `${pkgManager} create vite@latest frontend ${doubleDash} --template react`;
  execSync(command, { stdio: "inherit" });
}
