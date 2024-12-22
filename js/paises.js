
var copiarCartaoOriginal = $('#cartao').clone(); //variavel para copiar e guardar o codigo que esta com este id no html


// função que vai carregar os paises. Recebe o URl para fazer o get da API / Foi preciso criar em vez de se usar o Document.reade
// Assim poupamos linhas de código e reutilizamos o que temos.

function carregarPaises(url){

    $('#cartao-container').html('');

    $.ajax({
        method: 'GET',
        url: url,

        success: function(campos){//se for success a funcao vai receber o array campos com nome, bandeira, populacao e capital
            console.log(campos);
            // esse for vai gerar cards ate o tamanho do campo.length

            for (let i = 0; i < campos.length; i++) {
                const bandeira=campos[i].flags.png; // como acessar campos dentro do array 
                const nome=campos[i].name.common;
                const populacao=campos[i].population;
                const capital=campos[i].capital;
                var copiarCartao=copiarCartaoOriginal.clone();//estou a guardar o codigo html que tem na variavel copiarCartaoOriginal todos os paises
                $('.card-img-top', copiarCartao).attr('src',bandeira); //attr é o atributo que estou a asceder no scr
                $('.card-title', copiarCartao).text(nome);
                $('.card-capital', copiarCartao).text("Capital: "+capital);
                $('.card-population', copiarCartao).text("População: "+populacao);
                $('#cartao-container').append(copiarCartao);//envio o codigo do card gerado para o container
            }
        },
        error: function(){
            console.log('Erro ao carregar campos.');//se der erro ao carregar os dados dos campos vai aparecer essa mensagem
        }

    });
}

// O documento / página ao ser carregada vai chamar a função carregarPaises e enviar o url da api
$(document).ready(function(){
    carregarPaises("https://restcountries.com/v3.1/all?fields=name,flags,population,capital");
});

// ao clicar no botao de pesquisa ele faz esta function
$('#btn-search').on('click', function(){

    //vai guardar o valor da pesquisa numa variavel
    var valorPesquisa = $('#pesquisa').val();

    // se o valorPesquisa tiver vazio faz o carregaPaises com o get all da API senao faz com o valorPesquisa
    if (valorPesquisa.trim() === ""){
        carregarPaises("https://restcountries.com/v3.1/all?fields=name,flags,population,capital");
    }else{
        carregarPaises("https://restcountries.com/v3.1/name/"+ valorPesquisa+"?fields=name,flags,population,capital");
    }
});
