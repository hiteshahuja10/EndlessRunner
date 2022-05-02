/*
Names: Hitesh Ahuja, Andres Benitez, Nicholas Lau, Kenny Chau
Game Title: Tomb Jump
Date Completed: 5-1-22
Creative Tilt Justification: 
One programming technique that I am proud of is how we were able to randomize the spawning of the different platforms based on
a timer and change the speed of the platforms as the game progresses (as the score increases). Another programming technique that we
are proud of is how we created a player class, which allowed us to pass in different parameters for our player and allow us to
make changes to the player in different files such as play.js
One aspect of the music that we are proud of is the background music. The background music took a long time to make and
we wanted to make sure the music blended well with the game. We are also proud of our art assests including our player, which
performs different animations based on which key you press (A,D,Space). 

*/
var config = {
    type: Phaser.AUTO,
    scale: {
        width: 560,
        height: 700,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { 
                x: 0,
                y: 0 },
            debug: true
        }
    },
    scene: [Menu,Play]
};

var menuConfig = {
    fontFamily: 'Courier',
    fontSize: '24px',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    align: 'right',
    padding: {
    top: 5,
    bottom: 5,
    },
    fixedWidth: 0
} 

var game = new Phaser.Game(config);
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT, spaceBar;
// set UI sizes
let scoreUISize = game.config.height/20;
let borderUISize = game.config.height / 60;
let borderPadding = borderUISize / 3;
