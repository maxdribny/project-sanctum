import { defineConfig } from "vite";
import { readFileSync } from "fs";
import { join } from "path";

export default defineConfig({
  base: "/project-sanctum/",
  define: {
    __VERSION_INFO__: JSON.stringify(getVersionInfo()),
  },
});

function getVersionInfo() {
  try {
    // Try to read generated version info
    const versionPath = join(process.cwd(), 'version.json');
    const versionData = readFileSync(versionPath, 'utf8');
    return JSON.parse(versionData);
  } catch (error) {
    // Fallback for development when version.json doesn't exist
    console.log('version.json not found, using development fallback');
    return {
      version: '0.0.0-dev',
      baseVersion: '0.0.0',
      preRelease: 'dev',
      buildMetadata: 'local',
      git: {
        hash: 'development',
        shortHash: 'dev',
        branch: 'local',
        latestTag: '0.0.0',
        commitsSinceTag: 0
      },
      build: {
        timestamp: Math.floor(Date.now() / 1000),
        time: new Date().toISOString(),
        isRelease: false,
        environment: 'development'
      }
    };
  }
}
