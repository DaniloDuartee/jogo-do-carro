class Player {
  constructor() {
    this.nome = null
    this.indice = null
    this.posicaoX = 0
    this.posicaoY = 0
    this.classificacao = 0
    this.placar = 0
    this.vidas = 185
    this.combustivel = 185
  }

  obterQuantidadeDeJogadores(){
    let quantidadeJogadoresRef = bancoDeDados.ref("quantidadeJogadores")
    quantidadeJogadoresRef.on("value", info => {
      quantidadeJogadores = info.val()
    })
  }

  atualizarQuantidadeDeJogadores(quantidade){
    let bancoDeDadosRef = bancoDeDados.ref("/")
    bancoDeDadosRef.update({
      quantidadeJogadores: quantidade
    })
  }

  obterCarrosNoFinal(){
let carrosNoFinalRef = bancoDeDados.ref("carrosNoFinal")
carrosNoFinalRef.on("value", info => {
  this.classificacao = info.val()
})
  }

  atualizarCarrosNoFinal(colocacao){
let bancoDeDadosRef = bancoDeDados.ref("/")
bancoDeDadosRef.update({
  carrosNoFinal: colocacao
})
  }

  adicionarJogador(){
    let playerIndice = "players/player" + this.indice
    if(this.indice === 1) {
      this.posicaoX = width/2 - 100
    } else {
      this.posicaoX = width/2 +100
    }

    let playerIndiceRef = bancoDeDados.ref(playerIndice)
    playerIndiceRef.set({
      nome: this.nome,
      posicaoX: this.posicaoX,
      posicaoY: this.posicaoY,
      classificacao: this.classificacao,
      placar: this.placar,
      vidas: this.vidas
    })
  }

  obterInformacaoJogadores(){
    let playersRef = bancoDeDados.ref("players")
    playersRef.on("value", info =>{
      todosOsJogadores = info.val()
    })
  }

  atualizarJogador() {
    let playerIndice = "players/player" + this.indice
    let playerIndiceRef = bancoDeDados.ref(playerIndice)
    playerIndiceRef.update({
      posicaoX: this.posicaoX,
      posicaoY: this.posicaoY,
      classificacao: this.classificacao,
      placar: this.placar,
      vidas: this.vidas
    })
  }

  obterDistancia(){
    let playerIndice = "players/player" + this.indice
    let playerIndiceRef = bancoDeDados.ref(playerIndice)
    playerIndiceRef.on("value", info =>{
      let dado = info.val()
      this.posicaoX = dado.posicaoX,
      this.posicaoY = dado.posicaoY
    })
  }
  
}