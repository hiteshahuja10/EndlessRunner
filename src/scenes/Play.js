class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
        this.platforms;
        this.spikes;
        this.gameOver = false;
    }

    preload() {
        this.load.image('tile', './assets/tile.png');
        this.load.image('platform', './assets/StonePlatform.png');
        this.load.image('player', './assets/alien.png');
        this.load.image('spike','./assets/Spikes.png');
        this.load.image('spike1','./assets/Spikes1.png');
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
        this.player = new dude(this,300, 500, 'player');
        this.player.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.player.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.player.jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.createPlatform();
        this.physics.add.collider(this.player, this.platforms); 
        //this.physics.add.collider(this.player, this.spikes);
        //this.physics.add.collider(this.player, this.spikes);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.lava = this.physics.add.staticGroup();
        this.platforms.create(280,650, 'lava');
    }
    
    update(){
        let menuConfig = {
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
        //this.gameOver = true;
        if (this.gameOver){
            console.log("game over screen")
            this.check = this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu',
                menuConfig).setOrigin(0.5);
            if (Phaser.Input.Keyboard.JustDown(keyR)){
                console.log("jell0");
                this.scene.restart();
            }
        }
        this.tile.tilePositionY -= 4;
        this.physics.add.collider(this.player, this.spikes, this.PlayerHitSpikes);
        this.physics.add.collider(this.player, this.lava, this.PlayerHitSpikes);
        this.player.update();    
    }
    

    createPlatform(){
        this.platforms = this.physics.add.staticGroup();
        this.spikes = this.physics.add.staticGroup()
        this.platforms.create(300,600, 'platform').setScale(2).refreshBody();
        this.platforms.create(500,600, 'platform').setScale(2).refreshBody();
        this.platforms.create(100,600, 'platform').setScale(2).refreshBody();
        this.platforms.create(500,450,'platform').refreshBody();
        this.platforms.create(100,450, 'platform').refreshBody();
        this.platforms.create(300,350, 'platform').refreshBody();
        this.platforms.create(150,250, 'platform').refreshBody();
        this.spikes.create(300,400,'spike').setScale(3).refreshBody();
        this.spikes.create(70,200,'spike1').setScale(2).refreshBody();
        
        
    }

    PlayerHitSpikes( player, spikes){
        console.log("touching spikes");
        this.gameOver = true;
        player.death();

    }
}