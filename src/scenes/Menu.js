class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload() {
        // load audio
        //this.load.audio('sfx_rocket', './assets/Laser_Shoot.wav');
        this.load.image('brick', './assets/StonePlatform.png');
    }

    create() {
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
        this.brick = this.add.tileSprite(0, 0, 800, 600, 'brick').setOrigin(0, 0);
        //show menu text
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 
            'P1: Use A&D to move & Space Bar to jump', menuConfig).setOrigin(0.5);
        
        //menuConfig.backgroundColor = '#00FF00';
        menuConfig.backgroundColor = '#c2e0ff';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding,
            'Press Space Bar to start the game!', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }

    update(){
        this.brick.tilePositionY -= 4;
        if (Phaser.Input.Keyboard.JustDown(spaceBar)) {
            /*game.settings = {
              sharkSpeed: 3,
              gameTimer: 60000    
            }*/
            console.log("checking")
            this.scene.start('playScene');
            //this.sound.play('sfx_select');
            //this.scene.start('playScene');    
        }
    }
}