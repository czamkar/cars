var PlayState = function (game) {

};

PlayState.prototype = {
    preload: function () {

        game.load.image('car', 'assets/images/car5_blue.png');
        game.load.image('bg', 'assets/images/bg.png');
        game.load.image('tiles', 'assets/images/tiles.png');
        game.load.tilemap('map', 'assets/maps/map.json', null, Phaser.Tilemap.TILED_JSON);

    },
    create: function () {
        game.physics.startSystem(Phaser.Physics.Arcade);

        this.boom = game.add.audio('boom');
        this.win = game.add.audio('win');

        this.map = new Map(game);
        this.map.createMap();
        this.car = new Car(game.width / 2, game.height / 2, game);

        // Różne
        this.background = game.add.sprite(0, 0, 'bg');
        this.background.fixedToCamera = true;
        this.background.visible = false;

        game.currentCheckpoint = 0;
        game.currentLap = 1;
        game.laps = 1;
        this.labels = new Labels(game, this.map);

        game.timer = game.time.events.loop(10, this.timerFormat, this);
        game.raceTime = 0;

    },
    timerFormat: function () {
        game.raceTime++;

        var date = new Date(null);
        date.setSeconds(game.raceTime);

        this.labels.timer.setText("Time: " + date.toISOString().substr(11, 8));
    },
    checkIfTileIsCheckpoint: function (x, y) {
        if (x === this.map.checkpoints[game.currentCheckpoint]['x'] && y === this.map.checkpoints[game.currentCheckpoint]['y']) {
            console.log(x + "|" + y);
            this.nextCheckpoint();
        }
    },
    nextCheckpoint: function () {
        game.currentCheckpoint++;

        if (game.currentCheckpoint === this.map.checkpoints.length) {
            game.currentCheckpoint = 0;
            this.nextLap();
        }
        this.labels.checkpoints.setText("Checkpoint " + game.currentCheckpoint + "/" + this.map.checkpoints.length);
    },
    nextLap: function () {
        game.currentLap++;
        if (game.currentLap > game.laps) {
            this.finish();
        } else {
            this.labels.laps.setText("Laps " + game.currentLap + "/" + game.laps);
        }
    },
    finish: function () {
        this.background.visible = true;

        this.labels.finish = game.add.text(game.width / 2, 300, "FINISH!", {
            font: "72px Comic Sans MS",
            fill: "#ffffff",
            align: "center"
        });
        this.labels.finish.anchor.x = 0.5;
        this.labels.finish.fixedToCamera = true;
        this.labels.finish.setShadow(0, 0, 'rgba(0,0,0,0.5)', 15);

        this.labels.score = game.add.text(game.width / 2, 400, this.labels.timer.text, {
            font: "48px Comic Sans MS",
            fill: "#ffffff",
            align: "center"
        });
        this.labels.score.anchor.x = 0.5;
        this.labels.score.fixedToCamera = true;
        this.labels.score.setShadow(0, 0, 'rgba(0,0,0,0.5)', 15);

        this.labels.laps.visible = false;
        this.labels.checkpoints.visible = false;
        this.labels.timer.visible = false;

        game.time.events.remove(game.timer);
        game.paused = true;
    },
    update: function () {
        this.car.controlCar();

        game.physics.arcade.collide(this.car.sprite, this.map.mapLayers['collision']);

        this.car.onGrass(this.map);
        this.checkIfTileIsCheckpoint(this.map.mapLayers['road'].getTileX(this.car.sprite.x), this.map.mapLayers['road'].getTileY(this.car.sprite.y));
    },
    render: function () {
        game.debug.spriteInfo(this.car.sprite, 32, 32);
        game.debug.body(this.car.sprite);
        game.debug.text('angularVelocity ' + this.car.sprite.body.angularVelocity, 32, 148);
        game.debug.text('angularAcceleration ' + this.car.sprite.body.angularAcceleration, 32, 168);
        game.debug.text('Acceleration ' + this.car.sprite.body.angularAcceleration, 32, 188);
        game.debug.text('Velocity ' + this.car.sprite.body.velocity, 32, 208);
        game.debug.text('currentspeed ' + this.car.currentSpeed, 32, 228);

    }
}