var config = {
    type: Phaser.AUTO,
    width: 560,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: [Menu,Play]
};


var game = new Phaser.Game(config);
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, spaceBar;
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
