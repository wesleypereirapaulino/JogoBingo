let paineljogador = document.querySelectorAll("#paineljogador button").length;
let painelmaquina = document.querySelector("#painelmaquina").innerHTML;
let winner = document.querySelector("#winner");          
let jogador = document.querySelectorAll("#paineljogador button");
let Bolas_Sorteadas = [];
let Cartela_Jogador = [];
let Cartela_Maquina = [];
let Pontos_Marcados_Jogador = 0;
let Pontos_Marcados_Maquina = 0;  

//Imagem de carregamento da pagina.
setTimeout(() => {
    document.querySelector(".loading").style.display = "none"; 
},5400);

// Aqui sera gerado as 20 dezenas para cada cartela no jogo
function GerarCartelas(){
    let wait = 0;
    let bolas = document.querySelector("#bolas");
    let Nome_jogador = prompt("Digite o seu nome !!!!");

    document.querySelector("#Nome_Jogador").value = Nome_jogador;

    //GERANDO AS BOLAS PARA O SORTEIO
    while(Bolas_Sorteadas.length < 60){
        let sorteio = Math.floor(Math.random() * 60 + 1);  
        if(Bolas_Sorteadas.indexOf(sorteio) == -1){
            Bolas_Sorteadas.push(sorteio);      
        }
    }

    //GERA OS NUMEROS DA CARTELA DO JOGADOR 20 DEZENAS
    while(Cartela_Jogador.length < 20){ 
        let aleatorio = Math.floor(Math.random() * 60 + 1);

        if(Cartela_Jogador.indexOf(aleatorio) == -1){
            Cartela_Jogador.push(aleatorio);

            //faz com que o array seja ordenado numericamente e de ordem crescente.
            function sortfunction(a, b){
                return (a - b)
            }
            Cartela_Jogador.sort(sortfunction);
        }     
    }

    //GERA OS NUMEROS DA CARTELA DA MAQUINA 20 DEZENAS
    while(Cartela_Maquina.length < 20){ 
        let aleatorio = Math.floor(Math.random() * 60 + 1);
        if(Cartela_Maquina.indexOf(aleatorio) == -1){
            Cartela_Maquina.push(aleatorio); 
            
            //faz com que o array seja ordenado numericamente e de ordem crescente.
            function sortfunction(a, b){
                return (a - b)
            }
            Cartela_Maquina.sort(sortfunction);         
        }     
    }

    // Mostra os numeros da cartela do jogador
    for(let sorteadas in Cartela_Jogador){
        setTimeout(() => {                    
            document.querySelectorAll("#paineljogador button")[sorteadas].innerHTML = Cartela_Jogador[sorteadas];
            document.querySelectorAll("#paineljogador button")[sorteadas].style.margin = "5px";
        }, wait); 
        bolas.play();                
        wait+= 70;

    } 

    // Mostra os numeros da cartela da maquina
    for(let sorteadas in Cartela_Maquina){
        setTimeout(() => {
            document.querySelectorAll("#painelmaquina li")[sorteadas].innerHTML = Cartela_Maquina[sorteadas];
            document.querySelectorAll("#painelmaquina li")[sorteadas].style.margin = "5px";
        }, wait); 
        bolas.play();               
        wait+= 70;   
    }   
          
    
    // TRAVANDO O BOTAO PARA NÃO GERAR UMA NOVA CARTELA
    document.querySelector("#Btn_Gerar_Cartelas").disabled = true;
    document.querySelector(".novacartela").disabled = false;                


    // NESSE TRECHO O SISTEMA LIBERA O BOTAO DE START DO JOGO E MOSTRA O PAINEL ONDE IRA APARECER AS BOLAS SORTEADAS
    setTimeout(() => {
        document.querySelector("#Btn_Comeca_Jogo").disabled = false;
        bolas.pause();
    }, 3000);  
}

