class Game {
  constructor() {
    this.tituloReiniciar = createElement("h2")
    this.botaoReiniciar = createButton("")

    this.placar = createElement("h2")
    this.placar1 = createElement("h2")
    this.placar2 = createElement("h2")
    this.estaCorrendo = false
    this.esquerdaAtiva = false
    this.explodiu = false
  }

  obterEstado() {
    let estadoRef = bancoDeDados.ref("estadoJogo")
    estadoRef.on("value", (info) => {
      estadoJogo = info.val()
    })
  }

  atualizarEstado(estado) {
    let bancoDeDadosRef = bancoDeDados.ref("/")
    bancoDeDadosRef.update({
      estadoJogo: estado
    })
  }

  iniciar() {
    form = new Form();
    form.desenha();

    player = new Player();
    player.obterQuantidadeDeJogadores()

    car1 = createSprite(width/2 -50, height -100)
    car1.addImage(car1Img)
    car1.scale = 0.07
    //car1.addImage(explosao)

    car2 = createSprite(width/2 +100, height -100)
    car2.addImage(car2Img)
    car2.scale = 0.07
    //car2.addImage(explosao)

    carros = [car1,car2]

    combustiveis = new Group()
    moedas = new Group()
    obstaculos = new Group()

    let posicoesObstaculo = [
      { x: width / 2 + 250, y: height - 800, image: obs2 },
      { x: width / 2 - 150, y: height - 1300, image: obs1 },
      { x: width / 2 + 250, y: height - 1800, image: obs1 },
      { x: width / 2 - 180, y: height - 2300, image: obs2 },
      { x: width / 2, y: height - 2800, image: obs2 },
      { x: width / 2 - 180, y: height - 3300, image: obs1 },
      { x: width / 2 + 180, y: height - 3300, image: obs2 },
      { x: width / 2 + 250, y: height - 3800, image: obs2 },
      { x: width / 2 - 150, y: height - 4300, image: obs1 },
      { x: width / 2 + 250, y: height - 4800, image: obs2 },
      { x: width / 2, y: height - 5300, image: obs1 },
      { x: width / 2 - 180, y: height - 5500, image: obs2 }
    ];

   this.adicionaSprites(combustiveis, 4, combustivel, 0.02)
   this.adicionaSprites(moedas, 18, moeda, 0.09 )
   this.adicionaSprites(obstaculos, posicoesObstaculo.length, obs1, 0.04, posicoesObstaculo)
  }

  jogar() {
    form.esconde()
    form.titulo.position(40,50)
    form.titulo.class("gameTitleAfterEffect")

    this.tituloReiniciar.html("Reiniciar Jogo")
    this.tituloReiniciar.class("resetText")
    this.tituloReiniciar.position(width/2 +200,40)

    this.botaoReiniciar.class("resetButton")
    this.botaoReiniciar.position(width/2 +230,100)

    this.placar.html("Placar")
    this.placar.class("resetText")
    this.placar.position(width/3 -60,40)

    this.placar1.class("leadersText")
    this.placar1.position(width/3 -50,80)

    this.placar2.class("leadersText")
    this.placar2.position(width/3 -50,130)

    player.obterInformacaoJogadores()
    player.obterCarrosNoFinal()

    this.reiniciarJogo()

    if(todosOsJogadores !== undefined) {
      image(pista, 0, -height*5, width, height*6)

      this.mostrarPlacar()
      this.mostrarBarraVida()
      this.mostrarBarraCombusivel()

      let index = 0
      for (const plr in todosOsJogadores) {
        	index = index +1
          let x = todosOsJogadores[plr].posicaoX
          let y = height - todosOsJogadores[plr].posicaoY
          carros[index -1].position.x = x
          carros[index -1].position.y = y

           if(index === player.indice){
             stroke(10)
             fill("red")
             ellipse(x,y,60,60)

             this.coletaCombustivel(index)
             this.coletaMoeda(index)
             this.colideObstaculo(index)
             this.colideCarro(index)

            if(player.vidas <=0){
              this.explodiu = true
              this.estaCorrendo = false
            }

             camera.position.y = carros[index - 1].position.y
           }

           let vidaAtual = todosOsJogadores[plr].vidas
           if(vidaAtual <= 0 ){
            carros[index -1].addImage(explosao)
            carros[index -1].scale = 0.3
           }
      }

      this.controlesJogador()

      const linhaChegada = height *6 -100
      if(player.posicaoY > linhaChegada) {
        estadoJogo = 2
        player.classificacao += 1
        player.atualizarCarrosNoFinal(player.classificacao)
        player.atualizarJogador()
        this.mostrarVencedor()
      }

      drawSprites()
    }
  }

  controlesJogador(){
    if(!this.explodiu){
      if(keyIsDown(UP_ARROW)) {
        this.estaCorrendo = true
        player.posicaoY += 10
        player.atualizarJogador()
      } else{
        this.estaCorrendo = false
      }
  
      if(keyIsDown(LEFT_ARROW) && player.posicaoX > width/3 - 50) {
        this.esquerdaAtiva = true
        player.posicaoX += -5
        player.atualizarJogador()
      }
  
      if(keyIsDown(RIGHT_ARROW) && player.posicaoX < width/2 + 300) {
        this.esquerdaAtiva = false
        player.posicaoX += 5
        player.atualizarJogador()
      }
    }
    
  }

