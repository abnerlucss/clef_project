// LOADS 
function active_load_gif() {
    document.getElementById('loadGif').style.visibility = 'visible';
}

function finalize_load_gif() {
    document.getElementById('loadGif').style.visibility = 'hidden';
}

function disableButton(button) {
    button.disabled = true;
}

function validateLogin() {
    let login = document.getElementById('in_login');
    let password = document.getElementById('in_password');

    if (login.value == '') {
        login.classList.toggle('wrong-input');
        login.placeholder = 'Digite o login';
        setTimeout(() => {
            login.placeholder = '';
            login.classList.remove('wrong-input');
        }, 1500);
        return false;
    } else if (login.value == undefined) {
        login.classList.toggle('wrong-input');
        login.placeholder = 'Login inválido';
        setTimeout(() => {
            login.placeholder = '';
            login.classList.remove('wrong-input');
        }, 1500);
        return false;
    }
    else if (password.value == '') {
        password.classList.toggle('wrong-input');
        password.placeholder = 'Digite a senha';

        setTimeout(() => {
            password.placeholder = '';
            password.classList.remove('wrong-input');
        }, 1500);
        return false;
    }
    else {
        return true;
    }
}

function validateSign() {
    let name = document.getElementById('in_name');
    let email = document.getElementById('in_email');
    let username = document.getElementById('in_login');
    let password = document.getElementById('in_password');


    if (name.value == '' || name.value.match(/[0-9]/)) {
        name.classList.toggle('wrong-input');
        name.value = '';
        name.placeholder = 'Digite um nome válido';
        setTimeout(() => {
            name.classList.remove('wrong-input');
        }, 1500);
        return false;
    }
    else if (email.value == '' || !email.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        email.classList.toggle('wrong-input');
        email.value = '';
        email.placeholder = 'Digite um email válido';

        setTimeout(() => {
            email.classList.remove('wrong-input');
        }, 1500);
        return false;
    }
    else if (username.value == '' || username.value.match(/[A-Z]/)) {
        username.classList.toggle('wrong-input');
        username.value = '';
        username.placeholder = 'Digite um login válido';
        setTimeout(() => {
            username.classList.remove('wrong-input');
        }, 1500);
        return false;
    }
    else if (password.value == '' || password.value.length < 4) {
        password.classList.toggle('wrong-input');

        setTimeout(() => {
            password.classList.remove('wrong-input');
        }, 1500);
        return false;
    }
    else {
        return true;
    }
}

function showAlertMsg(message) {
    error_msg.style.display = 'flex';
    error_msg.innerHTML = message;

    setTimeout(() => {
        error_msg.style.display = 'none';;
    }, 1500);
}