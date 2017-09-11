var Car = function (x, y, game) {
    this.initX = x;
    this.initY = y;
    this.sprite = game.add.sprite(x, y, 'car');
    this.sprite.anchor.setTo(0.4, 0.5);
    this.cursors = game.input.keyboard.createCursorKeys();

    game.physics.enable(this.sprite);
    game.camera.follow(this.sprite);
    this.sprite.body.collideWorldBounds = true;

}
Car.prototype.controlCar = function () {
    this.sprite.body.velocity.setTo(0, 0);
    this.sprite.body.angularVelocity = 0;

    if (this.cursors.up.isDown) {
        this.sprite.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(this.sprite.angle, 300));
    } else if (this.cursors.down.isDown) {
        this.sprite.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(this.sprite.angle, -200));
    }
    if (this.sprite.body.velocity.x != 0 || this.sprite.body.velocity.y != 0) {
        if (this.cursors.right.isDown) {
            this.sprite.body.angularVelocity = 200;
        } else if (this.cursors.left.isDown) {
            this.sprite.body.angularVelocity = -200;
        }
    }

}
Car.prototype.onGrass = function (map) {

    this.currentTile = map.map.getTile(map.mapLayers['road'].getTileX(this.sprite.body.x), map.mapLayers['road'].getTileX(this.sprite.body.y), 'Road');
    if (this.currentTile === null) {
        if (this.sprite.body.velocity.x != 0 || this.sprite.body.velocity.y != 0) {
            this.sprite.body.velocity.x /= 3;
            this.sprite.body.velocity.y /= 3;

            game.camera.shake(0.001, 100);
        }
    }
}