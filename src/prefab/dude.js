class dude extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.left;
        this.right;
        this.jump;
        this.setScale(1);
    
        this.setCollideWorldBounds(true);
        this.setBounce(0.2);
        this.setVelocityX(0,0)

        this.sfxDude = scene.sound.add('sfx_jump');
    }

  update(){
    this.setVelocityX(0);
    if(this.left.isDown){
        this.setVelocityX(-160);

        //add animation line here for when facing left
    }
    if(this.right.isDown){
        this.setVelocityX(160);

        //add animation line here for when facing left
    }

    if(Phaser.Input.Keyboard.JustDown(this.jump) && this.body.touching.down ){ // add checking to see if its on the floor befoe jumping or else it will keep jumping
        this.setVelocityY(-330);
        this.sfxDude.play();

        //add animation for jumping here
    }

  }

}