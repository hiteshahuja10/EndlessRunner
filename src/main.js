var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Menu,Play]
};


let game = new Phaser.Game(config);
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, spaceBar;
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
