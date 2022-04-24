class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
        this.platforms;
        this.spikes;
        
    }

    preload() {
        this.load.image('tile', './assets/tile.png');
        this.load.image('platform', './assets/StonePlatform.png');
        this.load.image('player', './assets/alien.png');
        this.load.image('spike','./assets/Spikes.png')
        this.load.image('lava', './assets/Lava.png');
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
        this.player = new dude(this,300, 400, 'player');
        this.player.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.player.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.player.jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.createPlatform();
        this.physics.add.collider(this.player, this.platforms); 
        this.physics.add.collider(this.player, this.spikes);

        this.lava = this.physics.add.staticGroup();
        this.platforms.create(280,650, 'lava');
    }
    
    update(){
        this.tile.tilePositionY -= 4;
        this.player.update();    
    }
    

    createPlatform(){
        this.platforms = this.physics.add.staticGroup();
        this.spikes = this.physics.add.staticGroup()
        this.platforms.create(300,600, 'platform').setScale(2).refreshBody();
        this.platforms.create(500,600, 'platform').setScale(2).refreshBody();
        this.platforms.create(100,600, 'platform').setScale(2).refreshBody();
        this.platforms.create(100,450, 'platform').refreshBody();
        this.platforms.create(300,350, 'platform').refreshBody();
        this.spikes.create(300,400,'spike').setScale(2).refreshBody();
        
        
    }
}