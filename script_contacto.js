document.getElementById('contact-form').addEventListener('submit', function(event){
    event.preventDefault();
    validateForm();

});

var nome= document.getElementById('nome');
    if(nome.value.length <2) {
        mensagemErro= "Por favor, insira o seu nome (minimo 2 caracteres)";

    }

function validateForm() {
        var mensagemErro= false;
    
        var nome=document.getElementById('nome');
        console.log("nome");
    
        if (nome.value.length <2) {
            mensagemErro= "Por favor , insira seu nome (minimio 2 caracteres!)"
            showError('nome', mensagemErro)
        }
    
        var mensagem= document.getElementById('mensagem');
    
        if (mensagem.value.length <5) {
            mensagemErro= "Por favor, insira uma mensagem";
        }
    
        var termos= document.getElementById("termos");
    
        if(termos.checked) {
            mensagemErro="Tem de aceitar os termos e condições";
        }
    
        var email= document.getElementById('email');
        if (!validateEmail (email.value)) {
            mensagemErro= "Por favor, insira um email válido";
        }

        var termos= document.getElementById("termos");

        if(termos.checked) {
            mensagemErro="Tem de aceitar os termos e condições";
        }
    
    }

function validateEmail(email){
        var regex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        regex.test(email);
        return regex.test(email);
}