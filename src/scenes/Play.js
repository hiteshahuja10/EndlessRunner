class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
        this.platforms;
        this.spikes;
        this.coin;
        this.gameOver = false;
    }

    preload() {
        this.load.image('tile', './assets/Tile.png');
        this.load.image('platform', './assets/StonePlatform.png');
        this.load.image('player', './assets/player.png');
        this.load.image('spike','./assets/Spikes.png');
        this.load.image('spike1','./assets/Spikes1.png');
        this.load.image('lava', './assets/Lava.png');
        this.load.image('shark', './assets/coin_placeholder.png');
        this.load.spritesheet('leftrun', './assets/Player_LeftRun.png',{frameWidth:53, frameHeight:75, startFrame:0, endFrame:4});
        this.load.spritesheet('rightrun', './assets/Play_RightRun.png',{frameWidth:53, frameHeight:75, startFrame:0, endFrame:4});
        this.load.spritesheet('vibing', './assets/Player.png',{frameWidth:53, frameHeight:75, startFrame:0, endFrame:0} )
        //this.load.spritesheet('explosion', './assets/sharkexplosion.png', {frameWidth: 64, frameHeight: 32, 
            //startFrame: 0, endFrame: 6});
    }

    create() {
        // place tile sprite
        this.tile = this.add.tileSprite(0, 0, 560, 700, 'tile').setOrigin(0, 0);
        // blue UI background
        this.add.rectangle(0, borderUISize, game.config.width, (scoreUISize * 2)-5, 
            0xc2e0ff).setOrigin(0, 0);

        // purple borders
        //game.config.width
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 
            0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height,
            0xFFFFFF).setOrigin(0, 0);
        this.player = new dude(this,300, 500, 'player');
        //this.coin = this.add.sprite(0, 0, 100, 400, 'shark');
        //this.shark = new dude(this,100,300, 'shark');
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#f1a0ff',
            color: '#1823ff',
            align: 'right',
            padding: {
            //top: 2,
            //bottom: 2,
            },
            fixedWidth: 100
        }
        this.p1Score = 0;
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding, 
            this.p1Score, scoreConfig);
        //this.gameTime = this.add.text(game.config.width/2-20, borderUISize + borderPadding, this.game_time, timeConfig);
        this.player.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.player.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.player.jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.createPlatform();
        this.physics.add.collider(this.player, this.platforms); 
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.lava = this.physics.add.staticGroup();
        this.spikes.create(280,650, 'lava');
        this.coin.create(100,300,'shark');
        this.coin.create(400,300,'shark');
        this.anims.create({
            key: 'leftrun',
            frames: this.anims.generateFrameNumbers('leftrun', { start: 0, end: 3, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'rightrun',
            frames: this.anims.generateFrameNumbers('rightrun', { start: 0, end: 3, first: 0}),
            frameRate: 30
        });
        this.anims.create({
            key: 'vibing',
            frames: this.anims.generateFrameNumbers('vibing', { start: 0, end: 0, first: 0}),
            frameRate: 30
        });

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
        if (this.player.gameOver == true){
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
        this.physics.add.overlap(this.player, this.coin, this.PlayerCollectCoin, null, this); 
        if(this.player.gameOver != true){
          this.player.update();    
        }
    }
    

    createPlatform(){
        this.platforms = this.physics.add.staticGroup();
        this.spikes = this.physics.add.staticGroup();
        this.coin = this.physics.add.staticGroup();
        this.platforms.create(300,600, 'platform').setScale(2).refreshBody();
        this.platforms.create(500,600, 'platform').setScale(2).refreshBody();
        this.platforms.create(100,600, 'platform').setScale(2).refreshBody();
        this.platforms.create(500,450,'platform').refreshBody();
        this.platforms.create(100,450, 'platform').refreshBody();
        this.platforms.create(300,350, 'platform').refreshBody();
        this.platforms.create(150,450, 'platform').refreshBody();
        this.spikes.create(300,400,'spike').setScale(2).refreshBody();
        this.spikes.create(70,200,'spike1').setScale(2).refreshBody();
    }

    PlayerCollectCoin(player,coin){
        coin.disableBody(true,true);
        this.p1Score += 1;
        this.scoreLeft.text = this.p1Score;
    }

    PlayerHitSpikes(player, spikes){
        console.log("touching spikes");
        player.gameOver = true;
        player.death();
        player.left = 0;
        player.right=0;
        player.jump = 0;

    }
}