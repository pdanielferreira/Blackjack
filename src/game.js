/* create a new scene named "Game"
let gameScene = new Phaser.Scene('Game');




// load asset files for our game
gameScene.preload = function() {
  // load images
  this.load.image('background', 'assets/background.png');
};

// executed once, after assets were loaded
gameScene.create = function() {
  // background
  let bg = this.add.sprite(0, 0, 'background');
};




// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  scene: gameScene
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);

 */

function gerarNumero(){
    const carta1D = Math.random()*10;
    const carta2D = Math.random()*10;

    const cartaTD = carta1D+carta2D;

    document.getElementById("cartaD-1").innerText = "carta1D";
    document.getElementById("cartaD-2").innerText = "carta2D";
    document.getElementById("valorD").innerText = "cartaTD";
}