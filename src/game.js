import carta from "./assets/cardBack_green5.png";
import left from "./assets/arrowSilver_left.png";
import right from "./assets/arrowSilver_right.png";
import buy from "./assets/buy.png";
import swal from 'sweetalert';

/*
TODOS OS SIMBOLOS PERMITIDOS
 */
const simbolos = [
    'Espadas',
    'Coracoes',
    'Ouros',
    'Diamantes'
]

/*
TODOS OS VALOR POSSIVEIS
 */
const cartaValor = [
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'
]

/*
OBTEM A CARTA DOS ASSETS
 */
const obterNomeCarta = (simbolo, valor) => {
    setPoints(simbolo, valor);
    return 'cards${simbolo}${valor}'
}

let cartas = []; //ARRAY DE CARTAS
let score = []; //ARRAY DE PONTOS

/*
CONFIG PHASER
 */
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  }
};

/*
CONFIG DE TAMANHO
 */
const width = 800;
const height = 600;
const x = width*0.5;  //centra
const y = height*0.5; //centra
let nomeCarta = "";
let pontos;
let dicas;

/*
INICIAÇÃO DO JOGO
 */
const game = new Phaser.Game(config);

/*
Função para gerar valor random dos simbolos das cartas
 */
function gerarSimbolo(){
  var randomSimbolo = Math.floor(Math.random()*simbolos.length);  //Escolhe um simbolo aleatorio tendo em conta o array
  return simbolos[randomSimbolo];                                 //Devolve o simbolo gerado
}

/*
Função para gerar valor random dos números das cartas
 */
function gerarNumero(){
  var randomValor = Math.floor(Math.random()*cartaValor.length);   //Escolhe uma carta aleatoria tendo em conta o array
  if(randomValor < 0){                                              //Se o nº gerado menor que 0
    return cartaValor[0];                                           //Devolve sempre o valor na posição 0 (nº 2)
  }

  return cartaValor[randomValor];                                   //Devolve o valor gerado
}

/*
FUNÇÃO PARA OBTER A CARTA ESPECIFICA EX: 2 COPAS
 */
function cartaAtual(){
  return obterNomeCarta(gerarSimbolo(), gerarNumero());
}

/*
FUNÇÃO PRELOAD
 */
function preload(){
    this.load.image["card-back", card];
    this.load.image["cursor", cursor];
    this.load.image["left", left];
    this.load.image["rifgt", right];
}

/*
Definição do score e das dicas
 */
pontos = this.add.text(x - 300, y - 200, "Pontos: 0");
dicas = this.add.text(x - 300, y - 220, "");

/*
FUNÇÃO CREATED
 */
function created(){
  console.log("Executado com sucesso");         //Permite ver a consola se iniciou corretamente

  if(this.textures.exists(nomeCarta)){
      return this.image(x, y, nomeCarta)
  }

  let cartaTras = this.image(x, y, 'card-back');

/*
Utilização das setas do teclado
 */
let left = this.add.image(x + 140, y + 150, 'left');
this.add.text(x + 160,y + 140, "Key Left: Next Card");
let right = this.add.image(x + 140, y + 200, 'right');
this.add.text(x + 160,y + 190, "Key Right: Remove Card");

const leftArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
leftArrow.on('up', () => {

    if(insertedCoins <= 0){
        insertCoins();
        return;
    }else if(insertedCoins < 10){
        insertCoins();
        return;
    }
    console.log("left");


    cards.forEach(card => {
        card.x -= 20
    })


    nomeCarta = cartaAtual();

    // carreganto texturas
    let carta = this.add.image(x, y, 'card-back')

    // load no plugin phaser para carregar minhas cartas
    this.load.image(cardName, `./assets/${cardName}.png`);
    this.load.once(Phaser.Loader.Events.COMPLETE, () => {
        // texture loaded so use instead of the placeholder
        carta.setTexture(cardName)
    })
    this.load.start()


    carta.push(carta)
    console.log(cartas);

})



const rightArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
rightArrow.on('up', () => {
    console.log("right");
    if (cartas.length <= 0)
    {
        return
    }

    const carta = cartas.pop();
    if(carta === null){
        console.log('can not be null');
    }
    carta.destroy();

    cartas.forEach(carta => {
        carta.x += 20
    })
})
// const topArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP) 
// topArrow.on('up', () => {
// 	console.log("top arrow");
// 	this.scene.restart(game);
// })
}

/*
6:37
 */

