$(document).ready(function(){
    var copiarCartaoOriginal = $('#cartao').clone(); //

    $('#cartao-container').html('');

    $.ajax({
        method: 'GET',
        url: 'https://restcountries.com/v3.1/all?fields=name,flags',

        success: function(campos){//se for success a funcao vai receber os campos com nome e bandeira dos paises
            console.log(campos);

            const randomCampos = campos.sort(()=> Math.random() - 0.5); // metodo para embaralhar os paises para depois
                                                                        // podermos mostrar aleatoriamente os paises na home
            const arrCampos = randomCampos.slice(0,3); // constante para guardar um array com 3 campos

            for (let i = 0; i < arrCampos.length; i++) {
                const bandeira=arrCampos[i].flags.png; // como acessar campos dentro do array 
                const nome=arrCampos[i].name.common;
                var copiarCartao=copiarCartaoOriginal.clone();
                $('.card-img-top', copiarCartao).attr('src',bandeira);
                $('.card-title', copiarCartao).text(nome);
                $('#cartao-container').append(copiarCartao);
            }
        },
        error: function(){
            console.log('Erro ao carregar campos.')
        }

    });
});