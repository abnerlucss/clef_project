var username = sessionStorage.getItem('nome_usuario_meuapp');
var user_login = sessionStorage.getItem('login_usuario_meuapp');
document.getElementById('span_username').innerHTML = username;


function redirect_login() {
    window.location.href = 'login.html';
}

function check_authenticate() {
    if (user_login == undefined) {
        redirect_login();
    } else {
        document.getElementById('span_username').innerHTML = username;
        validate_session();
    }

}


function log_out() {
    finalize_session();
    sessionStorage.clear();
    redirect_login();
}

function validate_session() {
    fetch(`/users/session/${user_login}`, { cache: 'no-store' })
        .then(resposta => {
            if (resposta.ok) {
                resposta.text().then(texto => {
                    console.log('Sessão :) ', texto);
                });
            } else {
                console.error('Sessão :.( ');
                logoff();
            }
        });
}

function finalize_session() {
    fetch(`/users/exit/${user_login}`, { cache: 'no-store' });
}