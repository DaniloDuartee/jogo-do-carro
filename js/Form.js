class Form {
  constructor() {
    this.nome = createInput("").attribute("placeholder", "Digite seu nome");
    this.botaoJogar = createButton("Jogar");
    this.titulo = createImg("./assets/title.png", "nome do jogo");
    this.saudacao = createElement("h2");
  }

  esconde() {
    this.saudacao.hide();
    this.botaoJogar.hide();
    this.nome.hide();
  }

  definePosicaoElementos() {
    this.nome.position(width/2 -110, height/2 -80)
    this.botaoJogar.position(width/2 - 90, height/2 - 20)
    this.titulo.position(120, 160)
    this.saudacao.position(width/2 -300, height/2 -100)
  }

  defineEstiloElementos() {
    this.nome.class("customInput")
    this.botaoJogar.class("customButton")
    this.titulo.class("gameTitle")
    this.saudacao.class("greeting")
  }

  pressionaMouse() {
    this.botaoJogar.mousePressed(() => {
      this.botaoJogar.hide();
      this.nome.hide();

      let mensagem = `Ola, ${this.nome.value()}! </br> Espere o outro jogador entrar........ `
      this.saudacao.html(mensagem) 
      console.log(quantidadeJogadores)
      quantidadeJogadores = quantidadeJogadores +1 
      player.nome = this.nome.value()
      player.indice = quantidadeJogadores
      player.adicionarJogador()
      player.atualizarQuantidadeDeJogadores(quantidadeJogadores)
      player.obterDistancia()
    } )
  }

  desenha() {
  this.definePosicaoElementos()
  this.defineEstiloElementos()
  this.pressionaMouse()  
}

}