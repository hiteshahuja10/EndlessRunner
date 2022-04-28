class Platform extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,texture,frame){
        super(scene,x,y,texture,frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);


    }

    update(){

    }
    createPlatform(){
        this.platforms = this.physics.add.staticGroup();
        this.platforms.enableBody = true;
        this.platforms.immovable = true;
        this.platforms.setVelocityY(5);
        this.platforms.setVelocityX(0);
        this.platforms.body.setMass(2000);
        //this.platforms.body.allowGravity = false;
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
}