var Car = function (x, y, game) {
    this.initX = x;
    this.initY = y;
    this.currentSpeed = 0;
    this.maxSpeed = 300;
    this.sprite = game.add.sprite(x, y, 'car');
    this.sprite.anchor.setTo(0.4, 0.5);
    this.cursors = game.input.keyboard.createCursorKeys();

    game.physics.enable(this.sprite);
    game.camera.follow(this.sprite);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.angularVelocity = 0;
    this.sprite.body.maxAngular = 200;

}
Car.prototype.controlCar = function () {
    this.sprite.body.velocity.setTo(0, 0);

    if (this.currentSpeed != 0) {
        if (this.cursors.right.isDown) {
            this.sprite.body.angularAcceleration = 600;
        } else if (this.cursors.left.isDown) {
            this.sprite.body.angularAcceleration = -600;
        } else {
            this.sprite.body.angularVelocity = 0;
            this.sprite.body.angularAcceleration = 0;
        }

    } else {
        this.sprite.body.angularVelocity = 0;
        this.sprite.body.angularAcceleration = 0;
    }
    
    if (this.cursors.up.isDown) {
        this.currentSpeed += 5;
    } else if (this.cursors.down.isDown) {
        if (this.currentSpeed > 0) {
            this.currentSpeed -= 10;
        } else {
            this.currentSpeed -= 2;
        }
    } else {
        if (this.currentSpeed > 0) {
            this.currentSpeed -= 5;
        }

    }
    if (this.currentSpeed >= this.maxSpeed) {
        this.currentSpeed = this.maxSpeed;
    }else if(this.currentSpeed <= -(this.maxSpeed/2)){
        this.currentSpeed = -(this.maxSpeed/2);
    }


    

    this.sprite.body.velocity.copyFrom(game.physics.arcade.velocityFromRotation(this.sprite.rotation, this.currentSpeed, this.sprite.body.acceleration));

}
Car.prototype.onGrass = function (map) {

    this.currentTile = map.map.getTile(map.mapLayers['road'].getTileX(this.sprite.body.x), map.mapLayers['road'].getTileX(this.sprite.body.y), 'Road');

    if (this.currentTile === null) {
        if (this.currentSpeed != 0) {
            game.camera.shake(0.001, 100);
        }
        if (this.currentSpeed > 100) {
            this.currentSpeed -= 20;
        } else if (this.currentSpeed < -100) {
            this.currentSpeed += 20;
        }
        

        
    }
}