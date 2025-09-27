import Phaser from "phaser";
import { VersionManager } from "./utils/VersionManager.js";

const WIDTH = 1920,
  HEIGHT = 1080;

const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  backgroundColor: "#1e1e1e",
  parent: document.body,
  scene: { create },
};

new Phaser.Game(config);

function create() {
  const boxW = 1280,
    boxH = 720;
  const x = (this.scale.width - boxW) / 2;
  const y = (this.scale.height - boxH) / 2;

  const g = this.add.graphics();
  g.fillStyle(0x808080, 1);
  g.fillRect(x, y, boxW, boxH);
  g.lineStyle(4, 0xb0b0b0, 1);
  g.strokeRect(x, y, boxW, boxH);

  // Initialize version manager and create version display
  this.versionManager = new VersionManager(this);
  this.versionManager.create();

  // Get actual version for title
  const versionString = this.versionManager.getVersionString();

  this.add.text(16, 16, `Project Sanctum: ${versionString}`, {
    fontFamily: "ui-monospace, Menlo, Consolas, monospace",
    fontSize: "20px",
    color: "#cfd8dc",
  });
}
