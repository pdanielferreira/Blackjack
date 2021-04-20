/*
TODOS OS SIMBOLOS PERMITIDOS
 */
const suits = [
	'Spades',
	'Hearts',
	'Clubs',
	'Diamonds'
]

/*
TODOS OS VALOR POSSIVEIS
 */
const values = [
	'2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'
]

var inicio = 0;

/*
OBTEM A CARTA DOS ASSETS
 */
const getCardName = (suit, value) => {
	setPoints(suit, value);
	return `card${suit}${value}`
}

let cards = []; //ARRAY DE CARTAS
let ScorePoints = []; //ARRAY DE PONTOS
/*
CONFIG PHASER
 */
var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene: {
		preload: preload,
		create: create,
		update:update
	}
};

/*
CONFIG DE TAMANHO
 */
const width = 800;
const height = 600;
let x = width*0.5;  //centra
const y = height*0.5; //centra
var cardName = "";
var points;
var pointsMesa;
var tips;
var cursors;

/*
INICIAÇÃO DO JOGO
 */
const game = new Phaser.Game(config);

/*
Função para gerar valor random dos simbolos das cartas
 */
function currentSuit(){
	var randomSimbolo = Math.floor(Math.random()*suits.length);  //Escolhe um simbolo aleatorio tendo em conta o array
	return suits[randomSimbolo];                                 //Devolve o simbolo gerado
}

/*
Função para gerar valor random dos números das cartas
 */
function curentValue(){
	var randomValor = Math.floor(Math.random()*values.length);   //Escolhe uma carta aleatoria tendo em conta o array
	if(randomValor < 0){                                              //Se o nº gerado menor que 0
		return values[0];                                           //Devolve sempre o valor na posição 0 (nº 2)
	}

	return values[randomValor];                                   //Devolve o valor gerado
}

/*
FUNÇÃO PARA OBTER A CARTA ESPECIFICA EX: 2 COPAS
 */
function currentCardName(){
	return getCardName(currentSuit(), curentValue());
}

/* --------------------------------------------------------------------------------------- */
/* --------------------------------------- Preload --------------------------------------- */
/* --------------------------------------------------------------------------------------- */
function preload(){
	this.load.image("card-back", './assets/cardBack_green5.png');
	/*this.load.image["cursor", cursor];*/
	this.load.image('left', './assets/arrowSilver_left.png');
	this.load.image("right", "./assets/arrowSilver_right.png");
}


/* -------------------------------------------------------------------------------------- */
/* --------------------------------------- CREATE --------------------------------------- */
/* -------------------------------------------------------------------------------------- */
function create() {
	//console.log("Executado com sucesso");         //Permite ver a consola se iniciou corretamente

	if(this.textures.exists(cardName)){
		return this.image(x, y, cardName)
	}

	let cardBack = this.add.image(x, y, 'card-back');

	/*
	Utilização das setas do teclado
	 */
	let left = this.add.image(x + 60, y + 150, 'left');
	this.add.text(x + 80,y + 140, "Seta Esquerda: Pedir mais cartas");
	let right = this.add.image(x + 60, y + 200, 'right');
	this.add.text(x + 80,y + 190, "Seta Direita: Esconder cartas");
	this.add.text(x - 10,y + 250, "Clique no 'R' para restart");
	this.add.text(x - 10,y + 270, "Clique no 'Espaço' para ser a vez da mesa");


	console.log("left");


	cards.forEach(card => {
		card.x -= 20
	})

	cardName = currentCardName();

	// carreganto texturas
	let card = this.add.image(x, y, 'card-back')

	// load no plugin phaser para carregar minhas cartas
	this.load.image(cardName, `./assets/${cardName}.png`);
	this.load.once('complete', () => {
		// texture loaded so use instead of the placeholder
		card.setTexture(cardName)
	})
	this.load.start()

	cards.push(card)
	console.log(cards);

	/* --- Inicializar Pontos --- */
	points = this.add.text(16, 16, 'Pontos: ' + ScorePoints[0], { fontSize: '32px', fill: '#fff' });

	/* --- Inicializador de Pontos da Mesa --- */
	pointsMesa = this.add.text(16, 500, 'Pontos da Mesa: 0', { fontSize: '20px', fill: '#fff' });
	/* --- Inicializar Dicas --- */
	tips = this.add.text(16, 50, 'Dica: És bom demais para dicas', { fontSize: '30px', fill: '#fff' });


	cursors = this.input.keyboard.createCursorKeys();

}