  mostrarPlacar(){
    let placar1, placar2
    let jogadores = Object.values(todosOsJogadores)

    if((jogadores[0].classificacao === 0 && jogadores[1].classificacao === 0) || jogadores [0].classificacao === 1) {
      placar1 = jogadores[0].classificacao + "&emsp;" +jogadores[0].nome + "&emsp;" + jogadores[0].placar
      placar2 = jogadores[1].classificacao + "&emsp;" +jogadores[1].nome + "&emsp;" + jogadores[1].placar
    }

    if (jogadores[1].classificacao === 1) {
      placar1 = jogadores[1].classificacao + "&emsp;" +jogadores[1].nome + "&emsp;" + jogadores[1].placar
      placar2 = jogadores[0].classificacao + "&emsp;" +jogadores[0].nome + "&emsp;" + jogadores[0].placar
    }

    this.placar1.html(placar1)
    this.placar2.html(placar2)
  }

  reiniciarJogo(){
    this.botaoReiniciar.mousePressed(() => {
      let databaseRef = bancoDeDados.ref("/")
      databaseRef.set({
        players: {},
        estadoJogo: 0,
        quantidadeJogadores: 0,
        carrosNoFinal: 0
      })

      window.location.reload()
  }) 
  }

  adicionaSprites(grupoSprite, numeroSprite, imagemSprite, escala, posicoes = []){
    for (let item = 0; item < numeroSprite; item++) {
      let x, y
    
      if (posicoes.length > 0) {
        x = posicoes [item].x
        y = posicoes [item].y
        imagemSprite = posicoes[item].image
      } else {
        x = random (width/2 + 150, width/2 - 150)
        y = random ( - height *4.5, height -400)
      }

      let sprite = createSprite(x,y)
      sprite.addImage(imagemSprite)
      sprite.scale = escala
      grupoSprite.add(sprite)
    }
  }

  coletaCombustivel(indice){
    carros[indice -1].overlap(combustiveis, (coletor,coletado) => {
      player.combustivel = 185
      coletado.remove( )
    })

    if(player.combustivel > 0 && this.estaCorrendo){
      player.combustivel -= 0.3
    }

    if (player.combustivel <= 0){
      estadoJogo = 2
      this.mostrarPerdedor()
    }
  }

  coletaMoeda(indice){
    carros[indice -1].overlap(moedas, (coletor,coletado) => {
      player.placar += 21
      coletado.remove( )
    })
  }

  mostrarVencedor() {
    swal({
    title: `Incrivel! ${"\n"} ${player.classificacao}º lugar `,
    text: "Você alcançou a linha e chegada com sucesso !", 
    imageUrl: "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
    imageSize: "100x100",
    confirmButtonText: "Ok"
    },
    this.reiniciarJogo())
  }

  mostrarPerdedor() {
    swal({
    title: `Fim de jogo`,
    text: "Poxa, você perdeu a corrida ", 
    imageUrl: "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
    imageSize: "100x100",
    confirmButtonText: "Obrigado por jogar"
    },
    this.reiniciarJogo())
  }

  mostrarBarraCombusivel(){
    push()
    image(combustivel,width/2 - 130, height - player.posicaoY - 350,20,20)
    fill("white")
    rect(width/2 - 100, height - player.posicaoY - 350,185,20)
    fill("#ffc400")
    rect(width/2 - 100, height - player.posicaoY - 350,player.combustivel,20)
    noStroke()
    pop()
  }

  mostrarBarraVida(){
    push()
    image(vida,width/2 - 130, height - player.posicaoY - 400,20,20)
    fill("white")
    rect(width/2 - 100, height - player.posicaoY - 400,185,20)
    fill("#f50057")
    rect(width/2 - 100, height - player.posicaoY - 400,player.vidas,20)
    noStroke()
    pop()
  }

  colideObstaculo(index){
    if(carros[index -1].collide(obstaculos)) {
      if(this.esquerdaAtiva){
        player.posicaoX += 100
      } else {
        player.posicaoX -= 100
      }

      if(player.vidas>0){
        player.vidas -= 185/4
      }

      player.atualizarJogador()
    }

  }

  colideCarro(index){
if(index === 1){
  if(carros[0].collide(carros[1])){
    if(this.esquerdaAtiva){
      player.posicaoX += 100
    } else {
      player.posicaoX -= 100
    }

    if(player.vidas>0){
      player.vidas -= 185/4
    }

    player.atualizarJogador()  
  }
}

if(index === 2){
  if(carros[1].collide(carros[0])){
    if(this.esquerdaAtiva){
      player.posicaoX += 100
    } else {
      player.posicaoX -= 100
    }

    if(player.vidas>0){
      player.vidas -= 185/4
    }

    player.atualizarJogador()  
  }
}
  }
}