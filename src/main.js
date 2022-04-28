var config = {
    type: Phaser.AUTO,
    width: 560,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { 
                x: 0,
                y: 0 },
            debug: true
        }
    },
    scene: [Menu,Play]
};


var game = new Phaser.Game(config);
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, spaceBar;
// set UI sizes
let scoreUISize = game.config.height/20;
let borderUISize = game.config.height / 60;
let borderPadding = borderUISize / 3;