// Essa função serve para que o jogador, troque os numeros de sua cartela caso necessario.
function GerarOutraCartela(){
    let wait = 0;
    let bolas = document.querySelector("#bolas");

    while(Cartela_Jogador.length > 0){
        for(let i in Cartela_Jogador){
            Cartela_Jogador.pop(i);
            document.querySelectorAll("#paineljogador button")[i].innerHTML = "";

        }
    }

    for(let i in jogador){
        setTimeout(() => {                    
            document.querySelectorAll("#paineljogador button")[i].innerHTML = "";
        }, wait);            
        wait+= 70;
    }

    while(Cartela_Jogador.length < 20){ 
        let aleatorio = Math.floor(Math.random() * 60 + 1);

        if(Cartela_Jogador.indexOf(aleatorio) == -1){
            Cartela_Jogador.push(aleatorio);

            function sortfunction(a, b){
                return (a - b) //faz com que o array seja ordenado numericamente e de ordem crescente.
            }
            Cartela_Jogador.sort(sortfunction);
        }  
        
    }
    for(let NovoNumero in Cartela_Jogador){
        setTimeout(() => {                    
            document.querySelectorAll("#paineljogador button")[NovoNumero].innerHTML = Cartela_Jogador[NovoNumero];
            bolas.play();                

            setTimeout(() => {
                bolas.pause();
            }, 1400);

        }, wait); 
        wait+= 70;   
    } 

}

function StartGame(){
    let painelBolasSorteadas = document.querySelectorAll(".BolasSorteadasJogo li");
    let maquina = document.querySelectorAll("#painelmaquina li");
    let painel = document.querySelector(".BolaSortedaPainel").innerHTML;         
    let timer = 1000;
    let help_jogador = document.querySelectorAll("#paineljogador button");
      
    // AUDIO DO JOGO   
    let y = document.getElementById("audio");  
    

    for(let i in Bolas_Sorteadas){
        setTimeout(() => {
            painel= Bolas_Sorteadas[i];  
            
            // NESSE BLOCO VERIFICA SE ALGUM DOS JOGADORES ACERTARAM TODOS OS NUMEROS DA CARTELA
            if(Pontos_Marcados_Jogador < 20 && Pontos_Marcados_Maquina < 20){
                document.querySelector(".bolasSorteio").style.display = "block";
                document.querySelector(".bolasSorteio").innerHTML = painel;
                document.querySelector(".BolaSortedaPainel").innerHTML = painel;

                for(let i in maquina){
                    if(maquina[i].innerHTML == document.querySelector(".BolaSortedaPainel").innerHTML){
                        document.querySelectorAll("#painelmaquina li")[i].classList.add("acertosmaquina");
                        setTimeout(() => {
                            y.currentTime = 0;
                            y.play();
                        }, 1200);
                        Pontos_Marcados_Maquina++;

                    }  
                } 

                // Essa condicional verifica se o btn para marcação automatica foi clicado
                if(document.querySelector("#Manual").style.display == "inline-block"){
                    for(let i in jogador){
                        if(jogador[i].innerHTML == document.querySelector(".BolaSortedaPainel").innerHTML){
                            y.currentTime = 0;   
                            y.play();
                            document.querySelectorAll("#paineljogador button")[i].classList.add("acertosjogador");
                            document.querySelectorAll("#paineljogador button")[i].disabled = true;
                            document.querySelectorAll("#paineljogador button")[i].style.border = "1px solid #00ff00"                            
                
                            Pontos_Marcados_Jogador++;
                        }  
                    }  
                }

                // NESSE BLOCO A BOLA DA CARTELA DO JOGADOR É DESTACADA CASO APAREÇA NO SORTEIO
                for(let e in help_jogador){
                    if(help_jogador[e].innerHTML == painel){
                        document.querySelectorAll("#paineljogador button")[e].style.backgroundColor = "rgba(255, 0, 0, 0.7)";
                    }
                }

                // NESSE BLOCO SÃO MARCADOS TODAS AS BOLAS SORTEADAS DO JOGO NO PAINEL.
                setTimeout(() => {
                    for(let i in painelBolasSorteadas){
                        if(painelBolasSorteadas[i].innerHTML == document.querySelector(".BolaSortedaPainel").innerHTML){
                            document.querySelectorAll(".BolasSorteadasJogo li")[i].style.backgroundColor = "red";
                            document.querySelectorAll(".BolasSorteadasJogo li")[i].style.transform = "rotateY(360deg)";
                        }
                    } 
                }, 2500);

                BolaDaSorte();            

                // NARRAR BOLAS SORTEADAS NO JOGO
                speechSynthesis.speak(new SpeechSynthesisUtterance(Bolas_Sorteadas[i])); 
            }  

            VencedorJogo();
            
        }, timer);

        /* TEMPO PARA SORTEAR A PROXIMA BOLA DO JOGO */
        timer+= 4000;
    } 
    //depois de 1/2 segundo o botao de START É BLOQUEADO.     
    setTimeout(() => {
        document.querySelector("#Btn_Comeca_Jogo").disabled = true;
        document.querySelector(".novacartela").disabled = true;                

    }, 100);  
    
    document.querySelector("#Status").style.display = "inline-block";
    
}

