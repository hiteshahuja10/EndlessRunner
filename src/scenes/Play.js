class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload() {
        this.load.image('beach', './assets/tile.png');
        this.load.image('platform', './assets/StonePlatform.png');
        //this.load.spritesheet('explosion', './assets/sharkexplosion.png', {frameWidth: 64, frameHeight: 32, 
            //startFrame: 0, endFrame: 6});
    }

    create() {
        // place tile sprite
        this.beach = this.add.tileSprite(0, 0, 640, 480, 'beach').setOrigin(0, 0);
        // blue UI background
        this.add.rectangle(0, borderUISize, game.config.width, (borderUISize * 2)-5, 
            0x00EED1).setOrigin(0, 0);
        // purple borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0x9fa8da).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 
            0x9fa8da).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0x9fa8da).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height,
            0x9fa8da).setOrigin(0, 0);
    }  

    createPlatform(){
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(600,400, 'platform');
    }
}