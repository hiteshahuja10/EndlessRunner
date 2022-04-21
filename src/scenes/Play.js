class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
        this.platforms;
    }

    preload() {
        this.load.image('tile', './assets/tile.png');
        this.load.image('platform', './assets/StonePlatform.png');
        this.load.image('player', './assets/sharknew.png');
        //this.load.spritesheet('explosion', './assets/sharkexplosion.png', {frameWidth: 64, frameHeight: 32, 
            //startFrame: 0, endFrame: 6});
    }

    create() {
        // place tile sprite
        this.tile = this.add.tileSprite(0, 0, 800, 600, 'tile').setOrigin(0, 0);
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
        this.player = new dude(this,610, 200, 'player');
        this.player.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.player.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.player.jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.createPlatform();
<<<<<<< HEAD
        this.physics.add.collider(player, platforms);
        
=======
        this.physics.add.collider(this.player, this.platforms); 
>>>>>>> 4bdf4f4fce6a6b3ace32ee4b77386dd946a45ef3
    }
    
    update(){
        this.tile.tilePositionY -= 4;
<<<<<<< HEAD
=======
        
        
>>>>>>> 4bdf4f4fce6a6b3ace32ee4b77386dd946a45ef3
    }

    createPlatform(){
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(600,400, 'platform').setScale(2).refreshBody();
<<<<<<< HEAD
=======
        
>>>>>>> 4bdf4f4fce6a6b3ace32ee4b77386dd946a45ef3


//this.platforms.add('platform');
        //this.platforms.setscale(2);
    }
}