/* ------------------------------------ */
/* --- TODOS OS SIMBOLOS PERMITIDOS --- */
/* ------------------------------------ */
const suits = [
	'Spades',
	'Hearts',
	'Clubs',
	'Diamonds'
]

/* -------------------------------- */
/* --- TODOS OS VALOR POSSIVEIS --- */
/* -------------------------------- */
const values = [
	'2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'
]

var inicio = 0;

/* -------------------------------- */
/* --- OBTEM A CARTA DOS ASSETS --- */
/* -------------------------------- */

const getCardName = (suit, value) => {
	setPoints(suit, value);
	return `card${suit}${value}`
}

/* --- Criação dos arrays --- */
let cards = []; 		//ARRAY DE CARTAS
let ScorePoints = []; 	//ARRAY DE PONTOS

/* --------------------- */
/* --- CONFIG PHASER --- */
/* --------------------- */
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

/* ---------------------------------- */
/* ---CONFIG DE TAMANHO DA JANELA --- */
/* ---------------------------------- */
const width = 800;
const height = 600;
let x = width*0.5;  	//centra
const y = height*0.5; 	//centra
var cardName = "";
var points;
var pointsMesa;
var tips;
var cursors;

/* --- INICIAÇÃO DO JOGO --- */
const game = new Phaser.Game(config);

/**
 * <h3> Função para gerar valor random dos simbolos das cartas
 * <p> (espadas, ouros, copas, paus)
 *
 * @return - simbolo aleatorio do Array dos simbolos das cartas
 */
function currentSuit(){
	var randomSimbolo = Math.floor(Math.random()*suits.length);  //Escolhe um simbolo aleatorio tendo em conta o array
	return suits[randomSimbolo];                                 	//Devolve o simbolo gerado
}

/**
 * <h3> Função para gerar valor random dos números das cartas
 * <p> Gera um número entre 0 e o tamanho do Array e retorna o conteudo do Array nessa posição
 *
 * @return valor do Array na posição do número gerado. Ou se gerar um número menor do que 0 retorna 2
 */
function curentValue(){
	var randomValor = Math.floor(Math.random()*values.length);	//Escolhe uma carta aleatoria tendo em conta o array
	if(randomValor < 0){                                            //Se o nº gerado menor que 0
		return values[0];                                           //Devolve sempre o valor na posição 0 (nº 2)
	}

	return values[randomValor];                                   //Devolve o valor gerado
}

/**
 * <h3> FUNÇÃO PARA OBTER A CARTA ESPECIFICA EX: 2 COPAS
 * <p> Usa as funções currentSuit e currentValue
 *
 * @return carta (getCardName)
 *
 * @see currentSuit
 * @see curentValue
 * @see getCardName
 *
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
	console.log("A iniciar create()");         //Permite ver a consola se iniciou corretamente

	/* --- Load Texturas Cartas --- */
	if(this.textures.exists(cardName)){
		return this.image(x, y, cardName)
	}

	/* --- Load traseira das cartas --- */
	let cardBack = this.add.image(x, y, 'card-back');

	/* --- Texto a explicar o que faz cada tecla --- */
	let left = this.add.image(x + 60, y + 150, 'left');
	this.add.text(x + 80,y + 140, "Seta Esquerda: Pedir mais cartas");
	let right = this.add.image(x + 60, y + 200, 'right');
	this.add.text(x + 80,y + 190, "Seta Direita: Esconder cartas");
	this.add.text(x - 10,y + 250, "Clique no 'R' para restart");
	this.add.text(x - 10,y + 270, "Clique no 'Espaço' para ser a vez da mesa");

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

	/* --- Coloca a primeira carta no ecrã --- */
	cards.push(card)
	console.log(cards);	// print para a consola da primeira carta

	/* --- Inicializar Pontos --- */
	points = this.add.text(16, 16, 'Pontos: ' + ScorePoints[0], { fontSize: '32px', fill: '#fff' });

	/* --- Inicializador de Pontos da Mesa --- */
	pointsMesa = this.add.text(250, 23, 'Pontos da Mesa: À espera do utilizador', { fontSize: '20px', fill: '#fff' });

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

	/* --- Verifica se o utilizador clicou na seta esquerda --- */
	/* --- Adiciona uma nova carta ao ecrã --- */
	if(this.input.keyboard.checkDown(cursors.left, 250)) {
		console.log("Esquerda");

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

		/* --- Põe a carta gerada no ecrã --- */
		cards.push(card)
		console.log(cards);		// log na consola do carta que saiu
	}

	/* --- Verifica se o utilizador clicou na tecla direita --- */
	/* --- Remove a ultima carda do ecrã --- */
	if(this.input.keyboard.checkDown(cursors.right, 250)) {
		console.log("Direita");
		
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

	/* --- Verifica se o utilizador clicou no espaço --- */
	/* --- O utilizador para de adicionar cartas e é gerado os pontos da mesa e verifica quem ganhou --- */
	if(this.input.keyboard.checkDown(cursors.space, 250)) {
		game.scene.pause("default");
		console.log("Chegou a vez da mesa");
		tips.setText("Dica: Chegou vez da Mesa **");

		/* --- Simulação do joga da mesa --- */
		// i = pontos da mesa
		var i = 0;
		// quando tiver 16 pontos para de ir buscar pontos
		while(i<16){
			let x = curentValue();
			console.log(x); // log na consola dos pontos que a mesa tirou - pré

			// Gera os pontos da jogada da mesa
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
			console.log(point); // log na consola dos pontos que a mesa tirou nesta jogada

			i = parseInt(i) + parseInt(point);

			console.log(i);	// log na consola dos pontos que a mesa tirou - pós

			pointsMesa.setText("Pontos da mesa: " + i);
		}

		/* --- A mesa ganhou pontos demais --- */
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

	//Calcula os pontos
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

/**
 * <h3> Verifica o estado do jogo
 *
 * @param myTotal - total de pontos
 */
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

/**
 * <h3> Quando o utilizador jogo contra a mesa depois aparece isto
 * <p> Mostra todos os pontos e textos
 *
 * @param i - estado do jogo
 */
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
		tips.setText("Parabéns, conseguiu ganhar á mesa.");
	}
}