const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// Vars iniciais
var started = false;
var level = 0;
var count = 0;


// detecta quando o jogo começa, através de um butão pressionado
$(document).keypress(function() {
    if (!started){
        $("#Text-title").text('Level ' + level);
        nextSequence();
        started = true;
    }
})


// Código que detecta qual butão foi pressionado e ativa a função anônima
$('.btn').on('click', function(){

    // Var que armazena o ID do butão que foi clicado
    var userChosenColour = $(this).attr("id");

    // Adiciona a cor selecionada ao pattern do usuário
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    checkAwnser(userClickedPattern.length-1);
})


// Função que dá números entre 0-3 pra alimentar o array buttonColours
function nextSequence(){

    // limpa o array pra um novo Level
    userClickedPattern = [];
    
    // incrementa o nível em 1
    level++;
    
    // muda o número do Nível no H1
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);

    // variável que seleciona aleatóriamente uma cor baseado na função acima
    var randomChosenColour = buttonColours[randomNumber];
    
    // addiciona ao array GamePattern o resultado da var acima
    gamePattern.push(randomChosenColour);
    
    // Animação de Flash da cor selecionada >> por Leo Sampaio
    var teste = setInterval(() => {
        $('#' + gamePattern[count]).fadeOut(50).fadeIn(50);
        playSound(gamePattern[count]);
        count+=1;
        if(count == gamePattern.length) {
            count = 0;
            clearInterval(teste);
        }  
    }, 250);
}


// função que toca os sons
function playSound(name) {
    
    // Adiciona um som quando a cor for selecionada 
    var som = new Audio("../RES/sounds/" + name + ".mp3");
    som.play();
}


// Animação de flash no botão pressionado
function animatePress(currentColour) {

    // Adiciona o estilo ".pressed" no butão selecionado, através do ID
    $("#" + currentColour).addClass('.pressed');

    // Ativa uma função anônima que remove o estilo após 100ms
    setTimeout(function(){
        $("#" + currentColour).removeClass('.pressed');
    }, 50);

}


// Checa se a resposta foi certa
function checkAwnser(currentLevel){
    
    // Lógica pra saber se a sequencia dos butões apertados ta certa
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        $("#level-title").text("Nice! :)")

        // Lógica pra saber se o tamanho da resposta é o mesmo do level do jogo
        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
    } else {

        // O que acontece se o jogador errar a sequência
        $("#level-title").text("SEU BURRO e.e")
        playSound("wrong");

        //add e remover o game over pra fazer flash
        for (var numeroDeFlashs = 0; numeroDeFlashs < gamePattern.length; numeroDeFlashs++) {
            $("body").addClass("game-over");
            setTimeout(function () {
            $("body").removeClass("game-over");
            }, 200);
        }
        startOver();
    }
}


// Reinicia o Jogo
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}