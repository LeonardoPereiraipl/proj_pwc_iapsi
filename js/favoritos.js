var copiarCartaoOriginal = $('#cartao').clone();

$(document).ready(function(){
    carregarFavoritos();
});

function carregarFavoritos() {

    $('#cartao-container').html('');
    //transformo os favcoritos em um objeto json e se nao tiver nenhum favorito cria um array vazio
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    //o for vai percorrer os favoritos e fazer uma copia do card
    for (let i = 0; i < favoritos.length; i++) {
        const bandeira=favoritos[i].bandeira; // como acessar campos dentro do array 
        const nome=favoritos[i].nome;
        const populacao=favoritos[i].populacao;
        const capital=favoritos[i].capital;
        var copiarCartao=copiarCartaoOriginal.clone();//estou a guardar o codigo html que tem na variavel copiarCartaoOriginal todos os paises
        $('.card-img-top', copiarCartao).attr('src',bandeira); //attr é o atributo que estou a asceder no scr
        $('.card-title', copiarCartao).text(nome);
        $('.card-capital', copiarCartao).text("Capital: "+capital);
        $('.card-population', copiarCartao).text("População: "+populacao);
        $('#cartao-container').append(copiarCartao);//envio o codigo do card gerado para o container
        
        
        const botaoFavorito = $('.favorite', copiarCartao);
        botaoFavorito.css('color', 'yellow');
        botaoFavorito.html('&#9733');


        botaoFavorito.on('click',function(){
            favoritos=favoritos.filter(favoritos=>favoritos.nome !== nome);
            localStorage.setItem('favoritos', JSON.stringify(favoritos));
            // o this refere ao objeto que encadeou o evento que no caso é o botaoFavorito e o closest vai em busca do elemento pai
            // e assim faz o remove no html
            $(this).closest('#cartao').remove();
        });
    }


}