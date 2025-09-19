document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastroForm');
    if (!form) return;

    const formSteps = Array.from(form.querySelectorAll('.form-step'));
    const errorMessageDiv = document.getElementById('error-message');
    let currentStep = formSteps.findIndex(step => step.classList.contains('form-step-active'));

    // --- VALIDAÇÕES E MENSAGENS ---
    const showStep = (stepIndex) => {
        formSteps.forEach(step => step.classList.remove('form-step-active'));
        formSteps[stepIndex].classList.add('form-step-active');
    };

    const showErrorMessage = (message) => {
        errorMessageDiv.textContent = message;
        errorMessageDiv.classList.add('show');
    };

    const hideErrorMessage = () => {
        errorMessageDiv.textContent = '';
        errorMessageDiv.classList.remove('show');
    };

    // --- REGEX ---

    // e-mail: usuario@dominio.com)
    const isEmailValid = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    };

    // CPF (ex: 000.000.000-00)
    const isCpfValid = (cpf) => {
        const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        return regex.test(cpf);
    };

    // (00) 00000-0000)
    const isCelularValid = (celular) => {
        const regex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
        return regex.test(celular);
    };

    // (00) 0000-0000)
    const isFixoValid = (fixo) => {
        // se o campo for opcional e estiver vazio, é válido.
        if (!fixo) return true;
        const regex = /^\(\d{2}\)\s\d{4}-\d{4}$/;
        return regex.test(fixo);
    };

    // (mínimo 8 caracteres, 1 letra maiúscula, 1 minúscula, 1 número)
    const isPasswordStrong = (password) => {
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        return regex.test(password);
    };


    // --- VALIDAÇÃO PRINCIPAL ---
    const validateStep = (stepIndex) => {
        hideErrorMessage();
        let isValid = true;
        const currentStepFields = formSteps[stepIndex].querySelectorAll('input, select');

        for (const field of currentStepFields) {
            field.classList.remove('invalid');

            // valid campo obrigatório vazio
            if (field.required && !field.value.trim()) {
                showErrorMessage('Por favor, preencha todos os campos obrigatórios.');
                field.classList.add('invalid');
                return false;
            }

            // valid formato campos preenchidos
            if (field.value) {
                let fieldIsValid = true;
                let errorMessage = '';

                switch (field.id) {
                    case 'email':
                        if (!isEmailValid(field.value)) {
                            fieldIsValid = false;
                            errorMessage = 'Formato de e-mail inválido.';
                        }
                        break;
                    case 'cpf':
                        if (!isCpfValid(field.value)) {
                            fieldIsValid = false;
                            errorMessage = 'Formato de CPF inválido.';
                        }
                        break;
                    case 'celular':
                        if (!isCelularValid(field.value)) {
                            fieldIsValid = false;
                            errorMessage = 'Formato de celular inválido.';
                        }
                        break;
                    case 'fixo':
                        if (!isFixoValid(field.value)) {
                            fieldIsValid = false;
                            errorMessage = 'Formato de telefone fixo inválido. Use o formato: (00) 0000-0000.';
                        }
                        break;
                    case 'senha':
                        if (!isPasswordStrong(field.value)) {
                            fieldIsValid = false;
                            errorMessage = 'A senha deve ter no mínimo 8 caracteres, com uma letra maiúscula, uma minúscula e um número.';
                        }
                        break;
                }

                if (!fieldIsValid) {
                    showErrorMessage(errorMessage);
                    field.classList.add('invalid');
                    return false;
                }
            }
        }

        // valid confirmação de senha
        if (stepIndex === formSteps.length - 1) {
            const senha = form.querySelector('#senha');
            const confirmarSenha = form.querySelector('#confirmar-senha');
            if (senha.value !== confirmarSenha.value) {
                showErrorMessage('As senhas não coincidem. Por favor, verifique.');
                senha.classList.add('invalid');
                confirmarSenha.classList.add('invalid');
                return false;
            }
        }

        return true; // se todas as validações passaram
    };

    form.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        if (!action) return;

        if (action === 'next') {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        } else if (action === 'back') {
            currentStep--;
            showStep(currentStep);
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateStep(currentStep)) {
            // novo usuário
            const novoUsuario = {
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                login: document.getElementById('login').value,
                senha: document.getElementById('senha').value,
            };

            // busca llista de usuários existentes
            const usuariosCadastrados = JSON.parse(localStorage.getItem('usuariosCadastrados')) || [];

            // verifica login e-mail exxistente
            const usuarioExistente = usuariosCadastrados.find(
                user => user.login === novoUsuario.login || user.email === novoUsuario.email
            );

            if (usuarioExistente) {
                showErrorMessage('Login ou e-mail já cadastrado. Por favor, escolha outro.');
                return;
            }

            // add usuario lista
            usuariosCadastrados.push(novoUsuario);
            localStorage.setItem('usuariosCadastrados', JSON.stringify(usuariosCadastrados));

            // login usuario (recem cadastrado)
            localStorage.setItem('sessaoAtiva', JSON.stringify({ login: novoUsuario.login }));

            showTopNotification(`Cadastro realizado com sucesso, ${novoUsuario.nome}!`, 'success');
            
            setTimeout(() => {
            window.location.href = 'index.html';
        }, 2500);
    }
});

    // inicia o formulário
    showStep(currentStep);
});

// menu mobile 
function menuShow() {
    let menuMobile = document.querySelector('.menu-mobile');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
    } else {
        menuMobile.classList.add('open');
    }
}