/* -------------------------------------------------------------------------------------- */
/* --------------------------------------- Update --------------------------------------- */
/* -------------------------------------------------------------------------------------- */
function update (){
	//const leftArrow = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
	//if(leftArrow.isDown){
	if(this.input.keyboard.checkDown(cursors.left, 250)) {
		console.log("Gerou");


		cards.forEach(card => {
			card.x -= 20
		})


		cardName = currentCardName();

		// carreganto texturas
		let card = this.add.image(x, y, 'card-back')

		// load no plugin phaser para carregar minhas cartas
		this.load.image(cardName, `./assets/${cardName}.png`);
		this.load.once('complete', () => {
			// texture loaded so use instead of the placeholder
			card.setTexture(cardName)
		})
		this.load.start()


		cards.push(card)
		console.log(cards);
	}

	if(this.input.keyboard.checkDown(cursors.right, 250)) {
		console.log("Carregou Direita");
		
		if (cards.length <= 0) {
			return
		}

		const card = cards.pop();
		if(card === null){
			console.log('can not be null');
		}
		card.destroy();

		cards.forEach(carta => {
			card.x += 20
		})
	}

	if(this.input.keyboard.checkDown(cursors.space, 250)) {
		game.scene.pause("default");
		console.log("Chegou a vez da mesa");
		tips.setText("Dica: Chegou vez da Mesa **");

		var i = 0;
		while(i<16){
			let x = curentValue();
			console.log(x);
			let point;
			switch (x){
				case 'A':
					point = 11;
					break;
				case 'J':
				case 'Q':
				case 'K':
					point = 10;
					break;
				default:
					point = x;
			}
			console.log(point);
			i = parseInt(i) + parseInt(point);
			console.log(i);
			pointsMesa.setText("Pontos: " + i);
		}

		if(i>21){
			tips.setText("Parabéns. Ganhou. A mesa rebentou");
		}

		gameEnd(i);

	}
}


/**
 * <h3> Substituir valor de letras por pontos
 *
 * @param suit  - simbolo da carta
 * @param value - valor da carta
 */
function setPoints(suit, value){
	console.log(suit);
	console.log(value);

	let point;
	switch (value){
		case 'A':
			point = 11;
			break;
		case 'J':
		case 'Q':
		case 'K':
			point = 10;
			break;
		default:
			point = value;
	}
	ScorePoints.push(point.toString());

	//Calcula os ponto
	const reducer = (accumulater, currentValue) => parseInt(accumulater) + parseInt(currentValue);
	const myTotal = ScorePoints.reduce(reducer);

	//	Verifica se é a primeira jogada
	if(inicio == 0) {
		console.log("Let the games begin");
		inicio = 1;
	} else {
		gameStatus(myTotal);
	}
}

function gameStatus(myTotal){
	/* --- "Normal" --- */
	if(myTotal > 1 && myTotal < 21){
		//game.scene.pause("default");
		console.log(myTotal);
		console.log(points);
		points.setText("Pontos: " + myTotal);
		//tips.setText("Game Over");
	}
	/* --- Quase a perder --- */
	if(myTotal == 20 || myTotal ==19){
		//game.scene.pause("default");

		points.setText("Pontos: " + myTotal);
		tips.setText("Dica: *nervous-sweats*");
	}
	/* --- Ganhou --- */
	if(myTotal == 21){
		game.scene.pause("default");

		points.setText("Pontos: " + myTotal);
		tips.setText("Parabéns acabou de ganhar!!");
	}
	/* --- Perdeu --- */
	if(myTotal > 21) {
		game.scene.pause("default");

		points.setText("Pontos: " + myTotal);
		tips.setText("Game Over X(");	}
}

function gameEnd(i){
	const reducer = (accumulater, currentValue) => parseInt(accumulater) + parseInt(currentValue);
	const myTotal = ScorePoints.reduce(reducer);
	console.log("Pontos Jogador: " + myTotal);
	console.log("Pontos da mesa:" + i);

	if(i>myTotal){
		tips.setText("A mesa ganhou. Mais sorte para a próxima");
	}
	if(i==myTotal){
		tips.setText("Parabéns, conseguiu empatar com a mesa.");
	}
	if(myTotal>i){
		tips.setText("Parabéns, conseguiu ganhar a mesa.");
	}
}