function BolaDaSorte(){
    switch (Pontos_Marcados_Jogador){
        case 19:
            document.querySelector(".jogador img").classList.add("BoladasorteJogador");
        break;
    }

    switch (Pontos_Marcados_Maquina){
        case 19:
            document.querySelector(".maquina img").classList.add("BoladasorteMaquina");
        break;
    
    }
}

//Funcao que verifica se algum dos jogadores acertaram todas as bolas da sua cartela.
function VencedorJogo(){              
    let champions = document.querySelector("#fim");    

    switch (Pontos_Marcados_Jogador){
        case 20:
            document.querySelector(".jogador img").classList.remove("BoladasorteJogador");
            document.querySelector("#Status").style.display = "none";
            document.querySelector("#Manual").style.display = "none";
            setTimeout(() => {
                document.querySelector(".jogador .winner").style.display = "block";
                champions.play();  
                document.querySelector(".bolasSorteio").style.display = "none";
                document.querySelector(".monitorSorteio").style.height = 0+"px"; 
                
            },1000);

            // Libera o botao de nova partida ao final do jogo.
            document.querySelector("#New_Game").disabled = false;
        break;
    }

    switch (Pontos_Marcados_Maquina){
        case 20:
            document.querySelector(".maquina img").classList.remove("BoladasorteMaquina");
            document.querySelector("#Status").style.display = "none";
            document.querySelector("#Manual").style.display = "none";
            setTimeout(() => {
                document.querySelector(".maquina .winner").style.display = "block";
                champions.play();     
                document.querySelector(".bolasSorteio").style.display = "none";
                document.querySelector(".monitorSorteio").style.height = 0+"px";   
                
            },1000);
        
            // Libera o botao de nova partida ao final do jogo.
            document.querySelector("#New_Game").disabled = false;
        break;
    
    }
}

// Nessa função o proprio jogador marca os numeros da sua cartela.
function Jogador(e){         
    let bolas_jogador = document.querySelectorAll("#paineljogador button")[e];
    let painel = document.querySelector(".BolaSortedaPainel");
    //Audio do jogo
    let y = document.querySelector("#audio");
    let champions = document.querySelector("#fim"); 

    if(bolas_jogador.innerHTML == painel.innerHTML && bolas_jogador != ""){
        y.currentTime = 0;   
        y.play();
        
        Pontos_Marcados_Jogador++;     

        document.querySelectorAll("#paineljogador button")[e].classList.add("acertosjogador");
        document.querySelectorAll("#paineljogador button")[e].disabled = true;
        document.querySelectorAll("#paineljogador button")[e].style.border = "1px solid #00ff00"
    }

    if(Pontos_Marcados_Jogador == 19){
        document.querySelector(".jogador img").classList.add("BoladasorteJogador");
    }

    switch (Pontos_Marcados_Jogador) {
        case 20:
            document.querySelector(".jogador img").classList.remove("BoladasorteJogador");
            setTimeout(() => {
                document.querySelector(".jogador .winner").style.display = "block";
                champions.play();  
                document.querySelector(".bolasSorteio").style.display = "none";
                document.querySelector(".monitorSorteio").style.height = 0+"px";  
                document.querySelector("#Status").style.display = "none";
                document.querySelector("#Manual").style.display == "none";
            },2000);

            // Libera o botao de nova partida ao final do jogo.
            document.querySelector("#New_Game").disabled = false;
        break;
    }
}

// Esse bloco ativa a marcação automatica da cartela do jogador
function JogoAuto(){
    document.querySelector("#Manual").style.display = "inline-block";
    document.querySelector("#Status").style.display = "none";
}

// Esse bloco desativa a marcação automatica da cartela do jogador
function JogoManual(){
    document.querySelector("#Manual").style.display = "none";
    document.querySelector("#Status").style.display = "inline-block";
}

// Botão para iniciar uma nova rodada esse botao só é liberado quando o jogo é finalizado.
function NewGame(){
    document.location.reload(true);
}