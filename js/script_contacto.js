document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    validateForm();
});

function validateForm() {
    var erro = false; // Variável para rastrear erros

    // Validação do nome
    var nome = document.getElementById('nome');
    if (nome.value.length < 2) {
        showError('nome', 'Por favor, insira o seu nome (mínimo 2 caracteres)');
        erro = true;
    } 

    // Validação do email
    var email = document.getElementById('email');
    if (!validateEmail(email.value)) {
        showError('email', 'Por favor, insira um email válido');
        erro = true;
    } 

    // Validação da mensagem
    var mensagem = document.getElementById('mensagem');
    if (mensagem.value.length < 5) {
        showError('mensagem', 'Por favor, insira uma mensagem com pelo menos 5 caracteres');
        erro = true;
    } 

    // Validação dos termos
    var termos = document.getElementById('termos');
    if (!termos.checked) {
        showError('termos', 'Você precisa aceitar os termos e condições');
        erro = true;
    } 
    // Se não houver erros, exibe mensagem de sucesso e limpa o formulário
    if (!erro) {
        alert('Formulário enviado com sucesso!');
        document.getElementById('contact-form').reset(); // Limpa o formulário
        limparErros(); // Remove as mensagens de erro e classes de validação
    }
}

// Função para validar email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para exibir mensagem de erro
function showError(campoId, mensagem) {
    const field = document.getElementById(campoId);
    let errorElement = document.querySelector(`#${campoId} ~ .error-mensagem`);
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.classList.add('error-mensagem');
        errorElement.style.color = 'red';
        field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = mensagem;
    field.classList.add('is-invalid');
}

// Função para limpar todas as mensagens de erro
function limparErros() {
    const erroMensagem = document.querySelectorAll('.error-mensagem');
    erroMensagem.forEach(error => error.remove());

    const invalidFields = document.querySelectorAll('.is-invalid');
    invalidFields.forEach(field => field.classList.remove('is-invalid'));
}