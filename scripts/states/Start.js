var Start = function (game) {

};
Start.prototype = {
    preload: function () {
        game.load.image('button', 'assets/buttons/btn1.png');
        game.load.image('car', 'assets/images/car5_blue.png');

    },
    create: function () {


        this.title = game.add.text(game.width / 2, 20, "Game Racer", {
            font: "72px Comic Sans MS",
            fill: "#ffffff",
            align: "center"
        });
        this.title.anchor.x = 0.5;

        this.startText = game.add.text(game.width / 2, 220, "Start", {
            font: "32px Comic Sans MS",
            fill: "#ffffff",
            align: "center"
        });
        this.startText.anchor.x = 0.5;

        this.startText.events.onInputDown.add(this.down, this);
        this.startText.inputEnabled = true;

        car1 = game.add.sprite(game.rnd.integerInRange(0, game.width), game.rnd.integerInRange(0, game.height), 'car');
        car1.alpha = 0.6;
        car2 = game.add.sprite(game.rnd.integerInRange(0, game.width), game.rnd.integerInRange(0, game.height), 'car');
        car2.alpha = 0.6;       
        car3 = game.add.sprite(game.rnd.integerInRange(0, game.width), game.rnd.integerInRange(0, game.height), 'car');
        car3.alpha = 0.6;    
        car4 = game.add.sprite(game.rnd.integerInRange(0, game.width), game.rnd.integerInRange(0, game.height), 'car');
        car4.alpha = 0.6;    
        car5 = game.add.sprite(game.rnd.integerInRange(0, game.width), game.rnd.integerInRange(0, game.height), 'car');
        car5.alpha = 0.6;    
        /*
        this.button = game.add.button(game.world.centerX / 2, 150, 'button', this.start);
        this.button.anchor.x = 0.5;*/
    },
    down: function () {
        game.state.start("Play");

    },
    start: function () {
        game.state.start("Play");
    },
    update: function () {
        car1.x += game.rnd.integerInRange(2, 5);
        car2.x += game.rnd.integerInRange(2, 5);
        car3.x += game.rnd.integerInRange(2, 5);
        car4.x += game.rnd.integerInRange(2, 5);
        car5.x += game.rnd.integerInRange(2, 5);
            if (car1.x > game.width)
            {
                car1.x = 0;
            }
            if (car2.x > game.width)
            {
                car2.x = 0;
            }
            if (car3.x > game.width)
            {
                car3.x = 0;
            }
            if (car4.x > game.width)
            {
                car4.x = 0;
            }
            if (car5.x > game.width)
            {
                car5.x = 0;
            }
    }
}