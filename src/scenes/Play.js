class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload() {
        this.load.image('tile', './assets/tile.png');
        this.load.image('platform', './assets/StonePlatform.png');
        //this.load.spritesheet('explosion', './assets/sharkexplosion.png', {frameWidth: 64, frameHeight: 32, 
            //startFrame: 0, endFrame: 6});
    }

    create() {
        // place tile sprite
        this.tile = this.add.tileSprite(0, 0, 560, 700, 'tile').setOrigin(0, 0);
        // blue UI background
        this.add.rectangle(0, borderUISize, game.config.width, (borderUISize * 2)-5, 
            0xc2e0ff).setOrigin(0, 0);
        // purple borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 
            0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height,
            0xFFFFFF).setOrigin(0, 0);
    }
    
    update(){
        this.tile.tilePositionY -= 4;
        this.createPlatform();
    }

    createPlatform(){
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(600,400, 'platform').setScale(2).refreshBody(); 
        //this.platforms.add('platform');
        //this.platforms.setscale(2);
    }
}