class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
        this.platforms;
        this.spikes;
        this.coin;
        this.lava;
        this.title;
        this.timer;
        this.gameOver = false;
    }

    preload() {
        this.load.image('tile', './assets/Tile.png');
        this.load.image('platform', './assets/StonePlatform.png');
        this.load.image('player', './assets/player.png');
        this.load.image('spike','./assets/Spikes.png');
        this.load.image('spike1','./assets/Spikes1.png');
        this.load.image('downspike','./assets/Spike_Down.png');
        this.load.image('lava', './assets/Lava.png');
        this.load.image('coin', './assets/coin.png');
        this.load.spritesheet('death_animation', './assets/DeathAnimation.png',{frameWidth:53, frameHeight:75, startFrame:0, endFrame:13});
        this.load.spritesheet('leftrun', './assets/Player_LeftRun.png',{frameWidth:53, frameHeight:75, startFrame:0, endFrame:4});
        this.load.spritesheet('rightrun', './assets/Play_RightRun.png',{frameWidth:53, frameHeight:75, startFrame:0, endFrame:4});
        this.load.spritesheet('vibing', './assets/Player.png',{frameWidth:53, frameHeight:75, startFrame:0, endFrame:0} )
    }

    create() {
        this.music = this.sound.add('sfx_music');
        this.music.loop = true;
        this.music.play();
        this.level = 2;
        this.vel = 50;
        this.num = 0;
        this.test = 0;
        // place tile sprite
        this.tile = this.add.tileSprite(0, 0, 560, 700, 'tile').setOrigin(0, 0);
        this.sfxCoin = this.sound.add('sfx_coinpick');
        // blue UI background
        this.title = this.add.rectangle(0, borderUISize, game.config.width, (scoreUISize * 2)-5, 
            0xc2e0ff).setOrigin(0, 0);
        this.title = this.add.group();

        this.player = new dude(this,300, 425, 'player');
        this.player.body.gravity.y = 500;
        //this.title.body.setCollideWorldBounds(true);
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '50px',
            backgroundColor: '#f1a0ff',
            color: '#1823ff',
            align: 'center',
            padding: {
            //top: 2,
            //bottom: 2,
            },
            fixedWidth: 100
        }
        this.p1Score = 0;

        //this.gameTime = this.add.text(game.config.width/2-20, borderUISize + borderPadding, this.game_time, timeConfig);
        this.player.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.player.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.player.jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.Left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.platforms = this.add.group();
        this.coin = this.add.group();
        this.spikes = this.add.group();

        this.physics.add.collider(this.player, this.platforms); 
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.lava = this.physics.add.staticGroup();
        this.anims.create({
            key:'death_animation',
            frames: this.anims.generateFrameNumbers('death_animation', { start: 0, end: 13, first: 0}),
            framerate: 30
        });
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
        this.physics.add.collider(this.platforms, this.lava, this.platformHitLava);
        this.physics.add.collider(this.player, this.spikes, this.PlayerHitSpikes);
        this.physics.add.collider(this.player, this.lava, this.PlayerHitSpikes);
        //this.physics.add.collider(this.player, this.title, this.PlayerHitSpikes); 
        this.physics.add.overlap(this.player, this.coin, this.PlayerCollectCoin, null, this);
        

        this.createPlatform(300,500,50);
        this.createPlatform(this.randomNumberX(600), 300, 50);
        
        this.time.addEvent({
            delay: 1500,
            callback: () =>{
                if (this.p1Score >= this.level){
                    this.vel *= 2;
                    this.level *= 2;
                    this.createPlatform(this.randomNumberX(600), 100, this.vel);
                }
                else{
                    this.createPlatform(this.randomNumberX(600), 100, this.vel);
                }
            },
            loop: true
        })
        this.lava.create(280,675, 'lava');

        this.scoreLeft = this.add.text(borderUISize + borderPadding*54, borderUISize + borderPadding, 
                this.p1Score, scoreConfig);
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 
            0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height,
            0xFFFFFF).setOrigin(0, 0);
    }
    
    update(){
        if (this.player.gameOver == true){
            this.music.loop = false;
            this.music.stop();
            this.check = this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu',
                menuConfig).setOrigin(0.5);
            if (Phaser.Input.Keyboard.JustDown(keyR)){
                this.scene.restart();
            }
            if (Phaser.Input.Keyboard.JustDown(this.Left)){
                this.scene.start('menuScene');
            }
        }
        this.tile.tilePositionY -= 4;
        if(this.player.gameOver != true){
          this.player.update();    
        }
    }
    
    createPlatform(x,y, velocity){
        let test = this.random(1, 2);
        //let size = this.random(1, 2);
        console.log(test);
        let tile = this.physics.add.sprite(x,y,'platform').setScale(2);
        tile.body.immovable = true;
        tile.body.allowGravity = false;
        tile.body.setVelocityY(velocity);
        this.platforms.add(tile);
        let coin = this.physics.add.sprite(x,y-50,'coin').setScale(1);
        coin.body.immovable = true;
        coin.body.allowGravity = false;
        coin.body.setVelocityY(velocity);
        this.coin.add(coin);
        if(test % 2 == 0) {
            if (x != 300 && y != 600){
                let spikes = this.physics.add.sprite(x,y+44,'downspike').setScale(1.75);
                spikes.body.immovable = true;
                spikes.body.allowGravity = false;
                spikes.body.setVelocityY(velocity);
                this.spikes.add(spikes);
            }
        }
    }

    randomNumberX(num){
        let output = Math.floor(Math.random() * num);
        while (output < 100 || output > 500){
            output = Math.floor(Math.random() * num);
        }

        return output;
    }

    /*randomNumberY(num){
        let output = Math.floor(Math.random() * num);
        while (output < 100 || output > 500){
            output = Math.floor(Math.random() * num);
        }
        return output;
        //return Math.floor(Math.random() * num);
    }*/

    PlayerCollectCoin(player,coin){
        coin.disableBody(true,true);
        this.sfxCoin.play();
        this.p1Score += 1;
        this.scoreLeft.text = this.p1Score;
    }

    PlayerHitSpikes(player, spikes){
        console.log("touching spikes");
        player.gameOver = true;
        player.death();
        player.left = 0;
        player.right= 0;
        player.jump = 0;

    }

    platformHitLava(platform, lava){
        //console.log("platform hit lava");
        //this.createPlatform(100,300);
        //checking
        platform.destroy();
    }
    random(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}