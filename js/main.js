(() => {
  const WIDTH = 1920;
  const HEIGHT = 1080;

  const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: "#1e1e1e", // dark backdrop (optional)
    parent: document.body,
    // Keep it literal 1920x1080 (no scaling). Change scale mode later if you want Fit.
    scene: { create },
  };

  new Phaser.Game(config);

  function create() {
    // "Gray box" (placeholder) — size and color you can tweak anytime
    const boxW = 1920;
    const boxH = 1080;
    const x = (this.scale.width - boxW) / 2;
    const y = (this.scale.height - boxH) / 2;

    const g = this.add.graphics();
    g.fillStyle(0x808080, 1); // mid gray
    g.fillRect(x, y, boxW, boxH);

    // Optional: an outline to make it feel “boxy”
    g.lineStyle(4, 0xb0b0b0, 1);
    g.strokeRect(x, y, boxW, boxH);

    // Optional debug text
    this.add.text(16, 16, "Phaser boilerplate — 1920x1080\nGray box centered", {
      fontFamily: "ui-monospace, Menlo, Consolas, monospace",
      fontSize: "20px",
      color: "#cfd8dc",
    });
  }
})();
