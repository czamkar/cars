var Labels = function (game, map) {
    this.map = map;
    this.createLabel();
}
Labels.prototype.createLabel = function () {
    this.checkpoints = game.add.text(20, 20, "Checkpoint " + game.currentCheckpoint + "/" + this.map.checkpoints.length, {
        font: "24px Comic Sans MS",
        fill: "#ffffff",
        align: "left"
    });
    this.checkpoints.fixedToCamera = true;
    this.checkpoints.anchor.x = 0;

    this.laps = game.add.text(game.width - 20, 20, "Laps " + game.currentLap + "/" + game.laps, {
        font: "24px Comic Sans MS",
        fill: "#ffffff",
        align: "left"
    });
    this.laps.fixedToCamera = true;
    this.laps.anchor.x = 1;

    this.timer = game.add.text(game.width / 2, 20, "Time: 00:00:00", {
        font: "24px Comic Sans MS",
        fill: "#ffffff",
        align: "left"
    });
    this.timer.fixedToCamera = true;
    this.timer.setTextBounds(-90, 0, 180, 100);
}