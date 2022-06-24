let fundoImg
let bancoDeDados
let form, player, game
let quantidadeJogadores , estadoJogo, todosOsJogadores
let car1Img,car2Img,pista,explosao

let car1,car2,carros

let combustivel, moeda, obs1, obs2
let combustiveis, moedas, obstaculos

let vida

function preload() {
  fundoImg = loadImage("./assets/background.png")
  car1Img = loadImage("./assets/car1.png") 
  car2Img = loadImage("./assets/car2.png") 
  pista = loadImage("./assets/track.jpeg")
  combustivel = loadImage("./assets/fuel.png")
  moeda = loadImage ("./assets/goldCoin.png")
  obs1 = loadImage ("./assets/obstacle1.png")
  obs2 = loadImage ("./assets/obstacle2.png")
  vida = loadImage("./assets/life.png")
  explosao = loadImage("./assets/blast.png")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight)

  bancoDeDados = firebase.database()

  game = new Game()
  game.obterEstado()
  game.iniciar()
}

function draw() {
  background(fundoImg)

  if (quantidadeJogadores === 2) {
    game.atualizarEstado(1)
  } 

  if (estadoJogo === 1) {
    game.jogar()
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}