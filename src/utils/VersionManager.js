/**
 * @fileoverview Version display and management utility
 * @description Handles version display in-game with professional styling
 * Skill Level: Beginner-friendly
 */

/**
 * Version display manager for in-game version information
 * @class
 */
export class VersionManager {
  /**
   * Initialize version manager with Phaser scene
   * @param {Phaser.Scene} scene - Phaser scene to attach version display
   */
  constructor(scene) {
    this.scene = scene;
    this.versionInfo = this.getVersionInfo();
    this.versionText = null;
    this.detailsModal = null;
    this.isModalVisible = false;
  }

  /**
   * Get version information from build-time injection
   * @returns {Object} Version information object
   */
  getVersionInfo() {
    // Access build-time injected version info
    if (typeof __VERSION_INFO__ !== 'undefined') {
      return __VERSION_INFO__;
    }

    // Fallback for environments where version info isn't available
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

  /**
   * Create version display in bottom-left corner
   */
  create() {
    const versionString = `v${this.versionInfo.version}`;

    // Get environment-specific styling
    const style = this.getVersionStyle();

    // Create version text in bottom-left corner
    this.versionText = this.scene.add.text(16, this.scene.scale.height - 32, versionString, style);
    this.versionText.setDepth(1000); // Ensure it's always on top
    this.versionText.setScrollFactor(0); // Don't scroll with camera

    // Make version text interactive
    this.versionText.setInteractive({ useHandCursor: true });
    this.versionText.on('pointerdown', () => this.toggleDetailsModal());
    this.versionText.on('pointerover', () => this.onVersionHover());
    this.versionText.on('pointerout', () => this.onVersionOut());

    // Create details modal (initially hidden)
    this.createDetailsModal();
  }

  /**
   * Get styling based on build environment
   * @returns {Object} Phaser text style configuration
   */
  getVersionStyle() {
    const baseStyle = {
      fontFamily: 'ui-monospace, Menlo, Consolas, monospace',
      fontSize: '14px',
      padding: { x: 8, y: 4 },
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      borderRadius: 4
    };

    // Color coding based on environment/branch
    if (this.versionInfo.build.isRelease) {
      // Production release - green
      return { ...baseStyle, color: '#4ade80', backgroundColor: 'rgba(34, 197, 94, 0.1)' };
    } else if (this.versionInfo.git.branch === 'dev') {
      // Development - blue
      return { ...baseStyle, color: '#60a5fa', backgroundColor: 'rgba(59, 130, 246, 0.1)' };
    } else if (this.versionInfo.git.branch.startsWith('feat-')) {
      // Feature branch - purple
      return { ...baseStyle, color: '#a78bfa', backgroundColor: 'rgba(139, 92, 246, 0.1)' };
    } else {
      // Other branches - orange
      return { ...baseStyle, color: '#fb923c', backgroundColor: 'rgba(251, 146, 60, 0.1)' };
    }
  }

  /**
   * Handle version text hover
   */
  onVersionHover() {
    this.versionText.setAlpha(0.8);

    // Show brief tooltip
    const tooltip = this.scene.add.text(
      this.versionText.x,
      this.versionText.y - 30,
      'Click for build info',
      {
        fontFamily: 'ui-monospace, Menlo, Consolas, monospace',
        fontSize: '12px',
        color: '#ffffff',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: { x: 6, y: 3 },
        borderRadius: 3
      }
    );
    tooltip.setDepth(1001);
    tooltip.setScrollFactor(0);

    // Remove tooltip after delay
    this.scene.time.delayedCall(2000, () => {
      if (tooltip) {
        tooltip.destroy();
      }
    });
  }

  /**
   * Handle version text mouse out
   */
  onVersionOut() {
    this.versionText.setAlpha(1.0);
  }

  /**
   * Create detailed build information modal
   */
  createDetailsModal() {
    // Modal background (initially hidden)
    this.modalBackground = this.scene.add.graphics();
    this.modalBackground.fillStyle(0x000000, 0.8);
    this.modalBackground.fillRect(0, 0, this.scene.scale.width, this.scene.scale.height);
    this.modalBackground.setDepth(999);
    this.modalBackground.setScrollFactor(0);
    this.modalBackground.setVisible(false);

    // Set interactive with explicit hit area for the full screen
    this.modalBackground.setInteractive(
      new Phaser.Geom.Rectangle(0, 0, this.scene.scale.width, this.scene.scale.height),
      Phaser.Geom.Rectangle.Contains
    );
    this.modalBackground.on('pointerdown', () => this.hideDetailsModal());

    // Modal content panel
    const panelWidth = 400;
    const panelHeight = 300;
    const panelX = (this.scene.scale.width - panelWidth) / 2;
    const panelY = (this.scene.scale.height - panelHeight) / 2;

    this.modalPanel = this.scene.add.graphics();
    this.modalPanel.fillStyle(0x1e1e1e, 1);
    this.modalPanel.lineStyle(2, 0x4a5568);
    this.modalPanel.fillRoundedRect(panelX, panelY, panelWidth, panelHeight, 8);
    this.modalPanel.strokeRoundedRect(panelX, panelY, panelWidth, panelHeight, 8);
    this.modalPanel.setDepth(1000);
    this.modalPanel.setScrollFactor(0);
    this.modalPanel.setVisible(false);

    // Modal text content
    const buildDate = new Date(this.versionInfo.build.time).toLocaleString();
    const detailsText = [
      'BUILD INFORMATION',
      '',
      `Version: ${this.versionInfo.version}`,
      `Branch: ${this.versionInfo.git.branch}`,
      `Commit: ${this.versionInfo.git.shortHash}`,
      `Built: ${buildDate}`,
      `Environment: ${this.versionInfo.build.environment}`,
      '',
      `Commits since tag: ${this.versionInfo.git.commitsSinceTag}`,
      `Latest tag: ${this.versionInfo.git.latestTag}`,
      '',
      'Click anywhere to close'
    ].join('\n');

    this.modalText = this.scene.add.text(panelX + 20, panelY + 20, detailsText, {
      fontFamily: 'ui-monospace, Menlo, Consolas, monospace',
      fontSize: '12px',
      color: '#e2e8f0',
      lineSpacing: 4
    });
    this.modalText.setDepth(1001);
    this.modalText.setScrollFactor(0);
    this.modalText.setVisible(false);
  }

  /**
   * Toggle build details modal visibility
   */
  toggleDetailsModal() {
    if (this.isModalVisible) {
      this.hideDetailsModal();
    } else {
      this.showDetailsModal();
    }
  }

  /**
   * Show build details modal
   */
  showDetailsModal() {
    this.modalBackground.setVisible(true);
    this.modalPanel.setVisible(true);
    this.modalText.setVisible(true);
    this.isModalVisible = true;
  }

  /**
   * Hide build details modal
   */
  hideDetailsModal() {
    this.modalBackground.setVisible(false);
    this.modalPanel.setVisible(false);
    this.modalText.setVisible(false);
    this.isModalVisible = false;
  }

  /**
   * Update version display position (call on resize)
   */
  updatePosition() {
    if (this.versionText) {
      this.versionText.setPosition(16, this.scene.scale.height - 32);
    }
  }

  /**
   * Get current version string
   * @returns {string} Current version string
   */
  getVersionString() {
    return this.versionInfo.version;
  }

  /**
   * Check if this is a development build
   * @returns {boolean} True if development build
   */
  isDevelopmentBuild() {
    return !this.versionInfo.build.isRelease;
  }

  /**
   * Get build environment
   * @returns {string} Build environment name
   */
  getBuildEnvironment() {
    return this.versionInfo.build.environment;
  }

  /**
   * Destroy version display elements
   */
  destroy() {
    if (this.versionText) {
      this.versionText.destroy();
    }
    if (this.modalBackground) {
      this.modalBackground.destroy();
    }
    if (this.modalPanel) {
      this.modalPanel.destroy();
    }
    if (this.modalText) {
      this.modalText.destroy();
    }
  }
}