class dude extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.left;
        this.right;
        this.jump;
    
        this.setCollideWorldBounds(true);
    }

  update(){
    if(this.left.isDown){
        this.setVelocityX(-160);

        //add animation line here for when facing left
    }
    if(this.right.isDown){
        this.setVelocityX(160);

        //add animation line here for when facing left
    }

    if(Phaser.Input.Keyboard.JustDown(jump) && this.body.touching.down ){ // add checking to see if its on the floor befoe jumping or else it will keep jumping
        this.setVelocityY(-330);

        //add animation for jumping here
    }

  }

}