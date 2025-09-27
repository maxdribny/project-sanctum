#!/usr/bin/env node

/**
 * @fileoverview Version generation script for GitHub CI/CD
 * @description Generates semantic version info from git data and package.json
 */

const { execSync } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

/**
 * Generate comprehensive version information
 * @returns {Object} Version metadata object
 */
function generateVersionInfo() {
  try {
    // Read package.json for base version
    const packagePath = join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
    const baseVersion = packageJson.version;

    // Get git information
    const gitHash = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
    const gitShortHash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
    const gitBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();

    // Get latest git tag
    let latestTag = baseVersion;
    let commitsSinceTag = 0;

    try {
      latestTag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
      // Remove 'v' prefix if present
      if (latestTag.startsWith('v')) {
        latestTag = latestTag.substring(1);
      }

      // Count commits since latest tag
      const tagRef = latestTag.startsWith('v') ? latestTag : 'v' + latestTag;
      commitsSinceTag = parseInt(
        execSync(`git rev-list ${tagRef}..HEAD --count`, { encoding: 'utf8' }).trim()
      );
    } catch (error) {
      console.log('No git tags found, using package.json version');
      // Use commits since beginning if no tags
      try {
        commitsSinceTag = parseInt(
          execSync('git rev-list --count HEAD', { encoding: 'utf8' }).trim()
        );
      } catch (e) {
        commitsSinceTag = 0;
      }
    }

    // Generate build timestamp
    const buildTime = new Date().toISOString();
    const buildTimestamp = Math.floor(Date.now() / 1000);

    // Determine version format based on branch and environment
    let versionString = baseVersion;
    let preRelease = '';
    let buildMetadata = gitShortHash;

    // Check if this is a clean release (no commits since tag and on main branch)
    const isRelease = commitsSinceTag === 0 && (gitBranch === 'main' || gitBranch === 'master');

    if (!isRelease) {
      // Determine pre-release identifier
      if (gitBranch === 'dev' || gitBranch === 'develop') {
        preRelease = `dev.${commitsSinceTag}`;
      } else if (gitBranch.startsWith('feat-') || gitBranch.startsWith('feature-')) {
        const featureName = gitBranch.replace(/^feat(ure)?-/, '');
        preRelease = `feat-${featureName}.${commitsSinceTag}`;
      } else if (gitBranch.startsWith('fix-')) {
        const fixName = gitBranch.replace(/^fix-/, '');
        preRelease = `fix-${fixName}.${commitsSinceTag}`;
      } else if (gitBranch !== 'main' && gitBranch !== 'master') {
        // Other branches
        const branchName = gitBranch.replace(/[^a-zA-Z0-9]/g, '-');
        preRelease = `${branchName}.${commitsSinceTag}`;
      } else {
        // Main branch with unreleased commits
        preRelease = `rc.${commitsSinceTag}`;
      }
    }

    // Construct full version string
    if (preRelease) {
      versionString = `${baseVersion}-${preRelease}+${buildMetadata}`;
    } else {
      versionString = `${baseVersion}+${buildMetadata}`;
    }

    // Create version object
    const versionInfo = {
      version: versionString,
      baseVersion: baseVersion,
      preRelease: preRelease || null,
      buildMetadata: buildMetadata,
      git: {
        hash: gitHash,
        shortHash: gitShortHash,
        branch: gitBranch,
        latestTag: latestTag,
        commitsSinceTag: commitsSinceTag
      },
      build: {
        timestamp: buildTimestamp,
        time: buildTime,
        isRelease: isRelease,
        environment: process.env.NODE_ENV || 'development'
      }
    };

    return versionInfo;
  } catch (error) {
    console.error('Error generating version info:', error);
    // Fallback version info
    return {
      version: '0.0.0-unknown',
      baseVersion: '0.0.0',
      preRelease: 'unknown',
      buildMetadata: 'unknown',
      git: {
        hash: 'unknown',
        shortHash: 'unknown',
        branch: 'unknown',
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

/**
 * Write version info to JSON file
 * @param {Object} versionInfo - Version metadata
 */
function writeVersionFile(versionInfo) {
  const versionPath = join(process.cwd(), 'version.json');
  writeFileSync(versionPath, JSON.stringify(versionInfo, null, 2));
  console.log(`Version info written to ${versionPath}`);
  console.log(`Generated version: ${versionInfo.version}`);
}

// Main execution
if (require.main === module) {
  const versionInfo = generateVersionInfo();
  writeVersionFile(versionInfo);
}

module.exports = { generateVersionInfo, writeVersionFile };