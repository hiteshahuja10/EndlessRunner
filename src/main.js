var config = {
    type: Phaser.AUTO,
    scale: {
        width: 560,
        height: 700,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { 
                x: 0,
                y: 0 },
            debug: false
        }
    },
    scene: [Menu,Play]
};

var menuConfig = {
    fontFamily: 'Courier',
    fontSize: '24px',
    backgroundColor: '#f1a0ff',
    color: '#1823ff',
    align: 'right',
    padding: {
    top: 5,
    bottom: 5,
    },
    fixedWidth: 0
} 

var game = new Phaser.Game(config);
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, spaceBar;
// set UI sizes
let scoreUISize = game.config.height/20;
let borderUISize = game.config.height / 60;
let borderPadding = borderUISize / 3;
